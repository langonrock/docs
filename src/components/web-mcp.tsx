'use client';

import { useEffect } from 'react';
import { appName, docsContentRoute, docsRoute } from '@/lib/shared';

interface ToolResult {
  content: { type: 'text'; text: string }[];
}

interface ModelContextTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input: Record<string, string>) => Promise<ToolResult>;
}

declare global {
  interface Navigator {
    modelContext?: {
      provideContext: (context: { tools: ModelContextTool[] }) => void;
    };
  }
}

function say(text: string): ToolResult {
  return { content: [{ type: 'text', text }] };
}

const tools: ModelContextTool[] = [
  {
    name: 'search_docs',
    description: `Search the ${appName} documentation. Returns ranked page paths and the matching text, never whole pages. Call this before get_doc so the path comes from a result rather than a guess.`,
    inputSchema: {
      type: 'object',
      properties: { query: { type: 'string', description: 'Words to search for.' } },
      required: ['query'],
    },
    execute: async ({ query }) => {
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      if (!response.ok) return say(`Search failed with status ${response.status}.`);

      const results: { url: string; content: string }[] = await response.json();
      if (results.length === 0) return say(`Nothing in the documentation matched "${query}".`);

      return say(results.map((result) => `${result.url}\t${result.content}`).join('\n'));
    },
  },
  {
    name: 'get_doc',
    description: `Fetch one ${appName} documentation page as Markdown, given a path from a search result.`,
    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: `Page path, for example ${docsRoute}/guides/mcp.`,
        },
      },
      required: ['path'],
    },
    execute: async ({ path }) => {
      if (!path.startsWith(docsRoute)) return say(`Paths must start with ${docsRoute}.`);

      const response = await fetch(`${docsContentRoute}${path.slice(docsRoute.length)}/content.md`);
      if (!response.ok) return say(`No documentation page at ${path}.`);

      return say(await response.text());
    },
  },
];

export function WebMcp() {
  useEffect(() => {
    navigator.modelContext?.provideContext({ tools });
  }, []);

  return null;
}
