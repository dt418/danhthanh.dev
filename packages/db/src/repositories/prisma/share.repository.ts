/**
 * Prisma Share Repository Implementation
 */

import type { IShareRepository } from '../interfaces/share.repository.interface';
import type { ContentType, PrismaClient, ShareType } from '@prisma/client';

export class PrismaShareRepository implements IShareRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async countBySession(slug: string, sessionId: string): Promise<number> {
    return this.prisma.share.count({
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
    type: ShareType;
    sessionId: string;
  }) {
    return this.prisma.share.create({
      data: {
        type: data.type,
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
