/**
 * @danhthanh/db - Database Package
 * Provides database access with DI Container and Repository patterns
 */

// Core exports
// Initialize services on import
import { initializeServices } from './services';

export {
  Container,
  container,
  registerSingleton,
  registerTransient,
} from './core/container';
export type {
  IContainer,
  ServiceFactory,
  ServiceRegistration,
  ServiceToken,
} from './core/types';
export { ServiceLifecycle } from './core/types';

// Service configuration
export { getContainer,initializeServices } from './services';
export { SERVICE_TOKENS } from './tokens';

// Adapter exports
export type { IDatabaseAdapter } from './adapters/interfaces/database.interface';
export { PrismaAdapter } from './adapters/prisma/prisma.adapter';
export type { PrismaClient } from './adapters/prisma/prisma.client';
export { createPrismaClient,prisma } from './adapters/prisma/prisma.client';

// Repository interfaces
export type { IContentMetaRepository } from './repositories/interfaces/content-meta.repository.interface';
export type { IReactionRepository } from './repositories/interfaces/reaction.repository.interface';
export type { IShareRepository } from './repositories/interfaces/share.repository.interface';
export type { IViewRepository } from './repositories/interfaces/view.repository.interface';

// Repository implementations
export { PrismaContentMetaRepository } from './repositories/prisma/content-meta.repository';
export { PrismaReactionRepository } from './repositories/prisma/reaction.repository';
export { PrismaShareRepository } from './repositories/prisma/share.repository';
export { PrismaViewRepository } from './repositories/prisma/view.repository';

// Re-export Prisma types for convenience
export type {
  ContentMeta,
  ContentType,
  Reaction,
  ReactionType,
  Share,
  ShareType,
  View,
} from '@prisma/client';
initializeServices();
