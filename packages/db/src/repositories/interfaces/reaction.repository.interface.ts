/**
 * Reaction Repository Interface
 */

import type { ContentType, Reaction, ReactionType } from '@prisma/client';

export interface IReactionRepository {
  /**
   * Group reactions by type for a specific content slug
   */
  groupByType(slug: string): Promise<
    (Pick<Reaction, 'type'> & {
      _sum: { count: number | null };
    })[]
  >;

  /**
   * Group reactions by section and type for a specific content slug
   */
  groupBySectionAndType(slug: string): Promise<
    (Pick<Reaction, 'section' | 'type'> & {
      _sum: { count: number | null };
    })[]
  >;

  /**
   * Group reactions by type for a specific session
   */
  groupByTypeForSession(
    slug: string,
    sessionId: string
  ): Promise<
    (Pick<Reaction, 'type'> & {
      _sum: { count: number | null };
    })[]
  >;

  /**
   * Create a new reaction
   */
  create(data: {
    slug: string;
    contentType: ContentType;
    contentTitle: string;
    count: number;
    section: string;
    sessionId: string;
    type: ReactionType;
  }): Promise<Reaction>;
}
