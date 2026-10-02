# Product

## Register

brand

## Users

Technically literate visitors arriving from a link, a post, or a search: engineers building
agents, people already operating an embedding pipeline they did not enjoy setting up, people
already using OKF, teams keeping what their agents know in folders or git who want commits and an
undo, and data platform teams who own schemas, metrics and runbooks.
They arrive cold, with no prior commitment to the project, and they give the page a few seconds
before deciding whether it is serious.

The job to be done is evaluation, not onboarding. They want to know what this is, whether the
claim is credible, and where the source lives. The page succeeds when they leave for the GitHub
repository convinced it is worth a look, or into the documentation to check a specific claim.

## Product Purpose

Lang on Rock is the documentation site for langonrock, a document database for what your agents
know. It stores Markdown documents in its own engine, commits related edits atomically, keeps a
history of revisions with restore, and compiles every commit into a dense read model so an agent
spends as few tokens and as few round trips as possible reading it. It answers by id and by
lexical search rather than by vector similarity, so there is no embedding model in the path, no
vector database to operate and no re-index after an edit.

The root page exists to establish credibility fast and hand the visitor to the repository. It is
not a funnel and there is nothing to sign up for. Success is a visitor who can say what they would
get, believes the numbers were actually measured, and clicks through. The first of those three is
the one the page keeps failing, and it has failed it three times: once by explaining the compiler
well and never saying what the reader ends up with, once by opening on the migration the reader
does not have to do instead of the bill they stop paying, and once by still selling only that bill
after the product had become a database the reader could not see on the page.

## Brand Personality

Precise, measured, unshowy.

The project's own voice states numbers, names its method, and admits where it loses. The benchmark
section prints the 2% saving on four novels next to the 98% on RFCs, and says plainly that prose
with nothing to compile is the case this store does not help. Where ChromaDB bills fewer tokens, on
the catalogue and the recipes, or plain BM25 over the raw files answers a query faster, the page
says so with the number, in the sentence beside the measure langonrock wins. The site should sound
like the same person wrote it.

Tone is declarative and specific. No superlatives, no urgency, no persuasion the evidence does not
support. Where a claim has a caveat, the caveat appears next to the claim rather than in a
footnote.

## Anti-references

- **Generic SaaS landing.** Gradient hero, big-metric tiles, three identical feature cards with
  rounded icons, logo wall.
- **Editorial / magazine.** Display serif with italic drop caps, hairline rules, broadsheet
  columns. A currently saturated AI aesthetic and the wrong register for a storage engine.
- **Terminal cosplay.** Black background, acid green, fake blinking cursor, ASCII art. This project
  is genuinely technical, so borrowed terminal costume reads as insecurity. Two things sit against
  this line and stay on the right side of it only while what they frame is real: the hex dump on the
  share card, which renders the compiled bytes and no invented output, and the window chrome around
  the benchmark widget, whose traffic lights are ornament around measured charts rather than a
  substitute for them. Either becomes cosplay the moment it frames something invented, and no prompt
  appears anywhere that does not correspond to a real command.
- **Cream, serif and terracotta.** The warm-paper look with a rust accent.

## Design Principles

**Lead with what changes for the reader, prove it with the mechanism.** Every heading and every
capability title names something the visitor gains; the sentence underneath names the machinery that
delivers it. The reference is Bun, which sells "replace `jest` with `bun test` to run your tests
10-30x faster" and keeps the allocator design for a section called "what's different about Bun".
This is an ordering rule, not permission to hide the engineering: an evaluator who cannot see the
mechanism does not believe the number. Mechanism-first titles are the failure mode this page has
already had once, when six capabilities were called things like "Section addressing" and
"Byte-deterministic output".

**The fold says what it is, then shows the evidence.** The hero names the category first: a document
database for what your agents know, with Markdown in, atomic commits, history and restore. The
evidence that it is built for agents follows, three ways: the right document 75% of the time in 17
round trips, against 70% in 30 for plain OKF files and 30% in 20 for ChromaDB, charted beside the
sentence. This reverses the rule the page had before, which put the bill alone on the fold. That
rule was right while the product was a read model over a folder the reader kept owning. Once
langonrock owned the documents, a fold that only priced the reads hid the thing a visitor is being
asked to trust with their data. The switching story, import, export and migration, still answers an
objection only some readers have, so it stays in the capabilities.

**Every comparison is three-way, langonrock first.** Any number that sets langonrock against another
approach shows langonrock, OKF and ChromaDB together, in that order, measured on the same questions
on the same machine, with each side at its best for the measure. A chart carries a measure
langonrock wins. Where another side wins, the sentence beside the chart says so, with the number.
Nothing is hidden, and nothing that loses gets a chart. A figure with no ChromaDB or OKF counterpart
is a plain statement about langonrock, never a comparison.

**Show the artifact, do not describe it.** The artifacts are the product: the commands, the
manifest rows, and the tenant directory a commit is made of. A visitor should see the real thing,
with real names and real values, before reading any sentence about what it is.

**State the number, then state its limit.** Every claim on the page carries the qualification the
project itself makes. The honesty is the differentiator, not a liability.

**Earn the round trip.** The page is about spending fewer calls to learn more. It should not make
the reader scroll through four sections to reach the one fact that decides it.

**Neutral surface, committed brand.** Colour carries meaning rather than decoration. When a colour
appears, it marks something the reader needs to distinguish: the accented series in a chart, the
prompt in a command, the separator bytes on the share card.

The page holds two exceptions and neither is an accident. The headline sets "document database" in
Geist Pixel and in cobalt, because those two words are the category the page leads with and the rest
of the sentence is context. The traffic lights on the benchmark window are the weaker one: red,
amber and green carrying no meaning at all. Two is the budget. A third would make the first two read
as styling rather than emphasis.

**Nothing that could be any other project's page.** If a section would survive a find-and-replace
of the product name, it is not carrying its weight.

## Accessibility & Inclusion

WCAG 2.1 AA. Body text at or above 4.5:1, large text at or above 3:1, verified numerically rather
than by eye.

Colour is never the only carrier of meaning. Every accented chart series is named in a legend or a
row label, so a reader who cannot separate the cobalt mark from the dim one still knows which number
belongs to which path.

Motion respects `prefers-reduced-motion`, with a crossfade or an instant state rather than nothing.
Content is visible by default and never gated behind a scroll-triggered class, so headless
renderers and hidden tabs still show a complete page.

The site ships dark only, on the root page and under `/docs`. The theme toggle is disabled rather
than hidden, so there is no control that appears to do nothing. One theme means one set of contrast
pairs to verify instead of two sets each carrying a compromise.
