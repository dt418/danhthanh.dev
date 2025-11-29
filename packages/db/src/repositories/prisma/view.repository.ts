/**
 * Prisma View Repository Implementation
 */

import type { IViewRepository } from '../interfaces/view.repository.interface';
import type { ContentType, PrismaClient } from '@prisma/client';

export class PrismaViewRepository implements IViewRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async countBySession(slug: string, sessionId: string): Promise<number> {
    return this.prisma.view.count({
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
    sessionId: string;
  }) {
    return this.prisma.view.create({
      data: {
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
