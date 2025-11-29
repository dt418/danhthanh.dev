/**
 * ContentMeta Repository Interface
 */

import type { ContentMeta, Prisma } from '@prisma/client';

export type ContentMetaWithCounts = ContentMeta & {
  _count: {
    shares: number;
    views: number;
  };
};

export interface IContentMetaRepository {
  /**
   * Find all content meta with counts of shares and views
   */
  findAllWithCounts(): Promise<ContentMetaWithCounts[]>;

  /**
   * Find content meta by slug with counts of shares and views
   */
  findBySlugWithCounts(slug: string): Promise<ContentMetaWithCounts | null>;

  /**
   * Find many content meta with custom relations and filters
   */
  findManyWithRelations(options: {
    where?: Prisma.ContentMetaWhereInput;
    include?: Prisma.ContentMetaInclude;
    orderBy?: Prisma.ContentMetaOrderByWithRelationInput;
    take?: number;
  }): Promise<ContentMeta[]>;

  /**
   * Find new posts created since a specific date
   */
  findNewPosts(sinceDate: Date): Promise<
    {
      slug: string;
      title: string;
      createdAt: Date;
    }[]
  >;
}
