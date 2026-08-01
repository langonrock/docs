# langondocs

Documentation site built with [Fumadocs](https://fumadocs.dev) on Next.js 16. Content is written as
MDX in `content/docs/`; the site renders it as searchable, statically generated pages plus a set of
machine-readable Markdown endpoints.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000/docs](http://localhost:3000/docs).

Requires Node 20.9+ and npm (`package-lock.json` is the only lockfile). There is no `postinstall`
step — the content index is generated when Next.js starts.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server with content hot-reload |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run types:check` | `next typegen && tsc --noEmit` |
| `npm run lint` | ESLint |

`types:check` runs `next typegen` first because the app uses Next 16's generated `PageProps` /
`LayoutProps` / `RouteContext` globals. Bare `tsc --noEmit` fails without it.

## Adding a page

Create a file under `content/docs/` with frontmatter:

```mdx
---
title: My Page
description: What it covers.
---

Content here.
```

It is live at `/docs/my-page`. Add it to the folder's `meta.json` `pages` array to place it in the
sidebar.

## Documentation

The full manual is the site itself, under `content/docs/`:

| Section | Covers |
| --- | --- |
| [Getting Started](content/docs/getting-started) | Install, project structure, daily workflow |
| [Writing Content](content/docs/writing) | MDX, frontmatter, components, sidebar navigation |
| [Development](content/docs/development) | Source API, routing, styling, search, LLM routes, dependencies and bundles |
| [Operations](content/docs/operations) | Configuration, environment and TLS, deployment, troubleshooting |

## Before shipping

`src/lib/shared.ts` still holds the scaffold placeholders — `appName` is `'My App'` and `gitConfig`
points at `fuma-nama/fumadocs`. They control the navbar title, the generated OG images, and every
"Open in GitHub" link. See `content/docs/operations/configuration.mdx`.

## Notes on this stack

Most Fumadocs material online predates these versions:

- Content collections use the **Macro API** in `src/lib/source.ts`. There is no `source.config.ts`.
- `fumadocs-ui` is an npm alias for `@fumadocs/base-ui` — Base UI primitives, not Radix.
- Search uses **zbsearch**, not Orama.
- `proxy.ts` is Next 16's renamed middleware — and it is currently at the repository root, where
  Next never looks for it in a `src/` layout. Markdown content negotiation is inactive until it is
  moved to `src/proxy.ts`. See `content/docs/development/llm-routes.mdx`.

## Learn more

- [Fumadocs](https://fumadocs.dev)
- [Next.js](https://nextjs.org/docs)
