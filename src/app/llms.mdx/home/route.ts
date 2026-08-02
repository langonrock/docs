import { source } from '@/lib/source';
import { llms } from 'fumadocs-core/source';
import { appName, siteLead, siteTagline } from '@/lib/shared';

export const revalidate = false;

export function GET() {
  const index = llms(source).index();
  // the generated index opens with its own bare `# ${appName}`, replaced here by
  // the heading and lead the HTML homepage shows, so both representations agree
  const pages = index.slice(index.indexOf('\n')).trimStart();

  return new Response(`# ${appName} — ${siteTagline}\n\n> ${siteLead}\n\n${pages}`, {
    headers: { 'Content-Type': 'text/markdown' },
  });
}
