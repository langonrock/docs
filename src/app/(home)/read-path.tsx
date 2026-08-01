import { CopyButton } from '@/components/ui/copy-button';

const heading = 'The whole path, four commands long';
const description =
  'Nothing you already have moves. langonrock compiles your directory into a snapshot, opens it wherever the agent runs, and hands back one section at a time.';

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

export function ReadPath() {
  return (
    <section className="lr-rule-top">
      <div className="lr-container py-24">
        <div className="lr-head">
          <h2 className="lr-h2">{heading}</h2>
          <p className="lr-prose">{description}</p>
        </div>

        <ol className="mt-14">
          <Step index="01" title="Compile">
            <p className="lr-prose lr-note">
              Point langonrock at your OKF directory. Every subdirectory is read as a bundle, and
              the whole tenant is written as one snapshot named by its own hash. The Markdown stays
              the source of truth and stays conformant, so{' '}
              <code className="lr-mono">okflint</code> and the visualizer keep working on the same
              folder.
            </p>
            <Command value="langonrock sync sources/acme --data ./data --tenant acme" />
            <p className="lr-step-note">
              Identical input produces identical bytes, so syncing after every edit leaves the
              agent’s cached prompt prefix intact instead of billing you to rebuild it.
            </p>
          </Step>

          <Step index="02" title="Open">
            <p className="lr-prose lr-note">
              The scheme picks the mode. Develop embedded against the files, deploy against a daemon
              or a host, and change nothing at the call site, because{' '}
              <code className="lr-mono">open(dsn)</code> returns the same interface for all three.
            </p>
            <dl className="lr-dsn-list">
              {modes.map((mode) => (
                <div key={mode.dsn} className="lr-dsn-row">
                  <dt className="lr-mono">{mode.dsn}</dt>
                  <dd>{mode.body}</dd>
                </div>
              ))}
            </dl>
          </Step>

          <Step index="03" title="Load the manifest">
            <p className="lr-prose lr-note">
              The agent’s first call is the manifest: one tab-separated row per concept with its id,
              its one-line summary, what it links to and whether it is still current. It is the map,
              it goes in the cached prefix, and it comes back byte for byte identical on every
              rebuild.
            </p>
            <Command value="langonrock manifest --data ./data --tenant acme" />
          </Step>

          <Step index="04" title="Get">
            <p className="lr-prose lr-note">
              Ask for the schema of a table or the rollback step of a runbook, addressed by the
              concept’s own Markdown headings, rather than for the document that contains it. Pass
              every id you need in one call instead of paying an inference turn per hop.
            </p>
            <Command value="langonrock get orders --section schema --data ./data --tenant acme" />
            <p className="lr-step-note">
              Omit the flag for the whole concept. The cost of a batched fetch is flat from 500
              concepts to 20,000.
            </p>
          </Step>
        </ol>

        <p className="lr-prose lr-note mt-14">
          Search takes the same path. Retrieval is BM25 over each concept’s names, manifest row and
          body, plus a one-hop expansion across the link graph, capped so that a hub concept cannot
          drag in half the manifest. There is no model anywhere in it, so the same query returns
          the same set tomorrow — and it finds the right concept at least as often as running the
          same ranker over the raw files. A query returns in 1.8 ms at 20,000 concepts.
        </p>
      </div>
    </section>
  );
}
