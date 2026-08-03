import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { siteUrl } from '@/lib/shared';

export const revalidate = false;

const skills = [
  {
    name: 'langonrock',
    type: 'skill-md',
    description:
      "Read and write an Open Knowledge Format store through langonrock's six MCP tools, and set the server up for Claude Code or Cursor.",
    path: 'agent-skills/langonrock/SKILL.md',
  },
];

/**
 * Hashed from the file Next serves out of `public/`, so the digest cannot drift
 * away from the bytes an agent actually downloads.
 */
function describe(skill: (typeof skills)[number]) {
  const bytes = readFileSync(join(process.cwd(), 'public', '.well-known', skill.path));

  return {
    name: skill.name,
    type: skill.type,
    description: skill.description,
    url: `${siteUrl}/.well-known/${skill.path}`,
    digest: `sha256:${createHash('sha256').update(bytes).digest('hex')}`,
  };
}

export function GET() {
  const body = {
    $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
    skills: skills.map(describe),
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  });
}
