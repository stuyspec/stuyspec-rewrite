# stuyspec.com

[![.github/workflows/vercel.yml](https://github.com/stuyspec/stuyspecrewrite/actions/workflows/vercel.yml/badge.svg)](https://github.com/stuyspec/stuyspecrewrite/actions/workflows/vercel.yml)
![license](https://img.shields.io/github/license/stuyspec/stuyspecrewrite)
![release](https://img.shields.io/github/v/release/stuyspec/stuyspecrewrite)

## Contributing

We welcome pull requests from Spec Web developers and seasoned JavaScript developers alike! Please follow [these steps](CONTRIBUTING.md) to contribute.

#

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

The **new** client-side application of The Stuyvesant Spectator, built using various modern technologies including NextJS, Typescript, and MongoDB

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/stuyspec/stuyspec-rewrite.git
```

2. Install all dependencies

```bash
npm install
# or
yarn
```

3. Set up the .env.local
   Create a .env.local file, with MONGODB_URI being the credentials for your development mongodb database

```bash
# In .env.local
MONGODB_URI=mongodb+srv://...
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page hot reloads as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/articles](http://localhost:3000/api/articles). This endpoint can be edited in `pages/api/articles/index.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Running this app with docker

Build the app with docker.

```bash
docker build -t stuyspecrewrite .
```

Next, run the built container.

```bash
docker run -p 3000:3000 stuyspecrewrite
```

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
