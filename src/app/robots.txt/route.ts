import { siteUrl } from '@/lib/shared';

export const revalidate = false;

/**
 * Written by hand rather than through `MetadataRoute.Robots`, which has no slot for
 * the `Content-Signal` line. The signals are a declaration of intent under
 * https://contentsignals.org, not a crawl rule, so they carry the explanatory
 * comment that spec asks publishers to keep alongside them.
 */
const body = `# Content signals declare how this site's content may be used.
# ai-train=yes: training generative AI models is permitted.
# search=yes: building a search index and linking back is permitted.
# ai-input=yes: retrieving these pages as grounding context for an AI answer is permitted.

User-agent: *
Content-Signal: ai-train=yes, search=yes, ai-input=yes
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

export function GET() {
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
