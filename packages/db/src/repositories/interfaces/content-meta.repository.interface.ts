/**
 * ContentMeta Repository Interface
 */

export interface IContentMetaRepository {
  /**
   * Find all content meta with counts of shares and views
   */
  findAllWithCounts(): Promise<any>;

  /**
   * Find content meta by slug with counts of shares and views
   */
  findBySlugWithCounts(slug: string): Promise<any>;

  /**
   * Find many content meta with custom relations and filters
   */
  findManyWithRelations(options: {
    where?: any;
    include?: any;
    orderBy?: any;
    take?: number;
  }): Promise<any>;

  /**
   * Find new posts created since a specific date
   */
  findNewPosts(sinceDate: Date): Promise<any>;
}
