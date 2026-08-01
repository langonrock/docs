import Link from 'next/link';
import type { Metadata } from 'next';
import { gitConfig } from '@/lib/shared';

export const metadata: Metadata = {
  title: 'Lang on Rock',
  description:
    'A multi-tenant store for Open Knowledge Format bundles, built so an agent spends as few tokens and as few round trips as possible reading them.',
};

const repo = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

const styles = `
.lr {
  --lr-cobalt: oklch(0.42 0.15 252);
  --lr-cobalt-deep: oklch(0.3 0.13 252);
  --lr-on-cobalt: oklch(1 0 0);
  --lr-on-cobalt-dim: oklch(0.82 0.05 252);
  --lr-signal: oklch(0.86 0.14 195);
  --lr-flag: oklch(0.87 0.11 25);
  --lr-sans: var(--font-brand-sans), ui-sans-serif, system-ui, sans-serif;
  --lr-mono: var(--font-brand-mono), ui-monospace, monospace;
  font-family: var(--lr-sans);
}
.lr-mono {
  font-family: var(--lr-mono);
  font-feature-settings: 'tnum' 1;
}
.lr-drench {
  background: var(--lr-cobalt);
  color: var(--lr-on-cobalt);
}
.lr-deep {
  background: var(--lr-cobalt-deep);
  color: var(--lr-on-cobalt);
}
.lr-display {
  letter-spacing: -0.02em;
  text-wrap: balance;
  font-size: clamp(1.75rem, 1.15rem + 2.6vw, 3.25rem);
  line-height: 1.12;
}
.lr-h2 {
  letter-spacing: -0.015em;
  text-wrap: balance;
  font-size: clamp(1.35rem, 1.1rem + 1vw, 1.85rem);
  line-height: 1.2;
}
.lr-prose {
  max-width: 68ch;
  text-wrap: pretty;
}
.lr-row {
  animation: lr-emit 500ms cubic-bezier(0.16, 1, 0.3, 1) backwards;
}
@keyframes lr-emit {
  from {
    opacity: 0;
    transform: translate3d(0, 0.4rem, 0);
  }
}
.lr-link {
  text-decoration: underline;
  text-underline-offset: 0.25em;
  text-decoration-thickness: 1px;
  text-decoration-color: color-mix(in oklab, currentColor 45%, transparent);
  transition: text-decoration-color 160ms ease-out;
}
.lr-link:hover {
  text-decoration-color: currentColor;
}
@media (prefers-reduced-motion: reduce) {
  .lr-row {
    animation-duration: 1ms;
  }
  .lr-link {
    transition: none;
  }
}
`;

const columns = ['id', 'bundle', 'kind', 'status', 'grain', 'summary', 'links'] as const;

const rows = [
  ['deploy', 'ops', 'runbook', '-', '-', 'How to ship the orders service.', '-'],
  [
    'customers',
    'sales',
    'bigquery_table',
    'deprecated',
    'customer_id',
    'Registered customers, including churned.',
    '-',
  ],
  [
    'orders',
    'sales',
    'bigquery_table',
    '-',
    'order_id',
    'One row per completed customer order.',
    'customers',
  ],
];

const measurements = [
  { label: 'Tokens billed', okf: '116,357', ours: '64,355' },
  { label: 'Tool calls', okf: '30', ours: '17' },
  { label: 'Tokens for one concept read', okf: '594', ours: '213' },
];

const capabilities = [
  {
    title: 'Compiles OKF, does not replace it',
    body: 'Your directory of Markdown stays the source of truth and stays conformant, so okflint, the visualizer and Obsidian keep working on the same folder.',
  },
  {
    title: 'Byte-deterministic output',
    body: 'Identical input compiles to identical bytes, so the manifest survives in the prompt cache across rebuilds instead of invalidating it.',
  },
  {
    title: 'Section addressing',
    body: 'Ask for one section of a concept instead of the whole document, using its own Markdown headings. No model anywhere in the build path.',
  },
  {
    title: 'Batched reads',
    body: 'Pass every id you need in one call. The cost of a batched fetch is flat from 500 concepts to 20,000.',
  },
  {
    title: 'Deterministic retrieval',
    body: 'BM25 plus a one-hop expansion over the link graph, capped so a hub concept cannot drag in most of the manifest.',
  },
  {
    title: 'Content-addressed snapshots',
    body: 'A backup is a file copy and a restore is a file copy back. Rollback is a side effect of naming files by their own hash.',
  },
];

