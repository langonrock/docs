'use client';

import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { FolderSymlink, HardDrive, HistoryIcon, Layers, Scissors, Snowflake } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/cn';

const heading = 'What you get';
const description =
  'Six things that change once what your agents know lives in a database, and the mechanism behind each one.';

const features = [
  {
    icon: Layers,
    title: 'Related edits land together or not at all',
    description:
      'A transaction carries up to 1,000 writes and deletes. Each one names the hash of the version it replaces, and if any of them is stale, nothing is published. Twenty-five new documents commit in 94 ms at 5,000 concepts.',
  },
  {
    icon: HistoryIcon,
    title: 'Every commit can be taken back',
    description:
      'History lists the retained revisions, and restore publishes an old one as a new commit, guarded by the revision you expect to replace. Ten revisions are kept by default. A pruned revision is gone.',
  },
  {
    icon: HardDrive,
    title: 'A returned write is on disk',
    description:
      'Every file is flushed before HEAD is swapped, so a normal return is a durable commit. A failure after the swap is reported as indeterminate, with the revision to check, rather than guessed at. Tested by killing processes, not by cutting power.',
  },
  {
    icon: Scissors,
    title: 'Pay for the section, not the document',
    description:
      'Ask for the schema of a table by its own Markdown heading, hand find a phrase, or follow a search hit’s pos offset to the densest passage. A table’s schema costs 213 tokens, and a located window in a novel 513, whatever the document’s size.',
  },
  {
    icon: Snowflake,
    title: 'Editing a body does not cost you the cache',
    description:
      'Identical documents compile to identical bytes, so an edit that keeps a concept’s description and links changes no row of the manifest, and the agent’s cached prompt prefix survives it. A row that does change invalidates the cached prefix that holds it.',
  },
  {
    icon: FolderSymlink,
    title: 'Your Markdown comes back out exactly',
    description:
      'Import tracks what each folder looked like, so a re-import never overwrites a database edit and a file changed on both sides fails instead of picking a winner. Export writes the current revision back out, frontmatter and line endings intact.',
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
