# langondocs

The documentation site for [langonrock](https://github.com/langonrock/langonrock), a multi-tenant
store for Open Knowledge Format bundles. Content is written as MDX in `content/docs/`, and the site
renders it as searchable, statically generated pages plus a set of machine-readable Markdown
endpoints.

Built with [Fumadocs](https://fumadocs.dev) on Next.js 16.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000/docs](http://localhost:3000/docs).

Requires Node 20.9+ and npm (`package-lock.json` is the only lockfile). There is no `postinstall`
step. The content index is generated when Next.js starts.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server with content hot-reload |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run types:check` | `next typegen && tsc --noEmit` |
| `npm run lint` | ESLint |

`types:check` runs `next typegen` first because the app uses Next 16's generated `PageProps`,
`LayoutProps` and `RouteContext` globals. Bare `tsc --noEmit` fails without it.

## What is documented

| Section | Covers |
| --- | --- |
| [Getting started](content/docs/getting-started) | Install, a four-command quickstart, and the vocabulary |
| [Guides](content/docs/guides) | CLI, connection modes, the server, tokens and TLS, MCP, the HTTP API, editing, the library, large tenants, backups |
| [Architecture](content/docs/architecture) | What OKF is, where the cost goes, the compiled read model, storage, the agent API, cross-platform traps, runtime choice, benchmarks |

The source of truth for all of it is the langonrock repository: its `README.md`, its `DESIGN.md`,
and the code itself. When langonrock changes, these pages have to be updated by hand.

## Adding a page

Create a file under `content/docs/` with frontmatter:

```mdx
---
title: My page
description: What it covers.
icon: House
---

Content here.
```

It is live at `/docs/my-page`. Add it to the folder's `meta.json` `pages` array to place it in the
sidebar. `icon` takes any [lucide](https://lucide.dev) name in PascalCase, resolved by
`lucideIconsPlugin` in `src/lib/source.ts`.

## Notes on this stack

Most Fumadocs material online predates these versions:

- Content collections use the **Macro API** in `src/lib/source.ts`. There is no `source.config.ts`.
- `fumadocs-ui` is an npm alias for `@fumadocs/base-ui`, meaning Base UI primitives, not Radix.
- Search uses **zbsearch**, not Orama.
- `proxy.ts` is Next 16's renamed middleware, and it currently sits at the repository root, where
  Next never looks for it in a `src/` layout. Markdown content negotiation stays inactive until it
  moves to `src/proxy.ts`.

## Learn more

- [langonrock](https://github.com/langonrock/langonrock)
- [Open Knowledge Format](https://github.com/GoogleCloudPlatform/knowledge-catalog)
- [Fumadocs](https://fumadocs.dev)
- [Next.js](https://nextjs.org/docs)
