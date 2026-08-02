'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BarChart, DotPlot, Legend } from './charts';

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
    note: 'Against the OKF reference consumption pattern.',
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
    id: 'calls',
    label: 'Round trips',
    note: 'Tool calls to answer the same twenty questions, manifest strategy. Ranking first instead trades one extra call per question for tokens.',
    chart: (
      <BarChart
        title="Tool calls"
        axis="30 calls"
        unit="tool calls"
        max={30}
        rows={[
          { label: 'OKF navigator', value: 30, display: '30' },
          { label: 'langonrock', value: 17, display: '17', accent: true },
        ]}
      />
    ),
  },
  {
    id: 'retrieval',
    label: 'Retrieval',
    note: 'The concept that answers, found in the top 8. Named queries, default link expansion, never worse than the raw files.',
    chart: (
      <>
        <DotPlot
          title="Hit rate in the top 8"
          axis="100%"
          unit="percent"
          rows={[
            { label: 'reference, catalogue', base: 70, store: 75, display: '70 → 75%' },
            { label: 'handbook, recipes', base: 90, store: 100, display: '90 → 100%' },
            { label: 'spec, RFCs', base: 95, store: 100, display: '95 → 100%' },
            { label: 'book, novels', base: 80, store: 80, display: '80 → 80%' },
          ]}
        />
        <Legend items={[{ label: 'OKF raw files' }, { label: 'langonrock', accent: true }]} />
      </>
    ),
  },
  {
    id: 'corpus',
    label: 'By corpus',
    note: 'Best strategy per corpus. Structure pays — links, headings, titles — and where prose has none, find fetches a located window instead of the chapter. That is what moved the novels from the 2% they sat at.',
    chart: (
      <BarChart
        title="Tokens saved against the navigator"
        axis="100%"
        unit="percent saved"
        max={100}
        rows={[
          { label: 'spec, 28 RFCs', value: 98, display: '98%', accent: true },
          { label: 'scripture, by book', value: 97, display: '97%', accent: true },
          { label: 'handbook, 1,281 recipes', value: 85, display: '85%', accent: true },
          { label: 'book, 4 novels', value: 70, display: '70%', accent: true },
          { label: 'reference, catalogue', value: 52, display: '52%', accent: true },
        ]}
      />
    ),
  },
];

/**
 * The hero carries the benchmarks the evaluation turns on: what a session
 * costs, how many turns it takes, whether the right concept comes back, and
 * how the saving moves with corpus shape. Magnitudes are zero-baseline bars.
 * Hit rate is a dot pair instead, because it is a rate against a fixed
 * ceiling and a bar renders 70 against 75 as two near-identical lengths.
 * Per-read cost and manifest growth live further down the page, in the
 * features and the cost section, so the hero does not repeat them.
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
        Synthetic corpus, <code className="lr-mono">chars / 4</code> token estimate.{' '}
        <Link href="/docs/architecture/benchmarks" className="lr-link">
          Method
        </Link>
      </p>
    </div>
  );
}
