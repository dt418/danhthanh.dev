# @danhthanh/db

Database package for danhthanh.dev with clean architecture patterns.

## Features

- **Dependency Injection Container**: Lightweight DI container for service management
- **Adapter Pattern**: Abstract database operations behind interfaces
- **Repository Pattern**: Clean separation of data access logic
- **Type Safety**: Full TypeScript support with Prisma
- **MongoDB Support**: Configured for MongoDB with Prisma

## Installation

```bash
pnpm install
pnpm db:generate
```

## Usage

### Basic Usage

```typescript
import { getContainer, SERVICE_TOKENS, prisma } from '@danhthanh/db';

// Option 1: Use repositories through DI container
const container = getContainer();
const contentMetaRepo = container.resolve(SERVICE_TOKENS.ContentMetaRepository);
const content = await contentMetaRepo.findAllWithCounts();

// Option 2: Direct Prisma client access (for complex queries)
const result = await prisma.contentMeta.findMany();
```

### Using Repositories

```typescript
import { getContainer, SERVICE_TOKENS } from '@danhthanh/db';

const container = getContainer();

// Get repository instances
const contentMetaRepo = container.resolve(SERVICE_TOKENS.ContentMetaRepository);
const reactionRepo = container.resolve(SERVICE_TOKENS.ReactionRepository);
const shareRepo = container.resolve(SERVICE_TOKENS.ShareRepository);
const viewRepo = container.resolve(SERVICE_TOKENS.ViewRepository);

// Use repositories
const allContent = await contentMetaRepo.findAllWithCounts();
const reactions = await reactionRepo.groupByType('my-slug');
```

## Available Scripts

- `pnpm db:generate` - Generate Prisma client
- `pnpm db:push` - Push schema to database
- `pnpm db:migrate` - Run migrations
- `pnpm db:studio` - Open Prisma Studio
- `pnpm build` - Build the package
- `pnpm dev` - Watch mode for development

## Architecture

```
packages/db/
├── src/
│   ├── core/             # DI container implementation
│   ├── adapters/         # Database adapters
│   │   ├── interfaces/   # Adapter interfaces
│   │   └── prisma/       # Prisma adapter
│   ├── repositories/     # Repository pattern
│   │   ├── interfaces/   # Repository interfaces
│   │   └── prisma/       # Prisma implementations
│   ├── services.ts       # Service registration
│   ├── tokens.ts         # DI service tokens
│   └── index.ts          # Main exports
└── prisma/
    └── schema.prisma     # Database schema
```

## Environment Variables

Create a `.env` file in your application root:

```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database"
```
