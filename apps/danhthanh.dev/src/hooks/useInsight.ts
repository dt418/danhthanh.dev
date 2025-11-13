'use client';

import { ContentType, ReactionType, ShareType } from '@prisma/client';
import merge from 'lodash/merge';
import { useEffect, useRef } from 'react';
import useSWR from 'swr';

import fetcher from '@/utils/fetcher';
import { postReaction, postShare, postView } from '@/helpers/api';

import type { TContentMetaDetail } from '@/types';

const INITIAL_VALUE: TContentMetaDetail = {
  meta: {
    views: 0,
    shares: 0,
    reactions: 0,
    reactionsDetail: {
      CLAPPING: 0,
      THINKING: 0,
      AMAZED: 0,
    },
  },
  metaUser: {
    reactionsDetail: {
      CLAPPING: 0,
      THINKING: 0,
      AMAZED: 0,
    },
  },
  metaSection: {},
};

export default function useInsight({
  slug,
  contentType,
  contentTitle,
  countView = true,
}: {
  slug: string;
  contentType: ContentType;
  contentTitle: string;
  countView?: boolean;
}) {
  // #region handle for batch click
  // use `ReturnType<typeof setTimeout>` so it matches both browser and Node types,
  // and allow `null` before a timer is set.
  const timer = useRef<
    Record<ReactionType, ReturnType<typeof setTimeout> | null>
  >({
    CLAPPING: null,
    THINKING: null,
    AMAZED: null,
  });
  const count = useRef<Record<ReactionType, number>>({
    CLAPPING: 0,
    THINKING: 0,
    AMAZED: 0,
  });
  // #endregion

  const { isLoading, data, mutate } = useSWR<TContentMetaDetail>(
    `/api/content/${slug}`,
    fetcher,
    {
      fallbackData: INITIAL_VALUE,
    }
  );

  // The API may return an error shape like { message: string } which is truthy
  // but does not contain the expected `meta`/`metaUser` fields. Guard against
  // that by validating the shape before using `data`.
  const isContentMetaDetail = (v: unknown): v is TContentMetaDetail =>
    !!(
      v &&
      typeof v === 'object' &&
      'meta' in v &&
      v.meta &&
      typeof v.meta === 'object' &&
      'metaUser' in v &&
      v.metaUser &&
      typeof v.metaUser === 'object'
    );

  // ensure we never read invalid data — always use a validated baseData
  const baseData: TContentMetaDetail = isContentMetaDetail(data)
    ? data
    : INITIAL_VALUE;

  // post view count
  useEffect(() => {
    if (countView) {
      postView({ slug, contentType, contentTitle });
    }
  }, [slug, contentType, contentTitle, countView]);

  const addShare = ({ type }: { type: ShareType }) => {
    // optimistic update
    mutate(
      merge({}, baseData, {
        meta: {
          shares: baseData.meta.shares + 1,
        },
      }),
      false
    );

    postShare({
      slug,
      contentType,
      contentTitle,
      type,
    });
  };

  const addReaction = ({
    type,
    section = undefined,
  }: {
    type: ReactionType;
    section?: string;
  }) => {
    // optimistic update
    mutate(
      merge({}, baseData, {
        meta: {
          reactions: baseData.meta.reactions + 1,
          reactionsDetail: {
            [type]: baseData.meta.reactionsDetail[type] + 1,
          },
        },
        metaUser: {
          reactionsDetail: {
            [type]: baseData.metaUser.reactionsDetail[type] + 1,
          },
        },
      }),
      false
    );

    // increment the current batch click count
    count.current[type] += 1;

    // debounce the batch click for sending the reaction data
    if (timer.current[type]) {
      clearTimeout(timer.current[type] as ReturnType<typeof setTimeout>);
    }
    timer.current[type] = setTimeout(() => {
      postReaction({
        slug,
        contentType,
        contentTitle,
        type,
        count: count.current[type],
        section: section || '',
      }).finally(() => {
        // reset the batch click count to zero for the next batch
        count.current[type] = 0;
      });
    }, 500);
  };

  return {
    isLoading,
    data: baseData,
    addShare,
    addReaction,
  };
}
