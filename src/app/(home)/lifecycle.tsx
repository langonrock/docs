import { CopyButton } from '@/components/ui/copy-button';

const heading = 'The whole lifecycle, four commands long';
const description =
  'Import a folder once, read it the way an agent does, commit a change against the version you read, and take it back. Each step uses what the one before it returned.';

const modes = [
  { dsn: 'okf:///var/data?tenant=acme', body: 'Embedded, direct file access.' },
  {
    dsn: 'okf+unix:///tmp/okf.sock?tenant=acme',
    body: 'Local daemon, warm indexes, no cold start.',
  },
  { dsn: 'okf+https://host:7777?token=…', body: 'Remote, tenant resolved from the token.' },
];

function Command({ value }: { value: string }) {
  return (
    <div className="lr-code">
      <code className="lr-mono">
        <span className="lr-prompt">$ </span>
        {value}
      </code>
      <CopyButton value={value} />
    </div>
  );
}

function Step({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="lr-step">
      <div className="lr-step-head">
        <span className="lr-step-n lr-mono" aria-hidden="true">
          {index}
        </span>
        <h3 className="lr-step-title">{title}</h3>
      </div>
      <div className="min-w-0">{children}</div>
    </li>
  );
}

export function Lifecycle() {
  return (
    <section className="lr-rule-top">
      <div className="lr-container py-24">
        <div className="lr-head">
          <h2 className="lr-h2">{heading}</h2>
          <p className="lr-prose">{description}</p>
        </div>

        <ol className="mt-14">
          <Step index="01" title="Import">
            <p className="lr-prose lr-note">
              Point langonrock at a folder where every subdirectory is a bundle of Markdown. It
              becomes the tenant’s first commit, and the database remembers what each file looked
              like, so importing the folder again never overwrites an edit made since. A file changed
              on both sides fails the whole import instead of picking a winner.
            </p>
            <Command value="langonrock import sources/acme --data ./data --tenant acme" />
            <p className="lr-step-note">
              The folder is where documents come from, not where they live. Nothing writes back to
              it, and <code className="lr-mono">export</code> writes the current revision to a new
              directory with its frontmatter and line endings intact.
            </p>
          </Step>

          <Step index="02" title="Read">
            <p className="lr-prose lr-note">
              An agent reads the manifest first, one row per concept with its id, its summary, its
              links and whether it is still current, then asks for the one section it chose, every id
              in a single call. The scheme picks where the database runs, and{' '}
              <code className="lr-mono">open(dsn)</code> returns the same interface for all three.
            </p>
            <Command value="langonrock get orders --section schema --data ./data --tenant acme" />
            <dl className="lr-dsn-list">
              {modes.map((mode) => (
                <div key={mode.dsn} className="lr-dsn-row">
                  <dt className="lr-mono">{mode.dsn}</dt>
                  <dd>{mode.body}</dd>
                </div>
              ))}
            </dl>
          </Step>

          <Step index="03" title="Commit">
            <p className="lr-prose lr-note">
              A batch is JSON. Each change names its bundle, its path and the hash of the version it
              replaces, which reading the source returned, or leaves the hash out to say the document
              is new. If one hash is stale, nothing in the batch is published, so two writers cannot
              quietly undo each other.
            </p>
            <Command value="langonrock transact --data ./data --tenant acme --from batch.json" />
            <p className="lr-step-note">
              The commit is visible to manifest, search and get as soon as it returns. It writes a
              complete snapshot, so its cost grows with the tenant: 25 new documents take 94 ms at
              5,000 concepts.
            </p>
          </Step>

          <Step index="04" title="Restore">
            <p className="lr-prose lr-note">
              History lists the retained revisions, newest first. Restore publishes an old one as a
              new commit, and only if the revision you name as current still is, so it cannot undo a
              change you never saw.
            </p>
            <Command value='langonrock restore "$REVISION" --expected-revision "$CURRENT" --data ./data --tenant acme' />
            <p className="lr-step-note">
              Nothing is rewritten. The commit you restored past stays in history until collection
              prunes it, and ten revisions are kept by default.
            </p>
          </Step>
        </ol>

        <p className="lr-prose lr-note mt-14">
          Search takes the same path. Retrieval is BM25 over each concept’s names, manifest row and
          body, plus a one-hop expansion across the links, capped so that a hub concept cannot drag
          in half the manifest. There is no model anywhere in it, so the same query returns the same
          set tomorrow, and it finds the right concept more often than the same ranker over the raw
          files. A query returns in 1.65 ms at 20,000 concepts.
        </p>
      </div>
    </section>
  );
}
