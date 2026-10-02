import Link from 'next/link';

const heading = 'What reading costs, and where it loses';
const description =
  'Twenty fixed questions per corpus on one machine, every side billed for delivering the same answers. OKF is its reference consumption pattern, navigating with no wrong turns. ChromaDB is chromadb 1.5.9 with its default all-MiniLM-L6-v2 embeddings, run through langonrock’s own harness on whichever of its paths is cheapest for the figure quoted.';

const chromaResults = 'https://github.com/langonrock/langonrock/blob/main/bench/results/chroma/README.md';

export function Cost() {
  return (
    <section className="lr-rule-top">
      <div className="lr-container py-24">
        <div className="lr-head">
          <h2 className="lr-h2">{heading}</h2>
          <p className="lr-prose">{description}</p>
        </div>

        <div className="mt-14">
          <p className="lr-prose">
            On the 500-concept catalogue langonrock answers in 17 round trips, against 30 for the
            OKF navigator and 20 for ChromaDB, because the agent reads the manifest once and makes
            one batched fetch per question. It ranks the concept a question names in its top eight
            75% of the time, against 70% for the raw files and 30% for ChromaDB. Tokens are where
            ChromaDB wins on this corpus: its cheapest path bills 30,804 against langonrock’s
            56,928 and the navigator’s 116,357, charged as if it always fetched the right chunk.
          </p>

          <p className="lr-prose mt-5">
            The documents decide the token bill. On twenty-eight RFCs langonrock bills 13,995
            tokens in 16 round trips, against 27,629 for ChromaDB and 756,168 for the navigator. On
            four novels it bills 39,862 by reading located passages instead of chapters, against
            73,695 and 130,101, and on the Bible at one concept per book 39,395, against 77,466 and
            1,278,420. ChromaDB bills fewer on Mrs Beeton’s recipes, 18,437 against 19,551, as it
            does on the catalogue. On prose with no links to batch, round trips even out at about
            one per question for all three.
          </p>

          <p className="lr-prose mt-5">
            On no corpus did langonrock find the right concept less often than either. Asked by
            name, it found it for every question over the recipes and over the RFCs, against 90%
            and 95% for the raw files and 95% for ChromaDB on both. Asked by description, it found
            it for 80% of the recipe questions, against 55% and 50%.
          </p>

          <p className="lr-prose mt-5">
            Nothing in it embeds anything. A 5,000-concept catalogue is searchable 0.43 s after
            langonrock starts compiling it, against 0.91 s for BM25 over the raw files and 145 s
            for ChromaDB to embed it, and its compiled snapshot takes 5.4 MiB against the 67 MiB
            ChromaDB writes. On the smaller corpora the raw files build slightly faster, and they
            answer one query faster at every size, 0.45 ms against 0.83 ms here, because
            langonrock also locates the passage in its top hits; ChromaDB takes 90 ms, embedding
            the question included.
          </p>

          <p className="lr-prose lr-note mt-8">
            A synthetic catalogue and four public-domain corpora, a deliberately crude{' '}
            <code className="lr-mono">chars / 4</code> token estimate, one machine. No session pays
            for a miss: each is billed as if its first answer were the right one, which flatters
            whoever ranks worst. Treat it as an order of magnitude and measure your own documents.{' '}
            <Link
              href="/docs/architecture/benchmarks"
              className="lr-link text-[color:var(--lr-ink)]"
            >
              The OKF and langonrock method
            </Link>
            , and{' '}
            <a href={chromaResults} className="lr-link text-[color:var(--lr-ink)]">
              the ChromaDB runs
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
