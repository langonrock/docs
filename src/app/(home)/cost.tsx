'use client';

import { useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Legend } from './charts';

const heading = 'What it costs, and where it loses';
const description =
  'Twenty fixed questions over the same corpus, both paths charged for delivering the same concepts. The baseline is the OKF reference consumption pattern, running the same BM25 over the raw Markdown with perfect navigation and never a wrong turn.';

const scale = [
  { concepts: '500', manifest: 20549, slice: 20549 },
  { concepts: '5,000', manifest: 205851, slice: 20419 },
  { concepts: '20,000', manifest: 835922, slice: 20486 },
];

const config = {
  manifest: { label: 'Whole manifest', color: 'var(--lr-mark-dim)' },
  slice: { label: 'One bundle slice', color: 'var(--lr-cobalt)' },
} satisfies ChartConfig;

/**
 * `linear` rather than a spline, because three measured points are all there is
 * and curvature between them would be drawn rather than measured. recharts runs
 * its reveal in JavaScript, out of reach of the stylesheet's reduced-motion block.
 */
export function Cost() {
  const animate = !useReducedMotion();

  return (
    <section className="lr-rule-top">
      <div className="lr-container py-24">
        <div className="lr-head">
          <h2 className="lr-h2">{heading}</h2>
          <p className="lr-prose">{description}</p>
        </div>

        <div className="lr-cost mt-14">
          <div className="lr-cost-prose">
            <p className="lr-prose">
              A session that bills 116,357 tokens against that baseline bills 64,355 here, over 17
              tool calls instead of 30. Thirteen fewer round trips is thirteen fewer inference turns
              you wait through, so the answer lands sooner as well as cheaper. That is the synthetic
              catalogue; over real corpora the same harness saves between 51% on the warehouse
              catalogue and 98% on RFCs. It used to bottom out at 2% on the novels — locating a
              passage instead of fetching the chapter moved them to 69%.
            </p>

            <p className="lr-prose mt-5">
              None of that is density. The manifest is larger than a well-kept{' '}
              <code className="lr-mono">index.md</code>, 20,549 tokens against 16,575. The saving
              comes from asking for one section instead of a whole document, which takes a read from
              594 tokens to 213, and from narrowing to a bundle instead of reading the tenant.
            </p>

            <p className="lr-prose mt-5">
              Compiling used to cost ranking. The frontmatter the compiler strips repeated the
              concept id in its <code className="lr-mono">resource</code> and{' '}
              <code className="lr-mono">sources</code> URLs, which happened to help the ranker.
              Indexing each concept&rsquo;s own names — its id and its frontmatter title, weighted
              above the other fields — gave it back: hit rate lands at 75% against the
              baseline&rsquo;s 70%, mean reciprocal rank at 0.44 against 0.43. Queries that
              describe a concept instead of naming it move the same way — Mrs Beeton&rsquo;s
              recipes go from 55% on the raw files to 80% here. What still loses, narrowly, is
              ranking on plain prose: the raw files keep a slightly better top position on the
              novels, 0.72 mean reciprocal rank against 0.69. The session cost no longer follows
              it — <code className="lr-mono">find</code> gives prose the sub-document addressing
              its missing headings never could, and a 3,244-token chapter read becomes a 513-token
              window.
            </p>

            <p className="lr-prose lr-note mt-8">
              Synthetic corpus, a deliberately crude <code className="lr-mono">chars / 4</code> token
              estimate, one script on one machine. Treat all of it as an order of magnitude and
              measure your own bundles.{' '}
              <Link
                href="/docs/architecture/benchmarks"
                className="lr-link text-[color:var(--lr-ink)]"
              >
                The full tables, and the method behind them
              </Link>
              .
            </p>
          </div>

          <figure className="lr-cost-figure">
            <figcaption className="lr-cost-title">
              Tokens to read, as the tenant grows by bundles of 500
            </figcaption>

            <ChartContainer config={config}>
              <AreaChart accessibilityLayer data={scale} margin={{ left: 4, right: 12, top: 8 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="concepts" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickCount={3}
                  width={44}
                  tickFormatter={(value: number) => `${Math.round(value / 1000)}k`}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent labelFormatter={(value) => `${value} concepts`} />}
                />
                <defs>
                  <linearGradient id="fillManifest" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-manifest)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-manifest)" stopOpacity={0.08} />
                  </linearGradient>
                  <linearGradient id="fillSlice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-slice)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-slice)" stopOpacity={0.08} />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="manifest"
                  type="linear"
                  fill="url(#fillManifest)"
                  stroke="var(--color-manifest)"
                  isAnimationActive={animate}
                />
                <Area
                  dataKey="slice"
                  type="linear"
                  fill="url(#fillSlice)"
                  stroke="var(--color-slice)"
                  isAnimationActive={animate}
                />
              </AreaChart>
            </ChartContainer>

            <Legend
              items={[{ label: 'Whole manifest' }, { label: 'One bundle slice', accent: true }]}
            />

            <p className="lr-cost-note">
              The tenant grows by adding bundles. The slice a reader asks for does not, so it holds
              at about 20,500 tokens while the whole manifest reaches 835,922. At 500 concepts there
              is a single bundle and the two are the same number.
            </p>
          </figure>
        </div>
      </div>
    </section>
  );
}
