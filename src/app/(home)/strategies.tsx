import Link from 'next/link';

const heading = 'Three ways to read it';
const description =
  'The manifest costs once, amortised over the session. A search costs once per question. A ' +
  'located window replaces the cost of the document it came from. Which one wins depends on your ' +
  'corpus, not on a setting, and the store ships all three behind the same four verbs.';

const strategies = [
  {
    verbs: 'manifest → get',
    title: 'Keep the manifest in the prompt',
    body:
      'The whole map goes into the cached prefix once, and every read is one hop off it. That is ' +
      'the fewest round trips of the three: 17 calls against the navigator’s 30 on the warehouse ' +
      'catalogue, and 64,355 tokens against 116,357. The right call while the manifest stays ' +
      'small, which means RFCs, coarse-grained bundles, anything up to a couple of thousand ' +
      'concepts.',
    figures: '17 calls · 64,355 tokens · 500 concepts',
  },
  {
    verbs: 'search → get',
    title: 'Rank first, never read the manifest',
    body:
      'Ask for the eight rows that matter and fetch what ranked. One extra call per question buys ' +
      'the tokens back. A 20,000-concept tenant answers the same twenty questions for 60,755 ' +
      'tokens against the navigator’s 2.69M. The right call once the manifest stops fitting in ' +
      'the prompt.',
    figures: '36 calls · 60,755 tokens · 20,000 concepts',
  },
  {
    verbs: 'search → get(pos | find)',
    title: 'Locate the passage, skip the document',
    body:
      'When the question is where the text says something, get takes a literal phrase. When there ' +
      'is no phrase to quote, every search hit carries pos, the offset of the passage densest in ' +
      'the query’s words. Either way the read is a window of about 500 tokens, whatever the ' +
      'document size. Four novels answer the same twenty questions for 39,862 tokens against ' +
      '127,077 by whole chapters. The corpus this store used to lose.',
    figures: '40 calls · 39,862 tokens · 4 novels',
  },
];

export function Strategies() {
  return (
    <section className="lr-rule-top relative overflow-hidden">
      <div className="lr-container relative py-24">
        <div className="lr-head">
          <h2 className="lr-h2">{heading}</h2>
          <p className="lr-prose">{description}</p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
          twenty-question session it lands near twenty. The RFC corpus sits at 2× and reads cheaper
          through the manifest. Mrs Beeton’s recipes sit at 102× and read cheaper through search.
          The MCP server measures the manifest at startup and writes the verdict into the tool
          description, so you never have to work the ratio out yourself.{' '}
          <Link href="/docs/guides/large-tenants" className="lr-link">
            Narrowing on a large tenant
          </Link>
        </p>
      </div>
    </section>
  );
}
