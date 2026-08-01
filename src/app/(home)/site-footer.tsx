import Link from 'next/link';
import { appName, gitConfig, siteTagline } from '@/lib/shared';

const repo = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;
const editorRepo = 'https://github.com/langonrock/editor';

const columns = [
  {
    title: 'Start',
    links: [
      { label: 'Quickstart', href: '/docs/getting-started/quickstart' },
      { label: 'MCP server', href: '/docs/guides/mcp' },
      { label: 'Large tenants', href: '/docs/guides/large-tenants' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'How it works', href: '/docs/architecture/read-model' },
      { label: 'Benchmarks', href: '/docs/architecture/benchmarks' },
      { label: 'Cost model', href: '/docs/architecture/cost-model' },
    ],
  },
  {
    title: 'Source',
    links: [
      { label: 'langonrock', href: repo, external: true },
      { label: 'langoneditor', href: editorRepo, external: true },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="lr-rule-top">
      <div className="lr-container py-16">
        <div className="lr-footer">
          <div>
            <p className="lr-footer-brand">{appName}</p>
            <p className="lr-footer-tagline">
              {siteTagline.charAt(0).toUpperCase() + siteTagline.slice(1)}.
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="lr-footer-title">{column.title}</p>
              <ul className="lr-footer-links">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {'external' in link ? (
                      <a href={link.href} className="lr-link">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="lr-link">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p className="lr-footer-legal">MIT licence. Compiled from Open Knowledge Format bundles.</p>
      </div>
    </footer>
  );
}
