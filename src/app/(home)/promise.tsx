import Link from 'next/link';

const heading = 'What a commit promises, and where it stops';
const description =
  'The engine is small enough to state in full: a directory per tenant, immutable files named by their hash, and one pointer that moves.';

const tenant = [
  { name: 'HEAD', body: 'The committed revision. Replacing this file is the commit.' },
  { name: 'snapshots/', body: 'The compiled read model of each revision, named by its hash.' },
  { name: 'sources/', body: 'The exact Markdown: frontmatter, paths, navigation files.' },
  { name: 'revisions/', body: 'One immutable record per commit, pointing at its parent.' },
  { name: 'imports/', body: 'What each imported folder looked like the last time.' },
  { name: 'staging/', body: 'Writes still being prepared. No reader ever sees them.' },
  { name: 'writer.lock', body: 'Held by the kernel, so one writer publishes at a time.' },
  {
    name: 'retention.lock',
    body: 'Readers take it briefly to pin a revision, collection to delete one.',
  },
];

export function CommitPromise() {
  return (
    <section className="lr-rule-top">
      <div className="lr-container py-24">
        <div className="lr-head">
          <h2 className="lr-h2">{heading}</h2>
          <p className="lr-prose">{description}</p>
        </div>

        <div className="lr-promise mt-14">
          <div>
            <p className="lr-prose">
              A normal return means the commit is on disk. Every new file is written and flushed
              first, then <code className="lr-mono">HEAD</code> is replaced and flushed again, and
              that replacement is the commit. A writer killed halfway leaves files no revision points
              at, which no reader sees and collection removes. A failure after the swap comes back as
              indeterminate, with the revision to inspect, and a corrupt{' '}
              <code className="lr-mono">HEAD</code> fails closed instead of falling back to an older
              revision.
            </p>

            <p className="lr-prose mt-5">
              A reader pins the revision it opened, so a search ranks and fetches against one state
              even while a commit lands beside it. Writers wait for each other on a kernel lock, and
              a writer that loses the race is refused rather than merged.
            </p>

            <p className="lr-prose mt-5">
              It is a local engine for documents. There is no SQL or query language, no replication,
              no transaction across tenants and no promise on a network filesystem. Crash recovery
              was tested by killing processes, not by cutting power, and the test suite passes on
              macOS and Linux but not yet on Windows. Every commit writes a complete snapshot, so
              each revision kept adds disk until collection prunes it.
            </p>

            <p className="lr-prose lr-note mt-8">
              <Link
                href="/docs/database/durability"
                className="lr-link text-[color:var(--lr-ink)]"
              >
                The full failure contract
              </Link>
              , surface by surface.
            </p>
          </div>

          <figure className="lr-figure min-w-0">
            <figcaption className="lr-figcaption">
              <b>A tenant on disk</b>
              <span className="lr-mono">data/tenants/acme/</span>
            </figcaption>
            <dl className="lr-dsn-list">
              {tenant.map((entry) => (
                <div key={entry.name} className="lr-dsn-row">
                  <dt className="lr-mono">{entry.name}</dt>
                  <dd>{entry.body}</dd>
                </div>
              ))}
            </dl>
          </figure>
        </div>
      </div>
    </section>
  );
}
