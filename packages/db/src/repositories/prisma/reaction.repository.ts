/**
 * Prisma Reaction Repository Implementation
 */

import type { IReactionRepository } from '../interfaces/reaction.repository.interface';
import type { ContentType, PrismaClient, ReactionType } from '@prisma/client';

export class PrismaReactionRepository implements IReactionRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async groupByType(slug: string) {
    return this.prisma.reaction.groupBy({
      by: ['type'],
      _sum: {
        count: true,
      },
      where: {
        content: {
          slug,
        },
      },
    });
  }

  async groupBySectionAndType(slug: string) {
    return this.prisma.reaction.groupBy({
      by: ['section', 'type'],
      _sum: {
        count: true,
      },
      where: {
        section: {
          not: null,
        },
        content: {
          slug,
        },
      },
      orderBy: {
        section: 'asc',
      },
    });
  }

  async groupByTypeForSession(slug: string, sessionId: string) {
    return this.prisma.reaction.groupBy({
      by: ['type'],
      _sum: {
        count: true,
      },
      where: {
        sessionId,
        content: {
          slug,
        },
      },
    });
  }

  async create(data: {
    slug: string;
    contentType: ContentType;
    contentTitle: string;
    count: number;
    section: string;
    sessionId: string;
    type: ReactionType;
  }) {
    return this.prisma.reaction.create({
      data: {
        count: data.count,
        type: data.type,
        section: data.section,
        sessionId: data.sessionId,
        content: {
          connectOrCreate: {
            where: {
              slug: data.slug,
            },
            create: {
              slug: data.slug,
              type: data.contentType,
              title: data.contentTitle,
            },
          },
        },
      },
    });
  }
}
