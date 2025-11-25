/**
 * Share Repository Interface
 */

import type { ContentType, ShareType } from '@prisma/client';

export interface IShareRepository {
  /**
   * Count shares for a specific session
   */
  countBySession(slug: string, sessionId: string): Promise<number>;

  /**
   * Create a new share
   */
  create(data: {
    slug: string;
    contentType: ContentType;
    contentTitle: string;
    type: ShareType;
    sessionId: string;
  }): Promise<any>;
}
