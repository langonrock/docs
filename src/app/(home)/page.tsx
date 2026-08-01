import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Langonrock',
  description:
    'A multi-tenant store for Open Knowledge Format bundles, built so an agent spends as few tokens and as few round trips as possible reading them.',
};

const styles = `
.lr {
  --lr-graph: #92400e;
  --lr-flag: #b91c1c;
  --lr-rule: color-mix(in srgb, var(--color-fd-border) 100%, transparent);
}
.dark .lr {
  --lr-graph: #fbbf24;
  --lr-flag: #f87171;
}
.lr-mono {
  font-family: var(--font-mono-display), ui-monospace, monospace;
}
.lr-row {
  animation: lr-emit 420ms cubic-bezier(0.22, 1, 0.36, 1) backwards;
}
@keyframes lr-emit {
  from {
    opacity: 0;
    transform: translateY(0.35rem);
  }
}
@media (prefers-reduced-motion: reduce) {
  .lr-row {
    animation: none;
  }
}
`;

const columns = ['id', 'bundle', 'kind', 'status', 'grain', 'summary', 'links'];

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
    body: 'get(id, "schema") returns one slice instead of the whole document, using the concept’s own Markdown headings. No model in the build path.',
  },
  {
    title: 'Batched reads',
    body: 'Pass every id you need in one call. N concepts cost one round trip, and the cost is flat from 500 concepts to 20,000.',
  },
  {
    title: 'Deterministic retrieval',
    body: 'BM25 plus a capped one-hop expansion over the link graph, with no model call anywhere in the path.',
  },
  {
    title: 'Content-addressed snapshots',
    body: 'A backup is a file copy, a restore is a file copy back, and a rollback is a side effect of naming files by their own hash.',
  },
];

const modes = [
  { dsn: 'okf:///var/data?tenant=acme', body: 'Embedded, direct file access.' },
  { dsn: 'okf+unix:///tmp/okf.sock?tenant=acme', body: 'Local daemon, warm indexes, no cold start.' },
  { dsn: 'okf+https://host:7777?token=…', body: 'Remote, tenant resolved from the token.' },
];

function Cell({ value, column }: { value: string; column: string }) {
  const muted = value === '-';
  const color =
    column === 'links' && !muted
      ? 'var(--lr-graph)'
      : column === 'status' && !muted
        ? 'var(--lr-flag)'
        : undefined;

  return (
    <td
      className="whitespace-nowrap py-1.5 pr-6 align-top last:pr-0"
      style={{ color, opacity: muted ? 0.35 : undefined }}
    >
      {value}
    </td>
  );
}

