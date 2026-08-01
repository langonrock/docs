# Product

## Register

brand

## Users

Technically literate visitors arriving from a link, a post, or a search: engineers building
agents, people already using OKF, and data platform teams who own schemas, metrics and runbooks.
They arrive cold, with no prior commitment to the project, and they give the page a few seconds
before deciding whether it is serious.

The job to be done is evaluation, not onboarding. They want to know what this is, whether the
claim is credible, and where the source lives. The page succeeds when they leave for the GitHub
repository convinced it is worth a look, or into the documentation to check a specific claim.

## Product Purpose

Lang on Rock is the documentation site for langonrock, a multi-tenant store that compiles Open
Knowledge Format bundles into a dense read model so an agent spends as few tokens and as few round
trips as possible reading them.

The root page exists to establish credibility fast and hand the visitor to the repository. It is
not a funnel and there is nothing to sign up for. Success is a visitor who understands the cost
argument, believes the numbers were actually measured, and clicks through.

## Brand Personality

Precise, measured, unshowy.

The project's own voice states numbers, names its method, and admits where it loses. The README
prints a table showing the store ranking worse than raw Markdown on mean reciprocal rank, and calls
that a real cost of compiling. The site should sound like the same person wrote it.

Tone is declarative and specific. No superlatives, no urgency, no persuasion the evidence does not
support. Where a claim has a caveat, the caveat appears next to the claim rather than in a
footnote.

## Anti-references

- **Generic SaaS landing.** Gradient hero, big-metric tiles, three identical feature cards with
  rounded icons, logo wall.
- **Editorial / magazine.** Display serif with italic drop caps, hairline rules, broadsheet
  columns. A currently saturated AI aesthetic and the wrong register for a storage engine.
- **Terminal cosplay.** Black background, acid green, fake blinking cursor, ASCII art. This project
  is genuinely technical, so borrowed terminal costume reads as insecurity.
- **Cream, serif and terracotta.** The warm-paper look with a rust accent.

## Design Principles

**Show the artifact, do not describe it.** The manifest is the product. A visitor should read real
rows with real values before reading any sentence about what a manifest is.

**State the number, then state its limit.** Every claim on the page carries the qualification the
project itself makes. The honesty is the differentiator, not a liability.

**Earn the round trip.** The page is about spending fewer calls to learn more. It should not make
the reader scroll through four sections to reach the one fact that decides it.

**Neutral surface, committed brand.** Colour carries meaning rather than decoration. When a colour
appears, it marks something the reader needs to distinguish.

**Nothing that could be any other project's page.** If a section would survive a find-and-replace
of the product name, it is not carrying its weight.

## Accessibility & Inclusion

WCAG 2.1 AA. Body text at or above 4.5:1, large text at or above 3:1, verified numerically rather
than by eye.

Colour is never the only carrier of meaning. The `status` and `links` signals in the manifest are
readable as text with colour removed.

Motion respects `prefers-reduced-motion`, with a crossfade or an instant state rather than nothing.
Content is visible by default and never gated behind a scroll-triggered class, so headless
renderers and hidden tabs still show a complete page.

Both light and dark themes are first-class, since the site inherits a theme toggle from the
documentation shell.
