import Link from 'next/link';
import { gitConfig } from '@/lib/shared';
import { Install } from './install';

const repo = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

export function GetStarted() {
  return (
    <section className="lr-rule-top">
      <div className="lr-container py-24">
        <div className="lr-head">
          <h2 className="lr-h2">One binary, server optional</h2>
          <div>
            <p className="lr-prose">
              One binary for macOS and Linux on x64 and arm64, a data directory, and an MIT licence.
              No schema to migrate and nothing that has to stay running between reads. It is written
              for Bun 1.3, so reading it from source is{' '}
              <code className="lr-mono">bun install</code> and a{' '}
              <code className="lr-mono">--help</code>.
            </p>
            <div className="lr-actions mt-7">
              <a href={repo} className="lr-action">
                View the source
              </a>
              <Link href="/docs/getting-started/quickstart" className="lr-link lr-mono text-sm">
                Read the quickstart
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Install />
        </div>
      </div>
    </section>
  );
}
