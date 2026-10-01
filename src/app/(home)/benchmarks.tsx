'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BarChart, ChangeChart } from './charts';

interface Benchmark {
  id: string;
  label: string;
  note: string;
  chart: React.ReactNode;
}

const benchmarks: Benchmark[] = [
  {
    id: 'tokens',
    label: 'Tokens',
    note: 'Twenty questions over 500 concepts, against the OKF reference consumption pattern. The same session takes 17 tool calls instead of 30.',
    chart: (
      <BarChart
        title="Tokens billed"
        axis="116,357 tokens"
        unit="tokens"
        max={116357}
        rows={[
          { label: 'OKF navigator', value: 116357, display: '116,357' },
          { label: 'langonrock', value: 64355, display: '64,355', accent: true },
        ]}
      />
    ),
  },
  {
    id: 'engine',
    label: 'Engine',
    note: 'Median of ten paired runs at 5,000 concepts on Bun 1.4.2, the runtime the binary ships with. Opening a tenant fails its limit there, at 500 concepts too, so performance acceptance is still open. Disk is ten identical edits with ten revisions kept, measured on Bun 1.3.12.',
    chart: (
      <ChangeChart
        title="Against the engine it replaced"
        axis="±70%"
        unit="percent change"
        max={70}
        rows={[
          { label: 'Get a concept', value: -48.72, display: '−49%' },
          { label: 'Edit, then search', value: -44.93, display: '−45%' },
          { label: 'Warm search', value: -37.35, display: '−37%' },
          { label: 'Import a folder', value: -5.18, display: '−5%' },
          { label: 'Open a tenant', value: 34.26, display: '+34%' },
          { label: 'Disk, ten revisions', value: 68.9, display: '+69%' },
        ]}
      />
    ),
  },
  {
    id: 'operations',
    label: 'Operations',
    note: 'Median milliseconds at 5,000 concepts on Bun 1.3.12. The old engine had none of these, so there is nothing to compare against. A commit writes a complete snapshot, so it grows with the tenant: 25 new documents take 36 ms at 500 concepts and 278 ms at 20,000.',
    chart: (
      <BarChart
        title="What a database operation costs"
        axis="93.8 ms"
        unit="milliseconds"
        max={93.753}
        rows={[
          { label: 'Commit 25 new documents', value: 93.753, display: '93.8 ms', accent: true },
          { label: 'Restore a revision', value: 71.397, display: '71.4 ms', accent: true },
          { label: 'Commit 25 replacements', value: 39.879, display: '39.9 ms', accent: true },
          { label: 'Refuse the losing writer', value: 18.731, display: '18.7 ms', accent: true },
          { label: 'Commit the winning writer', value: 14.874, display: '14.9 ms', accent: true },
          { label: 'Read a page of history', value: 1.135, display: '1.1 ms', accent: true },
        ]}
      />
    ),
  },
  {
    id: 'corpus',
    label: 'By corpus',
    note: 'Best strategy per corpus, at the grain shown. Structure pays — links, headings, titles — and where prose has none, find fetches a located window instead of the chapter. That is what moved the novels from the 2% they sat at.',
    chart: (
      <BarChart
        title="Tokens saved against the navigator"
        axis="100%"
        unit="percent saved"
        max={100}
        rows={[
          { label: 'spec, 28 RFCs', value: 98, display: '98%', accent: true },
          { label: 'scripture, by book', value: 97, display: '97%', accent: true },
          { label: 'handbook, 1,281 recipes', value: 84, display: '84%', accent: true },
          { label: 'book, by chapter', value: 69, display: '69%', accent: true },
          { label: 'reference, catalogue', value: 51, display: '51%', accent: true },
        ]}
      />
    ),
  },
];

/**
 * The hero carries the benchmarks the evaluation turns on: what a session costs
 * an agent, how the engine moved against the one it replaced, what the new
 * database operations cost, and how the saving moves with corpus shape. The
 * engine tab is signed change around a zero line, because its rows mix time and
 * disk and only the direction and size of the change compare across them.
 */
export function Benchmarks() {
  const [active, setActive] = useState(benchmarks[0].id);

  /** Arrow keys move between tabs, which is the half of the tab pattern that usually gets skipped. */
  function onKeyDown(event: React.KeyboardEvent) {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const index = benchmarks.findIndex((benchmark) => benchmark.id === active);
    const next = benchmarks[(index + step + benchmarks.length) % benchmarks.length];
    setActive(next.id);
    document.getElementById(`bench-tab-${next.id}`)?.focus();
  }

  return (
    <div className="lr-bench">
      <div className="lr-bench-bar">
        <span className="lr-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>

        <div className="lr-tabs" role="tablist" aria-label="Benchmark" onKeyDown={onKeyDown}>
          {benchmarks.map((benchmark) => (
            <button
              key={benchmark.id}
              id={`bench-tab-${benchmark.id}`}
              type="button"
              role="tab"
              aria-selected={benchmark.id === active}
              aria-controls={`bench-panel-${benchmark.id}`}
              tabIndex={benchmark.id === active ? 0 : -1}
              className={benchmark.id === active ? 'lr-tab lr-tab-on' : 'lr-tab'}
              onClick={() => setActive(benchmark.id)}
            >
              {benchmark.label}
            </button>
          ))}
        </div>
      </div>

      <div className="lr-bench-panels">
        {benchmarks.map((benchmark) => (
          <div
            key={benchmark.id}
            id={`bench-panel-${benchmark.id}`}
            role="tabpanel"
            aria-labelledby={`bench-tab-${benchmark.id}`}
            inert={benchmark.id !== active}
            className={benchmark.id === active ? 'lr-bench-body' : 'lr-bench-body lr-bench-off'}
          >
            {benchmark.chart}
            <p className="lr-bench-note">{benchmark.note}</p>
          </div>
        ))}
      </div>

      <p className="lr-bench-foot">
        How these were measured:{' '}
        <Link href="/docs/architecture/benchmarks" className="lr-link">
          read model
        </Link>
        ,{' '}
        <Link href="/docs/architecture/engine-benchmarks" className="lr-link">
          engine
        </Link>
        .
      </p>
    </div>
  );
}
