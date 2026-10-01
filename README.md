# langondocs

The documentation site for [langonrock](https://github.com/langonrock/langonrock), a document
database for what your agents know: Markdown stored in its own engine, with atomic commits, history
and restore, compiled into a read model agents read for fewer tokens. Content is written as MDX in
`content/docs/`, and the site renders it as searchable, statically generated pages plus a set of
machine-readable Markdown endpoints.

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
| [Getting started](content/docs/getting-started) | Install, a quickstart from import to restore, and the vocabulary |
| [Database](content/docs/database) | Transactions, history and restore, folder import and export, migrating a legacy tenant, durability and failures, collection and backups |
| [Guides](content/docs/guides) | CLI, connection modes, the server, tokens and TLS, MCP, the HTTP API, editing, the library, agent frameworks, large tenants |
| [Architecture](content/docs/architecture) | What OKF is, where the cost goes, the compiled read model, storage, the agent API, runtime and platforms, benchmarks for the read model and the engine |

The source of truth for all of it is the langonrock repository: its `README.md`, `docs/dbms.md`,
`docs/benchmarks/dbms.md`, `CHANGELOG.md`, the recorded results under `bench/results/`, and the code
itself, which wins wherever they disagree. Its `DESIGN.md` is a historical record, not the engine's
contract. When langonrock changes, these pages have to be updated by hand.

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
- `src/proxy.ts` is Next 16's renamed middleware. It serves the Markdown version of a page to
  agents that ask for `text/markdown`, and to any `/docs/*.md` URL.

## Learn more

- [langonrock](https://github.com/langonrock/langonrock)
- [Open Knowledge Format](https://github.com/GoogleCloudPlatform/knowledge-catalog)
- [Fumadocs](https://fumadocs.dev)
- [Next.js](https://nextjs.org/docs)
