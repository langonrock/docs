import Link from 'next/link';
import { DotPattern } from '@/components/ui/dot-pattern';

const heading = 'Two ways to read it';
const description =
  'The manifest is paid once and amortised over the session; a search is paid per question. Which ' +
  'one wins is a property of your corpus, not a configuration — the store ships both behind the ' +
  'same four verbs.';

const strategies = [
  {
    verbs: 'manifest → get',
    title: 'Keep the manifest in the prompt',
    body:
      'The whole map goes into the cached prefix once, and every read is one hop off it. Fewest ' +
      'round trips: 17 calls against the navigator’s 30 on the warehouse catalogue, 64,355 tokens ' +
      'against 116,357. The right call while the manifest stays small — RFCs, coarse-grained ' +
      'bundles, anything up to a couple of thousand concepts.',
    figures: '17 calls · 64,355 tokens · 500 concepts',
  },
  {
    verbs: 'search → get',
    title: 'Rank first, never read the manifest',
    body:
      'Ask for the eight rows that matter and fetch what ranked. One extra call per question buys ' +
      'the tokens back: a 20,000-concept tenant answers the same twenty questions for 60,254 ' +
      'tokens against the navigator’s 2.69M. The right call once the manifest stops fitting in ' +
      'the prompt.',
    figures: '36 calls · 60,254 tokens · 20,000 concepts',
  },
];

export function Strategies() {
  return (
    <section className="lr-rule-top relative overflow-hidden">
      <DotPattern
        width={22}
        height={22}
        cr={1}
        className="fill-[color:var(--lr-mark)] opacity-[0.08] [mask-image:radial-gradient(560px_circle_at_70%_40%,white,transparent)]"
      />

      <div className="lr-container relative py-24">
        <div className="lr-head">
          <h2 className="lr-h2">{heading}</h2>
          <p className="lr-prose">{description}</p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {strategies.map((strategy) => (
            <div
              key={strategy.verbs}
              className="flex h-full flex-col gap-4 rounded-2xl bg-[color:var(--lr-panel)] p-6"
            >
              <code className="lr-mono text-sm text-[color:var(--lr-mark)]">{strategy.verbs}</code>
              <h3 className="text-xl font-medium tracking-tight text-balance">{strategy.title}</h3>
              <p className="lr-prose lr-note">{strategy.body}</p>
              <p className="lr-mono mt-auto pt-2 text-xs text-[color:var(--lr-dim)]">
                {strategy.figures}
              </p>
            </div>
          ))}
        </div>

        <p className="lr-prose lr-note mt-10">
          The crossover is the ratio between the manifest’s size and one search result. Over a
          twenty-question session it lands near twenty: the RFC corpus sits at 2× and reads cheaper
          through the manifest, Mrs Beeton’s recipes sit at 102× and read cheaper through search.{' '}
          <Link href="/docs/guides/large-tenants" className="lr-link">
            Narrowing on a large tenant
          </Link>
        </p>
      </div>
    </section>
  );
}
