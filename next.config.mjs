import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

const agentLinks = [
  '</llms.mdx/home>; rel="alternate"; type="text/markdown"',
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</docs>; rel="service-doc"; type="text/html"',
  '</.well-known/mcp/server-card.json>; rel="service-desc"; type="application/json"',
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
].join(', ');

const movedPages = [
  ['/docs/guides/backups', '/docs/database/maintenance'],
  ['/docs/architecture/cross-platform', '/docs/architecture/runtime'],
];

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // A lockfile in a parent directory would otherwise make Next infer it as the
  // workspace root, so Turbopack would watch and resolve from far above this repo.
  turbopack: { root: import.meta.dirname },
  headers: async () => [{ source: '/', headers: [{ key: 'Link', value: agentLinks }] }],
  redirects: async () =>
    movedPages.flatMap(([source, destination]) => [
      { source, destination, permanent: true },
      { source: `${source}.md`, destination: `${destination}.md`, permanent: true },
    ]),
};

export default withMDX(config);