const modes = [
  { dsn: 'okf:///var/data?tenant=acme', body: 'Embedded, direct file access.' },
  { dsn: 'okf+unix:///tmp/okf.sock?tenant=acme', body: 'Local daemon, warm indexes, no cold start.' },
  { dsn: 'okf+https://host:7777?token=…', body: 'Remote, tenant resolved from the token.' },
];

function cellStyle(column: string, value: string) {
  if (value === '-') return { color: 'var(--lr-on-cobalt-dim)', opacity: 0.5 };
  if (column === 'links') return { color: 'var(--lr-signal)' };
  if (column === 'status') return { color: 'var(--lr-flag)' };
  if (column === 'id') return { color: 'var(--lr-on-cobalt)' };
  return { color: 'var(--lr-on-cobalt-dim)' };
}

export default function HomePage() {
  return (
    <main className="lr">
      <style>{styles}</style>

      <section className="lr-drench">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-24">
          <h1 className="lr-display max-w-4xl font-medium">
            Your Markdown stays the source of truth. Your agent reads the compiled manifest.
          </h1>

          <p className="lr-prose mt-7 text-[1.0625rem] leading-relaxed text-[color:var(--lr-on-cobalt-dim)]">
            OKF is a good authoring format and an expensive reading format. The agent pays for full
            frontmatter on every read, and the reference consumption pattern walks the graph one
            file at a time, spending an inference turn per hop. langonrock compiles a folder of
            bundles into one dense manifest it keeps in its cached prompt prefix, then fetches
            concepts in batches, by section.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={repo}
              className="lr-mono rounded-md bg-[color:var(--lr-on-cobalt)] px-4 py-2.5 text-sm font-medium text-[color:var(--lr-cobalt)] transition-opacity hover:opacity-90"
            >
              View the source
            </a>
            <Link href="/docs" className="lr-link lr-mono text-sm">
              Read the documentation
            </Link>
          </div>

          <div className="mt-14 overflow-x-auto">
            <table className="lr-mono w-full min-w-[48rem] border-collapse text-[0.8125rem]">
              <caption className="pb-3 text-left text-[color:var(--lr-on-cobalt-dim)] opacity-70">
                <span className="block"># tenant: acme</span>
                <span className="block"># bundles: ops sales</span>
              </caption>
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column}
                      scope="col"
                      className="whitespace-nowrap border-b border-white/25 py-2 pr-8 text-left font-normal text-[color:var(--lr-on-cobalt-dim)] last:pr-0"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={row[0]}
                    className="lr-row"
                    style={{ animationDelay: `${120 + index * 90}ms` }}
                  >
                    {row.map((value, cell) => (
                      <td
                        key={columns[cell]}
                        className="whitespace-nowrap border-b border-white/10 py-2.5 pr-8 align-top last:pr-0"
                        style={cellStyle(columns[cell], value)}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="lr-prose mt-5 text-sm text-[color:var(--lr-on-cobalt-dim)]">
            One row per concept. The{' '}
            <span style={{ color: 'var(--lr-signal)' }}>links</span> column carries the graph, so
            the agent knows every id it needs before it fetches anything. A{' '}
            <span style={{ color: 'var(--lr-flag)' }}>status</span> cell other than{' '}
            <span className="opacity-60">-</span> is the concept telling you it is not current.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <h2 className="lr-h2 font-medium">Twenty questions, one session</h2>
        <p className="lr-prose mt-4 text-fd-muted-foreground">
          Measured against the OKF reference consumption pattern, over the same corpus and the same
          twenty questions, with both paths charged for delivering the same concepts.
        </p>

        <table className="lr-mono mt-9 w-full max-w-3xl border-collapse text-sm">
          <thead>
            <tr className="text-fd-muted-foreground">
              <th scope="col" className="border-b border-fd-border py-2.5 text-left font-normal">
                Measured
              </th>
              <th scope="col" className="border-b border-fd-border py-2.5 text-right font-normal">
                OKF navigator
              </th>
              <th scope="col" className="border-b border-fd-border py-2.5 text-right font-normal">
                langonrock
              </th>
            </tr>
          </thead>
          <tbody>
            {measurements.map((row) => (
              <tr key={row.label}>
                <th
                  scope="row"
                  className="border-b border-fd-border/60 py-3.5 text-left font-normal"
                >
                  {row.label}
                </th>
                <td className="border-b border-fd-border/60 py-3.5 text-right text-fd-muted-foreground">
                  {row.okf}
                </td>
                <td className="border-b border-fd-border/60 py-3.5 text-right font-medium">
                  {row.ours}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="lr-prose mt-6 text-sm text-fd-muted-foreground">
          The manifest is not smaller than the Markdown it replaces. The saving is batching and
          section addressing. It also ranks worse than raw Markdown on mean reciprocal rank, which
          is a real cost of compiling.{' '}
          <Link href="/docs/architecture/benchmarks" className="lr-link text-fd-foreground">
            Full numbers, including where the store loses
          </Link>
          .
        </p>
      </section>

      <section className="border-t border-fd-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="lr-h2 font-medium">What it does</h2>

          <div className="mt-9 grid gap-x-14 gap-y-9 sm:grid-cols-2">
            {capabilities.map((item) => (
              <div key={item.title}>
                <h3 className="text-[0.9375rem] font-semibold">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fd-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-fd-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="lr-h2 font-medium">Three modes, one interface</h2>
          <p className="lr-prose mt-4 text-fd-muted-foreground">
            The scheme picks the mode and <code className="lr-mono">open(dsn)</code> returns the same
            interface for all of them. Develop embedded, deploy remote, change nothing at the call
            site.
          </p>

          <dl className="mt-9 space-y-6">
            {modes.map((mode) => (
              <div key={mode.dsn} className="sm:flex sm:items-baseline sm:gap-8">
                <dt className="lr-mono text-sm sm:w-[23rem] sm:shrink-0">{mode.dsn}</dt>
                <dd className="mt-1 text-sm text-fd-muted-foreground sm:mt-0">{mode.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="lr-deep">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="lr-h2 font-medium">There is an editor for the people</h2>
          <p className="lr-prose mt-4 text-[color:var(--lr-on-cobalt-dim)] leading-relaxed">
            langoneditor is the human-facing half. A desktop app for macOS, Windows and Linux that
            browses the bundle tree, edits concepts as Markdown, draws the link graph, searches the
            server’s index, and moves bundles in and out as archives or spreadsheets. It ships the
            langonrock binary inside it, so nothing else is required to run it.
          </p>
          <p className="mt-6">
            <a href="https://github.com/langonrock/editor" className="lr-link lr-mono text-sm">
              langonrock/editor
            </a>
          </p>
        </div>
      </section>

      <section className="border-t border-fd-border">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-12">
          <p className="lr-mono text-sm text-fd-muted-foreground">
            Two runtime dependencies. No database. MIT.
          </p>
          <div className="lr-mono flex flex-wrap gap-x-7 gap-y-2 text-sm">
            <a href={repo} className="lr-link">
              GitHub
            </a>
            <Link href="/docs/getting-started/quickstart" className="lr-link">
              Quickstart
            </Link>
            <Link href="/docs/guides/mcp" className="lr-link">
              MCP server
            </Link>
            <Link href="/docs/architecture/read-model" className="lr-link">
              How it works
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
