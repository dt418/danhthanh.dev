/**
 * Database Service Configuration
 * Registers all services in the DI container
 */

import { PrismaAdapter } from './adapters/prisma/prisma.adapter';
import { container, registerSingleton } from './core/container';
import { PrismaContentMetaRepository } from './repositories/prisma/content-meta.repository';
import { PrismaReactionRepository } from './repositories/prisma/reaction.repository';
import { PrismaShareRepository } from './repositories/prisma/share.repository';
import { PrismaViewRepository } from './repositories/prisma/view.repository';
import { SERVICE_TOKENS } from './tokens';

import type { IDatabaseAdapter } from './adapters/interfaces/database.interface';
import type { IContainer } from './core/types';
import type { PrismaClient } from '@prisma/client';

/**
 * Helper function to get Prisma client from container
 */
function getPrismaClient(c: IContainer): PrismaClient {
  const adapter = c.resolve<IDatabaseAdapter>(SERVICE_TOKENS.DatabaseAdapter);
  return adapter.getClient<PrismaClient>();
}

/**
 * Initialize database services
 */
export function initializeServices(): void {
  // Register database adapter
  registerSingleton(SERVICE_TOKENS.DatabaseAdapter, () => new PrismaAdapter());

  // Register repositories
  registerSingleton(
    SERVICE_TOKENS.ContentMetaRepository,
    (c) => new PrismaContentMetaRepository(getPrismaClient(c))
  );

  registerSingleton(
    SERVICE_TOKENS.ReactionRepository,
    (c) => new PrismaReactionRepository(getPrismaClient(c))
  );

  registerSingleton(
    SERVICE_TOKENS.ShareRepository,
    (c) => new PrismaShareRepository(getPrismaClient(c))
  );

  registerSingleton(
    SERVICE_TOKENS.ViewRepository,
    (c) => new PrismaViewRepository(getPrismaClient(c))
  );
}

/**
 * Get initialized container
 */
export function getContainer() {
  return container;
}
