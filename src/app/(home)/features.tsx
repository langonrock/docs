'use client';

import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { Copy, FolderSymlink, Layers, Repeat, Scissors, Snowflake } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/cn';

const heading = 'What you get';
const description =
  'Six things that change once the store is compiled, and the mechanism behind each one.';

const features = [
  {
    icon: FolderSymlink,
    title: 'Nothing you already have moves',
    description:
      'langonrock compiles your OKF directory, it does not take it over. The Markdown stays the source of truth and stays conformant, so okflint and the visualizer keep working on the same folder.',
  },
  {
    icon: Snowflake,
    title: 'A recompile does not cost you the cache',
    description:
      'Identical input produces identical bytes, so syncing after every edit leaves the agent’s cached prompt prefix intact instead of billing you to rebuild it.',
  },
  {
    icon: Scissors,
    title: 'Pay for the section, not the document',
    description:
      'Ask for the schema of a table by its own Markdown heading, or hand find a phrase and get the window around it. A catalogue read drops from 594 tokens to 213; a novel chapter from 3,244 to 513.',
  },
  {
    icon: Layers,
    title: 'One call, however many concepts',
    description:
      'Pass every id you need at once instead of paying an inference turn per hop. The cost of a batched fetch is flat from 500 concepts to 20,000.',
  },
  {
    icon: Repeat,
    title: 'The same query returns the same set',
    description:
      'Retrieval is BM25 plus a one-hop expansion over the link graph, capped so a hub concept cannot drag in half the manifest. No model anywhere in the path, so results do not drift under you.',
  },
  {
    icon: Copy,
    title: 'Restore is a file copy',
    description:
      'Snapshots are named by their own hash, so a backup is a file copy, a restore is a file copy back, and rollback is a side effect rather than a feature you have to operate.',
  },
];

/**
 * `reducedMotion="user"` because the hover is driven by framer rather than CSS,
 * so the stylesheet's `prefers-reduced-motion` block cannot reach it.
 */
export function Features({ className }: { className?: string }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <MotionConfig reducedMotion="user">
      <section className={cn('overflow-hidden py-24', className)}>
        <div className="lr-container">
          <div className="flex flex-col items-center justify-center">
            <h2 className="lr-h2 relative z-20 mx-auto max-w-3xl text-center">{heading}</h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-[color:var(--lr-dim)]">
              {description}
            </p>

            <div className="relative mt-10 grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="group relative block h-full w-full p-2"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {hoveredIndex === index && (
                        <motion.span
                          className="absolute inset-0 block h-full w-full rounded-2xl bg-[color-mix(in_oklab,var(--lr-cobalt)_28%,transparent)]"
                          layoutId="hoverBackground"
                          key={feature.title}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </AnimatePresence>

                    <div className="relative z-20 flex h-full flex-col items-center gap-4 rounded-2xl bg-[color:var(--lr-panel)] p-5 text-center">
                      <Icon
                        className="mt-3 size-8 stroke-1 text-[color:var(--lr-dim)]"
                        aria-hidden="true"
                      />
                      <h3 className="text-xl font-medium tracking-tight text-balance">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-[color:var(--lr-dim)]">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
