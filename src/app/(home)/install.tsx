'use client';

import { useState } from 'react';
import Link from 'next/link';
import { gitConfig } from '@/lib/shared';
import { CopyButton } from '@/components/ui/copy-button';

const scriptUrl = `https://raw.githubusercontent.com/${gitConfig.user}/${gitConfig.repo}/${gitConfig.branch}/install.sh`;
const releasesUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}/releases`;

interface Target {
  id: string;
  label: string;
  command?: string;
  note: React.ReactNode;
}

const targets: Target[] = [
  {
    id: 'unix',
    label: 'macOS & Linux',
    command: `curl -fsSL ${scriptUrl} | sh`,
    note: 'Detects the platform, verifies the checksum, and drops the binary in ~/.local/bin. x64 and arm64 both covered.',
  },
  {
    id: 'windows',
    label: 'Windows',
    note: (
      <>
        No one-line installer yet. Take <code className="lr-mono">windows-x64</code> or{' '}
        <code className="lr-mono">windows-arm64</code> from the{' '}
        <a href={releasesUrl} className="lr-link text-[color:var(--lr-ink)]">
          releases page
        </a>
        .
      </>
    ),
  },
  {
    id: 'source',
    label: 'From source',
    command: `git clone https://github.com/${gitConfig.user}/${gitConfig.repo} && cd ${gitConfig.repo} && bun install`,
    note: 'Needs Bun 1.3 or newer. The bin entry points straight at src/cli.ts, so there is no build step before running it.',
  },
];

export function Install() {
  const [active, setActive] = useState(targets[0].id);

  /** Arrow keys move between tabs, which is the half of the tab pattern that usually gets skipped. */
  function onKeyDown(event: React.KeyboardEvent) {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const index = targets.findIndex((target) => target.id === active);
    const next = targets[(index + step + targets.length) % targets.length];
    setActive(next.id);
    document.getElementById(`install-tab-${next.id}`)?.focus();
  }

  return (
    <div className="lr-install">
      <div className="lr-install-bar">
        <div className="lr-tabs" role="tablist" aria-label="Install target" onKeyDown={onKeyDown}>
          {targets.map((target) => (
            <button
              key={target.id}
              id={`install-tab-${target.id}`}
              type="button"
              role="tab"
              aria-selected={target.id === active}
              aria-controls={`install-panel-${target.id}`}
              tabIndex={target.id === active ? 0 : -1}
              className={target.id === active ? 'lr-tab lr-tab-on' : 'lr-tab'}
              onClick={() => setActive(target.id)}
            >
              {target.label}
            </button>
          ))}
        </div>

        <a href={scriptUrl} className="lr-link lr-mono lr-install-script">
          View install script
        </a>
      </div>

      {targets.map((target) => (
        <div
          key={target.id}
          id={`install-panel-${target.id}`}
          role="tabpanel"
          aria-labelledby={`install-tab-${target.id}`}
          hidden={target.id !== active}
        >
          {target.command ? (
            <div className="lr-install-cmd">
              <code className="lr-mono">
                <span className="lr-prompt">$ </span>
                {target.command}
              </code>
              <CopyButton value={target.command} />
            </div>
          ) : null}
          <p className="lr-note lr-install-note">{target.note}</p>
        </div>
      ))}

      <p className="lr-note lr-install-note">
        Then <code className="lr-mono">langonrock --version</code> to check it, or{' '}
        <Link
          href="/docs/getting-started/quickstart"
          className="lr-link text-[color:var(--lr-ink)]"
        >
          the quickstart
        </Link>{' '}
        to compile your first tenant.
      </p>
    </div>
  );
}
