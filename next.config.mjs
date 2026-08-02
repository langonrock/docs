import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

const agentLinks = [
  '</llms.mdx/home>; rel="alternate"; type="text/markdown"',
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</docs>; rel="service-doc"; type="text/html"',
  '</.well-known/mcp/server-card.json>; rel="service-desc"; type="application/json"',
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
].join(', ');

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  headers: async () => [{ source: '/', headers: [{ key: 'Link', value: agentLinks }] }],
};

export default withMDX(config);
