# Next.js Pages Router to App Router Migration Guide

This document outlines the migration of the danhthanh.dev project from the **Pages Router** to the **App Router** architecture in Next.js.

## Overview

The migration has been completed to leverage the modern App Router structure introduced in Next.js 13+. This provides better performance, improved developer experience, and access to newer Next.js features.

## Key Changes

### 1. Directory Structure

#### Before (Pages Router)

```md
src/
├── pages/
│ ├── \_app.tsx
│ ├── \_document.tsx
│ ├── index.tsx
│ ├── blog.tsx
│ ├── projects.tsx
│ ├── today-i-learned.tsx
│ ├── 404.tsx
│ ├── 500.tsx
│ └── api/
│ ├── activity/
│ ├── content/
│ ├── reactions/
│ ├── shares/
│ ├── views/
│ ├── og-page.tsx
│ └── og-post.tsx
```

#### After (App Router)

```md
src/
├── app/
│ ├── layout.tsx (replaces \_app.tsx and \_document.tsx)
│ ├── page.tsx (replaces pages/index.tsx)
│ ├── not-found.tsx (replaces pages/404.tsx)
│ ├── error.tsx (replaces pages/500.tsx)
│ ├── blog/
│ │ └── page.tsx
│ ├── projects/
│ │ └── page.tsx
│ ├── today-i-learned/
│ │ └── page.tsx
│ └── api/
│ ├── activity/route.ts
│ ├── content/
│ │ ├── route.ts
│ │ ├── latest/route.ts
│ │ └── [slug]/route.ts
│ ├── reactions/[slug]/route.ts
│ ├── shares/[slug]/route.ts
│ ├── views/[slug]/route.ts
│ ├── og-page/route.tsx
│ └── og-post/route.tsx
```

### 2. Root Layout (`src/app/layout.tsx`)

The root layout replaces both `_app.tsx` and `_document.tsx`:

```typescript
// Old: _app.tsx + _document.tsx
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // ...
  return (
    <Provider>
      <RootLayout>
        {getLayout(<Component {...pageProps} />)}
        <GoogleAnalytics gaId={GA_ID} />
      </RootLayout>
    </Provider>
  );
}

// New: app/layout.tsx
export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>
          <div id="__root">
            {children}
            <GoogleAnalytics gaId={GA_ID} />
          </div>
        </Provider>
      </body>
    </html>
  );
}
```

### 3. Page Components

Pages are now simpler and don't need the `getLayout` pattern:

```typescript
// Old: pages/blog.tsx
export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const allPostsData = getSortedPosts();
  return { props: { posts: allPostsData } };
};

function Blog({ posts }: BlogProps) {
  return <BlogContents posts={posts} />;
}

// New: app/blog/page.tsx
export default async function Blog() {
  const allPostsData = getSortedPosts();
  return <BlogContents posts={allPostsData} />;
}
```

### 4. API Routes

API routes now use the Route Handlers pattern:

```typescript
// Old: pages/api/activity/index.ts
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const contentActivity = await getContentActivity();
    res.status(200).json(contentActivity);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

// New: app/api/activity/route.ts
export async function GET() {
  try {
    const contentActivity = await getContentActivity();
    return NextResponse.json(contentActivity, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
```

### 5. Error Handling

Error pages have been updated:

```typescript
// Old: pages/404.tsx
function Error404() {
  return <Error404Contents />;
}
Error404.getLayout = (page) => page;

// New: app/not-found.tsx
export default function NotFound() {
  return <Error404Contents />;
}

// Old: pages/500.tsx
function Error500() {
  return <Error500Contents />;
}
Error500.getLayout = (page) => page;

// New: app/error.tsx
'use client';
export default function Error() {
  return <Error500Contents />;
}
```

### 6. Helper Functions

The `getSessionId` helper has been updated to support both `NextApiRequest` and `Request`:

```typescript
export const getSessionId = (req: NextApiRequest | Request) => {
  let ipAddress: string | string[] | undefined;

  if (req instanceof Request) {
    ipAddress = req.headers.get('x-forwarded-for') || 'localhost';
  } else {
    ipAddress = req.headers['x-forwarded-for'] || 'localhost';
  }

  // ... rest of the function
};
```

## New Features Enabled

### 1. Server Components by Default

All components in the `app/` directory are Server Components by default, which provides:

- Better performance
- Secure backend access
- Reduced client-side JavaScript