export default function HomePage() {
  return (
    <main className="lr">
      <style>{styles}</style>

      <section className="mx-auto w-full max-w-5xl px-6 pt-16 pb-14 sm:pt-24">
        <p className="lr-mono text-xs uppercase tracking-[0.18em] text-fd-muted-foreground">
          A store for Open Knowledge Format bundles
        </p>

        <h1 className="lr-mono mt-6 max-w-3xl text-balance text-2xl font-medium leading-[1.25] tracking-tight sm:text-3xl md:text-[2.35rem]">
          Your Markdown stays the source of truth.
          <br />
          Your agent reads the compiled manifest.
        </h1>

        <p className="mt-6 max-w-2xl text-fd-muted-foreground leading-relaxed">
          OKF is a good authoring format and an expensive reading format. The agent pays for full
          frontmatter on every read, and the reference consumption pattern walks the graph one file
          at a time, spending an inference turn per hop. langonrock compiles a folder of bundles
          into one dense manifest it keeps in its cached prompt prefix, then fetches concepts in
          batches, by section.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link
            href="/docs/getting-started/quickstart"
            className="lr-mono rounded-md bg-fd-foreground px-4 py-2.5 text-sm font-medium text-fd-background transition-opacity hover:opacity-90"
          >
            Start in four commands
          </Link>
          <Link
            href="/docs"
            className="lr-mono rounded-md border border-fd-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-fd-accent"
          >
            Read the documentation
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-20">
        <div className="overflow-x-auto rounded-lg border border-fd-border bg-fd-card">
          <table className="lr-mono w-full min-w-[46rem] text-[0.78rem] leading-relaxed">
            <caption className="border-b border-fd-border px-5 py-3 text-left text-fd-muted-foreground">
              <span className="block"># tenant: acme</span>
              <span className="block"># bundles: ops sales</span>
            </caption>
            <thead>
              <tr className="border-b border-fd-border text-fd-muted-foreground">
                {columns.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="whitespace-nowrap py-2 pr-6 text-left font-medium first:pl-5 last:pr-5"
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
                  className="lr-row border-b border-fd-border/60 last:border-0 [&>td:first-child]:pl-5 [&>td:last-child]:pr-5"
                  style={{ animationDelay: `${140 + index * 90}ms` }}
                >
                  {row.map((value, cell) => (
                    <Cell key={columns[cell]} value={value} column={columns[cell]} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 max-w-2xl text-sm text-fd-muted-foreground">
          One row per concept. The <span style={{ color: 'var(--lr-graph)' }}>links</span> column
          carries the graph, so the agent knows every id it needs before it fetches anything. A{' '}
          <span style={{ color: 'var(--lr-flag)' }}>status</span> cell other than <code>-</code> is
          the concept telling you it is not current.
        </p>
      </section>

      <section className="border-y border-fd-border bg-fd-card/40">
        <div className="mx-auto w-full max-w-5xl px-6 py-16">
          <h2 className="lr-mono text-xs uppercase tracking-[0.18em] text-fd-muted-foreground">
            Twenty questions, one session
          </h2>

          <table className="lr-mono mt-8 w-full max-w-2xl text-sm">
            <thead>
              <tr className="border-b border-fd-border text-fd-muted-foreground">
                <th scope="col" className="py-2 text-left font-medium">
                  Measured
                </th>
                <th scope="col" className="py-2 text-right font-medium">
                  OKF navigator
                </th>
                <th scope="col" className="py-2 text-right font-medium">
                  langonrock
                </th>
              </tr>
            </thead>
            <tbody>
              {measurements.map((row) => (
                <tr key={row.label} className="border-b border-fd-border/60 last:border-0">
                  <th scope="row" className="py-3 text-left font-normal">
                    {row.label}
                  </th>
                  <td className="py-3 text-right text-fd-muted-foreground tabular-nums">
                    {row.okf}
                  </td>
                  <td className="py-3 text-right font-medium tabular-nums">{row.ours}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="mt-6 max-w-2xl text-sm text-fd-muted-foreground">
            The manifest is not smaller than the Markdown it replaces. The saving is batching and
            section addressing.{' '}
            <Link href="/docs/architecture/benchmarks" className="underline underline-offset-4">
              Full numbers, including where the store loses
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-16">
        <h2 className="lr-mono text-xs uppercase tracking-[0.18em] text-fd-muted-foreground">
          What it does
        </h2>

        <div className="mt-8 grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {capabilities.map((item) => (
            <div key={item.title}>
              <h3 className="lr-mono text-sm font-medium">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fd-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-fd-border">
        <div className="mx-auto w-full max-w-5xl px-6 py-16">
          <h2 className="lr-mono text-xs uppercase tracking-[0.18em] text-fd-muted-foreground">
            Three modes, one interface
          </h2>

          <dl className="mt-8 space-y-5">
            {modes.map((mode) => (
              <div key={mode.dsn} className="sm:flex sm:items-baseline sm:gap-6">
                <dt className="lr-mono text-sm sm:w-[22rem] sm:shrink-0">{mode.dsn}</dt>
                <dd className="mt-1 text-sm text-fd-muted-foreground sm:mt-0">{mode.body}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 max-w-2xl text-sm text-fd-muted-foreground">
            The scheme picks the mode and <code>open(dsn)</code> returns the same interface for all
            of them. Develop embedded, deploy remote, change nothing at the call site.
          </p>
        </div>
      </section>

      <section className="border-t border-fd-border">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-6 px-6 py-12">
          <p className="lr-mono text-sm">Two runtime dependencies. No database.</p>
          <div className="lr-mono flex flex-wrap gap-6 text-sm">
            <Link href="/docs/getting-started/installation" className="underline underline-offset-4">
              Install
            </Link>
            <Link href="/docs/guides/mcp" className="underline underline-offset-4">
              Use it from an agent
            </Link>
            <Link href="/docs/architecture/read-model" className="underline underline-offset-4">
              How it works
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
