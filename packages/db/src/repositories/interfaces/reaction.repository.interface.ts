/**
 * Reaction Repository Interface
 */

import type { ContentType, ReactionType } from '@prisma/client';

export interface IReactionRepository {
  /**
   * Group reactions by type for a specific content slug
   */
  groupByType(slug: string): Promise<any>;

  /**
   * Group reactions by section and type for a specific content slug
   */
  groupBySectionAndType(slug: string): Promise<any>;

  /**
   * Group reactions by type for a specific session
   */
  groupByTypeForSession(slug: string, sessionId: string): Promise<any>;

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
  }): Promise<any>;
}
