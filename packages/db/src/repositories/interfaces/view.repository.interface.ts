/**
 * View Repository Interface
 */

import type { ContentType } from '@prisma/client';

export interface IViewRepository {
  /**
   * Count views for a specific session
   */
  countBySession(slug: string, sessionId: string): Promise<number>;

  /**
   * Create a new view
   */
  create(data: {
    slug: string;
    contentType: ContentType;
    contentTitle: string;
    sessionId: string;
  }): Promise<any>;
}
