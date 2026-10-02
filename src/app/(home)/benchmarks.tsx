'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BarChart } from './charts';

const chromaResults = 'https://github.com/langonrock/langonrock/blob/main/bench/results/chroma/README.md';

interface Benchmark {
  id: string;
  label: string;
  better: 'higher' | 'lower';
  note: string;
  chart: React.ReactNode;
}

const benchmarks: Benchmark[] = [
  {
    id: 'retrieval',
    label: 'Retrieval',
    better: 'higher',
    note: 'Twenty questions that name the concept they ask about, over a 500-concept catalogue. OKF is BM25 over the raw files; ChromaDB embeds 1,000-character chunks with all-MiniLM-L6-v2. Asked by description instead, langonrock and OKF find it 95% of the time and ChromaDB 70%, and on no corpus measured did langonrock find it less often than either.',
    chart: (
      <BarChart
        footnote
        title="Right concept in the top 8"
        axis="100%"
        unit="percent of questions"
        max={100}
        rows={[
          { label: 'langonrock', value: 75, display: '75%', accent: true },
          { label: 'OKF raw files', value: 70, display: '70%' },
          { label: 'ChromaDB', value: 30, display: '30%' },
        ]}
      />
    ),
  },
  {
    id: 'calls',
    label: 'Round trips',
    better: 'lower',
    note: 'The same twenty questions, each side on its path with the fewest calls. langonrock reads the manifest once and makes one batched fetch for each of the sixteen questions that need a document. ChromaDB returns its top eight chunks with their text, one search per question. The OKF navigator reads index.md, then each answer’s file and the files it links to. On prose with no links to batch, all three need about one per question: 21, 21 and 20 on four novels.',
    chart: (
      <BarChart
        footnote
        title="Tool calls"
        axis="30 calls"
        unit="tool calls"
        max={30}
        rows={[
          { label: 'langonrock', value: 17, display: '17', accent: true },
          { label: 'OKF navigator', value: 30, display: '30' },
          { label: 'ChromaDB', value: 20, display: '20' },
        ]}
      />
    ),
  },
  {
    id: 'tokens',
    label: 'Tokens',
    better: 'lower',
    note: 'Twenty questions over four novels, one concept per chapter, each side on its cheapest path. langonrock ranks and then reads a located window instead of the chapter, ChromaDB returns its top eight chunks with their text, and the navigator reads whole chapters. On the catalogue ChromaDB’s cheapest path bills fewer, 30,804 against 56,928, charged as if it always fetched the right chunk, and on the recipes 18,450 against 19,551.',
    chart: (
      <BarChart
        footnote
        title="Tokens billed"
        axis="130,101 tokens"
        unit="tokens"
        max={130101}
        rows={[
          { label: 'langonrock', value: 39862, display: '39,862', accent: true },
          { label: 'OKF navigator', value: 130101, display: '130,101' },
          { label: 'ChromaDB', value: 73021, display: '73,021' },
        ]}
      />
    ),
  },
];

/**
 * Every tab puts the same three side by side on the same questions and the same
 * machine, langonrock first: OKF as its reference pattern reads it, ChromaDB on
 * its own best path for that measure. Each tab is a measure langonrock wins,
 * and its note states, beside it, where another side wins instead.
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
            <p className="lr-bench-note">
              <span className="lr-bench-better">
                <span aria-hidden="true">* </span>
                {benchmark.better === 'higher' ? 'Higher is better.' : 'Lower is better.'}
              </span>{' '}
              {benchmark.note}
            </p>
          </div>
        ))}
      </div>

      <p className="lr-bench-foot">
        How these were measured:{' '}
        <Link href="/docs/architecture/benchmarks" className="lr-link">
          OKF and langonrock
        </Link>
        ,{' '}
        <a href={chromaResults} className="lr-link">
          ChromaDB
        </a>
        .
      </p>
    </div>
  );
}
