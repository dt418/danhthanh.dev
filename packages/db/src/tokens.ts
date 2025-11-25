/**
 * Service Tokens for Dependency Injection
 */

import type { IDatabaseAdapter } from './adapters/interfaces/database.interface';
import type { ServiceToken } from './core/types';
import type { IContentMetaRepository } from './repositories/interfaces/content-meta.repository.interface';
import type { IReactionRepository } from './repositories/interfaces/reaction.repository.interface';
import type { IShareRepository } from './repositories/interfaces/share.repository.interface';
import type { IViewRepository } from './repositories/interfaces/view.repository.interface';

/**
 * Service tokens for DI container with proper type information
 */
export const SERVICE_TOKENS = {
  // Adapters
  DatabaseAdapter: Symbol.for(
    'DatabaseAdapter'
  ) as ServiceToken<IDatabaseAdapter>,

  // Repositories
  ContentMetaRepository: Symbol.for(
    'ContentMetaRepository'
  ) as ServiceToken<IContentMetaRepository>,
  ReactionRepository: Symbol.for(
    'ReactionRepository'
  ) as ServiceToken<IReactionRepository>,
  ShareRepository: Symbol.for(
    'ShareRepository'
  ) as ServiceToken<IShareRepository>,
  ViewRepository: Symbol.for('ViewRepository') as ServiceToken<IViewRepository>,
} as const;
