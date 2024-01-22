# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Folder structure

    ├─ public
    │  └─ favicon.ico
    ├─ prisma
    │  └─ schema.prisma
    ├─ src
    │  ├─ env.js
    │  ├─ app
    │  │  ├─ _components
    │  │  ├─ api
    │  │  │  ├─ auth
    │  │  │  │  └─ [...nextauth]
    │  │  │  │     └─ route.ts
    │  │  │  └─ trpc
    │  │  │     └─ [trpc]
    │  │  │        └─ route.ts
    │  │  |─ layout.tsx
    │  │  └─ page.tsx
    │  ├─ server
    │  │  |─ api
    |  |  |   |
    │  │  |   ├─ routers
    │  │  |   │  └─ post.ts
    │  │  |   ├─ root.ts
    │  │  |   └─ trpc.ts
    │  │  ├─ auth.ts
    │  │  └─ db.ts
    │  ├─ styles
    │  │  └─ globals.css
    │  └─ utils
    │     └─ api.ts
    ├─ .env
    ├─ .env.example
    ├─ .eslintrc.cjs
    ├─ .gitignore
    ├─ next-env.d.ts
    ├─ next.config.js
    ├─ package.json
    ├─ postcss.config.cjs
    ├─ prettier.config.js
    ├─ README.md
    ├─ tailwind.config.ts
    └─ tsconfig.json

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