### 2. Metadata API

Replace `next/head` with the Metadata API:

```typescript
// Old: pages/blog.tsx
<Head>
  <title>Personal Blog</title>
  <meta name="description" content="Web development thoughts and stories." />
</Head>

// New: app/blog/page.tsx
export const metadata = {
  title: 'Personal Blog',
  description: 'Web development thoughts and stories.',
};
```

### 3. Streaming and Suspense

The App Router supports React Suspense for streaming responses, enabling better performance for large pages.

### 4. Layouts

Nested layouts can be created by adding `layout.tsx` files in subdirectories:

```typescript
// app/blog/layout.tsx
export default function BlogLayout({ children }) {
  return (
    <div className="blog-layout">
      {children}
    </div>
  );
}
```

## Migration Steps Completed

1. ✅ Created `src/app/` directory structure
2. ✅ Migrated root layout from `_app.tsx` and `_document.tsx` to `app/layout.tsx`
3. ✅ Converted all page components to App Router format
4. ✅ Migrated all API routes to Route Handlers
5. ✅ Updated error pages (`404.tsx` → `not-found.tsx`, `500.tsx` → `error.tsx`)
6. ✅ Updated helper functions to support both request types
7. ✅ Created `AppLayout` wrapper component for pages with navigation and footer

## Files Created

### Pages

- `src/app/page.tsx` - Home page
- `src/app/blog/page.tsx` - Blog page
- `src/app/projects/page.tsx` - Projects page
- `src/app/today-i-learned/page.tsx` - Today I Learned page
- `src/app/not-found.tsx` - 404 error page
- `src/app/error.tsx` - 500 error page
- `src/app/layout.tsx` - Root layout

### API Routes

- `src/app/api/activity/route.ts`
- `src/app/api/content/route.ts`
- `src/app/api/content/[slug]/route.ts`
- `src/app/api/content/latest/route.ts`
- `src/app/api/reactions/[slug]/route.ts`
- `src/app/api/shares/[slug]/route.ts`
- `src/app/api/views/[slug]/route.ts`
- `src/app/api/og-page/route.tsx`
- `src/app/api/og-post/route.tsx`

### Components

- `src/components/layouts/AppLayout.tsx` - Layout wrapper for pages

## Updated Files

- `src/helpers/server.ts` - Updated `getSessionId` to support both request types

## Next Steps

1. **Remove the old Pages Router directory** (optional, can keep for reference):

   ```bash
   rm -rf src/pages
   ```

2. **Update `next.config.mjs`** if needed (the current configuration should work with App Router)

3. **Test the application**:

   ```bash
   npm run dev
   ```

4. **Build and verify**:

   ```bash
   npm run build
   npm start
   ```

5. **Update any imports** that reference pages directly (if any exist in other parts of the codebase)

## Breaking Changes

### 1. No `getStaticProps` or `getServerSideProps`

Data fetching is now done directly in components using `async/await`:

```typescript
// Old
export const getStaticProps = async () => {
  const data = await fetchData();
  return { props: { data } };
};

// New
export default async function Page() {
  const data = await fetchData();
  return <Component data={data} />;
}
```

### 2. No `getLayout` Pattern

Layouts are now handled through the file system structure and nested layouts.

### 3. Router Query Object

The router query object is no longer available in pages. Use dynamic route segments instead:

```typescript
// Old: pages/blog/[slug].tsx
const router = useRouter();
const slug = router.query.slug;

// New: app/blog/[slug]/page.tsx
export default function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
}
```

## Troubleshooting

### Issue: Components not rendering

**Solution**: Ensure that client-side components are marked with `'use client'` directive:

```typescript
'use client';

import { useState } from 'react';

export default function Component() {
  const [count, setCount] = useState(0);
  // ...
}
```

### Issue: API routes not working

**Solution**: Ensure that API routes are using the correct HTTP method exports:

```typescript
export async function GET(request: Request) {
  // ...
}

export async function POST(request: Request) {
  // ...
}
```

### Issue: Metadata not updating

**Solution**: Use the Metadata API instead of `next/head`:

```typescript
export const metadata = {
  title: 'Page Title',
  description: 'Page description',
};
```

## References

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Migrating from Pages to App Router](https://nextjs.org/docs/pages/guides/migrating/app-router-migration)
- [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

## Support

For issues or questions regarding the migration, please refer to the official Next.js documentation or the project's issue tracker.
