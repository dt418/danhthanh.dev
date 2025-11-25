/**
 * Prisma ContentMeta Repository Implementation
 */

import type { IContentMetaRepository } from '../interfaces/content-meta.repository.interface';
import type { PrismaClient } from '@prisma/client';

export class PrismaContentMetaRepository implements IContentMetaRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAllWithCounts() {
    return this.prisma.contentMeta.findMany({
      include: {
        _count: {
          select: {
            shares: true,
            views: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async findBySlugWithCounts(slug: string) {
    const result = await this.prisma.contentMeta.findFirst({
      where: { slug },
      include: {
        _count: {
          select: {
            shares: true,
            views: true,
          },
        },
      },
    });

    return result;
  }

  async findManyWithRelations(options: {
    where?: any;
    include?: any;
    orderBy?: any;
    take?: number;
  }) {
    return this.prisma.contentMeta.findMany(options);
  }

  async findNewPosts(sinceDate: Date) {
    return this.prisma.contentMeta.findMany({
      where: {
        type: 'POST',
        AND: {
          createdAt: {
            gte: sinceDate,
          },
        },
      },
      select: {
        slug: true,
        title: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 1,
    });
  }
}
