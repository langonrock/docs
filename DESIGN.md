# Design

The visual system for the Lang on Rock marketing root. The documentation under `/docs` inherits the
Fumadocs preset with its dark tokens retinted to match; this document covers the brand surface.

## Theme

**Dark only.** `RootProvider` gets `forcedTheme: 'dark'` with `enableSystem: false` and the toggle
hotkey off, `themeSwitch` is disabled in the layout options so the control never renders, and `<html>`
ships with `class="dark"` and `color-scheme: dark` so there is no first-paint flash and no second
palette to keep in contrast.

The earlier version carried light and dark together, which forced a compromise the page paid for in
both. The cobalt drench that worked on white had to drop to `oklch(0.36 0.12 252)` in dark, where it
measured 1.73:1 against the shell surface: not a band, not a background, a muddy rectangle. Choosing
one theme lets the surface be designed rather than negotiated.

The shell's neutral grays are retinted toward the brand hue at chroma 0.014 to 0.022. That is under
the threshold where a surface reads as coloured and enough that `/docs` and `/` stop looking like two
different sites.

## The reference object

The commands, the directory they write, and every measure three ways.

The page's imagery is the CLI it documents: four commands in mono panels, import, read, commit and
restore, each under the sentence that says what it does, plus the three DSNs that pick a mode, and
the real tenant directory a commit is made of, listed file by file beside the contract it keeps.
Every command shown is one the binary accepts, and every directory entry is one the engine writes.
That is the line against the project's own terminal-cosplay anti-reference: no acid green, no
blinking cursor, no ASCII art, no prompt that does not resolve to a real invocation.

The hex dump that used to carry this role was removed from the page along with the manifest table.
`manifest.ts` still holds the rows, the serialized bytes and the `sha256` over them, because
`opengraph-image.tsx` renders three dump rows on the social card. `hexdump.tsx` is now referenced by
nothing and is left in place rather than deleted, in case the dump returns to a section.

## Color

Strategy: **restrained**, which is a change from the previous committed drench. On a dark surface a
40% cobalt fill stops being a brand statement and becomes glare. Cobalt now appears where the product
itself uses colour to mean something, and nowhere else.

| Token             | Value                    | Hex       | Role                                     |
| ----------------- | ------------------------ | --------- | ---------------------------------------- |
| page background   | `oklch(0.155 0.014 258)` | `#090c12` | The whole surface                        |
| `--lr-panel-soft` | `oklch(0.192 0.016 258)` | `#10151b` | Section bands                            |
| `--lr-panel`      | `oklch(0.225 0.018 258)` | `#171c24` | Code boxes, cards, editor surfaces       |
| `--lr-edge`       | `oklch(0.52 0.02 258)`   | `#626a75` | The border of a control                  |
| `--lr-ink`        | `oklch(0.96 0.004 258)`  | `#f0f2f4` | Headings, concept ids                    |
| `--lr-dim`        | `oklch(0.75 0.014 258)`  | `#a9aeb7` | Body copy, byte content                  |
| `--lr-faint`      | `oklch(0.628 0.017 258)` | `#828993` | Offsets, column heads, absent values      |
| `--lr-cobalt`     | `oklch(0.68 0.163 258)`  | `#5497fb` | Separators, the action, the chart accent |
| `--lr-signal`     | `oklch(0.84 0.13 195)`   | `#40e5e5` | The `links` column only                  |
| `--lr-flag`       | `oklch(0.8 0.125 25)`    | `#ff9d95` | A `status` cell that deviates only       |

Cyan means "this is the link graph" and coral means "this concept is not current". Neither appears
anywhere else, and both stay readable as plain text with colour removed.

### Verified contrast

Computed from OKLCH through sRGB to relative luminance, not estimated by eye. The panel is the worst
case for every foreground, so it is the column that decides.

| Pair                       | On page | On band | On panel |
| -------------------------- | ------- | ------- | -------- |
| ink                        | 17.40:1 | 16.38:1 | 15.23:1  |
| dim                        | 8.79:1  | 8.27:1  | 7.69:1   |
| faint                      | 5.54:1  | 5.22:1  | 4.85:1   |
| cobalt                     | 6.72:1  | 6.32:1  | 5.88:1   |
| signal                     | 12.57:1 | —       | 11.00:1  |
| flag                       | 9.76:1  | —       | 8.54:1   |

Every text pair clears WCAG AA for body text. Two values were corrected after measurement rather than
shipped on the assumption they were fine:

- `--lr-faint` moved from `oklch(0.605 …)` to `oklch(0.628 …)` because the darker value measured
  4.42:1 on the panel, and it carries the step notes, the DSN descriptions, the editor surface copy
  and the chart tickers, all body-sized.
- The chart context series moved from `oklch(0.52 …)` to `oklch(0.555 …)` and its track darkened from
  `oklch(0.26 …)` to `oklch(0.235 …)`, because the bar measured 2.82:1 against its own track and
  1.4.11 asks 3:1 of a meaningful graphic. It is now 3.51:1, with the accent at 5.73:1.

Dark ink on the cobalt action is 6.67:1. `--lr-edge` was added rather than reusing `--lr-rule` for
the outlined action: the rule composites to 1.29:1 on the band, which is right for a hairline between
paragraphs and fails 1.4.11 for the border that is the only thing telling a reader the element is a
button. Measured in the browser rather than derived: 3.35:1 on the band, 3.58:1 on the page.

**Two action weights.** `.lr-action` is the filled cobalt one and there is exactly one on the page,
closing it. `.lr-action-quiet` is the outlined one, same 4px radius and the same 43px height, and it
carries the editor. A second filled cobalt button would put two primary actions in front of a reader
the page is trying to send to one place. Neither pairs a border with a wide drop shadow.

Surface steps carry no AA floor and are recorded only because they decide whether a band reads as a
band: band against page 1.06:1, panel against page 1.14:1.

Focus is explicit rather than left to the user agent: a 2px cobalt outline at a 2px offset, switching
to ink on the cobalt action where a cobalt ring would be invisible. No `border-radius` in the focus
rule, so the outline follows the button's own 4px corner instead of squaring it.

## Typography

Two families on a real contrast axis, proportional against monospaced. Both ship with the shell and
are declared once in `global.css` as `--font-sans` and `--font-mono`, which `.lr` re-exports as
`--lr-sans` and `--lr-mono` so the brand surface and the documentation cannot drift apart.

| Role                                   | Family     |
| -------------------------------------- | ---------- |
| Headings, body                         | Geist Sans |
| Commands, DSNs, numbers, chart tickers | Geist Mono |

Monospace here is functional rather than costume: the commands are meant to be copied verbatim, the
DSNs are compared scheme against scheme, and the number columns are compared digit against digit with
`font-feature-settings: 'tnum'` on. The one decorative use is the two-word `.lr-pixel` span in the
headline, which is Geist Pixel Square loaded as a single face rather than through `geist/font/pixel`,
because the package registers five styles and would make the build preload every one of them.

Rejected by procedure: IBM Plex Mono, IBM Plex Sans and Inter are on the skill's reflex list, and
JetBrains Mono is that reflex one step sideways.

Display runs `clamp(2rem, 1.15rem + 3.3vw, 3.75rem)`, tracking `-0.03em`, inside the `-0.04em` floor
and well under the 6rem ceiling. Section headings run `clamp(1.5rem, 1.2rem + 1.3vw, 2.25rem)` at
`-0.022em`.

The ladder is measured rather than asserted: one 60px `h1`, six 36px `h2` that are the same size in
every section, and `h3` sized by what it labels, 20px on a feature card, 18px on a lifecycle step,
15px on an editor surface. The features block used to render its heading at 60px, which put an `h2`
level with the page's only `h1`, and its card titles at 24px, which matched the `h2` minimum on
mobile exactly. Both were pulled onto `.lr-h2` and a 20px title.

Prose is capped at 68ch with `text-wrap: pretty`; headings and figure captions use `text-wrap:
balance`. Body line-height is 1.65, raised for light type on a dark surface.

## Identity

The Moai mark sits beside the wordmark in the navigation, drawn from `public/logo.svg` with a white
outline so it holds on the dark shell, and again on the social card. `src/app/icon.png` and
`src/app/apple-icon.png` carry it as the favicon.

The OG card is built on the dark surface: the mark and wordmark, the hero's sentence with the pixel
span on "document database", the lead, and a three-row hex dump of the real manifest with the
separator bytes in cobalt. Satori has no monospace font loaded, so the byte grid is laid out with
fixed-width boxes rather than trusting the glyph advance. The card's fonts are subsets covering
printable ASCII and a handful of punctuation, so every string on it stays inside that set.

## Data visualization

Every chart is **emphasis** rather than categorical: one accent hue plus a de-emphasis gray. The
accent follows the entity, not the winner, so langonrock is cobalt and first in every chart, and OKF
and ChromaDB are context bars named by their row labels. Colouring by rank would repaint the meaning
every time a number moved, and naming every row means colour never carries the meaning alone.

Every comparison on the page is three-way, on the same questions and the same machine, with each
side at its best for the measure, as PRODUCT.md sets out. The hero widget charts four measures
langonrock wins, one tab at a time: the right concept in the top eight, round trips, tokens on four
novels, and seconds to a searchable index at 5,000 concepts. Each tab's note states, beside the
chart, where another side wins instead. Losses are sentences, never charts.

The form follows the quantity. **Magnitudes** get zero-baseline bars, where length is the measure.
Rates get the same bars against a 0 to 100% axis rather than a dot plot, because three series on one
dot track collide.

| Token           | Value                    | Role                          |
| --------------- | ------------------------ | ----------------------------- |
| `--lr-mark`     | `oklch(0.68 0.163 258)`  | langonrock                    |
| `--lr-mark-dim` | `oklch(0.555 0.018 258)` | OKF and ChromaDB              |
| `--lr-track`    | `oklch(0.235 0.018 258)` | Bar track                     |

The bar charts are real `<table>` elements with the mark drawn inside a cell, so the chart and its
table view are the same DOM and cannot drift apart. Bars are 8px with a 2px radius on the growing end
only, square at the baseline. Direct labels sit in their own column, so nothing is clipped.

What reading costs carries no chart. Its old area chart set the whole manifest against one bundle
slice, langonrock against itself, which a three-way page has no place for, and recharts and the
shadcn chart wrapper went with it. The argument is prose, and every figure in it is three-way.

**No dual axis.** Different scales get separate charts or separate sentences, never one plot with two
y-axes.

## Layout

Every section uses `.lr-container`, which reads `--fd-layout-width` from the documentation shell, so
the page edge lines up with the navbar title.

The hero is two columns above `72rem`, the claim in a `1fr` column and the benchmark widget in a
`32rem` one. Below that they stack, because a bar chart in half a phone width is a smear, and because
at `64rem` the split left the headline a 408px column and five ragged lines. The type stays
left-aligned and one left edge runs from the headline through the prose and the command box; centring
it gave the fold two competing axes. The widget is a second axis and it is the one exception, earned
by being the measurement for the sentence beside it.

The stacked column is declared as `minmax(0, 1fr)` rather than left implicit. An implicit `auto` grid
track sizes to its widest child's max-content, and `.lr-install` asks for `max-content`, so the
install block's own `max-width: 100%` resolved against a 774px track. Below `72rem` that put the
headline, the command and the widget past the viewport, where `DarkGradientBg`'s `overflow: hidden`
clipped them. The hero rendered cut off on every phone and tablet until the track was pinned.

**Panels size to their content.** `.lr-install` is `width: max-content` with `max-width: 100%`, and
long commands scroll inside their own box with the copy button pinned outside the scroller, so a
truncated command is still one click from the clipboard and the page body never scrolls sideways.
Measured at 390, 768, 1024 and 1440: no element leaves the container and `scrollWidth` equals
`clientWidth` at all four.

### The section head

Below the hero every section opens with `.lr-head`, a two-column grid: the `h2` in a 22rem column, the
prose in the rest, sharing a first baseline, above `64rem` only.

This exists because `.lr-container` is 1400px and `.lr-prose` is 68ch. Left-aligned under its heading,
that measure left roughly half the viewport empty on six consecutive sections. Widening the measure
was the wrong fix, since 68ch is the readable line. The heading column doubles as the label column of
a specification sheet, which is what the page is.

Rhythm comes from three surface levels rather than from colour bands: the page, the `.lr-band`
section, and the panels. Every content section is `py-24` and the footer is `py-16`. The features
block was `py-32`, which read as detached rather than as rhythm, and came down to match.

Radii stay at 4px everywhere the page renders its own material, sharp enough to belong to a byte
grid, and nothing pairs a border with a wide drop shadow.

The features section is the one exception and it is a deliberate one. It is a ported block: a centred
heading and six `rounded-2xl` filled cards, each with a lucide glyph above the title. That is two of
this document's own exclusions at once, and it is the section a find-and-replace of the product name
would survive. It ships because it was asked for after the trade was put in writing, not because the
reasoning above stopped holding.

Its colours and its type are pulled back into the system so it carries no palette and no scale of its
own: `bg-muted` maps to `--lr-panel`, `text-muted-foreground` to `--lr-dim`, the hover halo to a 28%
mix of `--lr-cobalt`, and the heading to `.lr-h2`. Its cards align to the top rather than centring
their content, because centring shifted the icon and title of any card whose body ran a line longer
than its neighbours, and a row of icons that do not line up is the kind of thing a reader feels
without naming.

### Order

Hero with the claim, the three-way measurement and the install command. Then what you get, the
lifecycle, what a commit promises, what reading costs, the editor, the action, the footer.

**What you get sits directly under the fold.** A reader who has just seen the number has a reason to
read what the number buys before reading how it was measured.

**The hero is the claim, the measurement and the install command.** It carried a pair of buttons and
the manifest table before. Both went: a reader convinced by the headline number should be able to act
on the fold, and the fastest action for a binary is the command itself, not a link to a repository.
`View the source` still closes the page, where a reader who has read the evidence has a reason to
take it.

**The lifecycle is the one walkthrough.** Import, read, commit, restore: each step pairs a sentence
with the command or the DSN list that performs it, and each uses what the step before it returned.
**What a commit promises** follows it, because a reader who has just seen a commit and a restore is
the one asking what a commit guarantees; the contract sits in prose beside the tenant directory it
is made of. **What reading costs** is prose, the three-way argument with every loss stated in the
sentence that carries it, closed by the caveat about the corpora and the method.

## Motion

Two moments, each fitting what it reveals.

- Bars in the hero widget grow with an animating `clip-path`. `clip-path` rather than `width` keeps it
  off the layout path, and rather than `scaleX` keeps the rounded end from squashing.
- The features hover halo slides between cards on a shared framer `layoutId` instead of fading out
  and back in.

The bar growth is a keyframe with a `from` state and `animation-fill-mode: backwards`, so the resting
state is the default and the reveal is an enhancement. Nothing is gated on a class an
IntersectionObserver has to add, and nothing uses a scroll-driven timeline, both of which render blank
in a headless screenshot of the part of the page below the fold.

The narrative sections carry no entrance motion. A page that animates its argument in section by
section is the uniform reflex, and none of them reveals anything a reveal would clarify.

`prefers-reduced-motion: reduce` collapses every CSS animation to 1ms with no delay and drops the
hover transitions. The features hover is driven by framer, outside the stylesheet's reach, so it
reads the preference directly through `MotionConfig reducedMotion="user"`.

## Deliberate exclusions

Recorded so they do not creep back in.

- No uppercase tracked eyebrow above section headings. The ported features block arrived with a
  `Features` pill and it was taken back out, so the rule still holds everywhere.
- **One** numbered sequence, in the lifecycle, and nowhere else. `01 / 02 / 03` above every section
  is the eyebrow trope one tier deeper, and this document banned it outright until a walkthrough
  needed it. The four steps are a real order: you cannot read a tenant you have not imported, commit
  against a version you have not read, or restore a revision that was never committed. The numbers
  carry that dependency, which prose alone would have to restate four times. The test for anything
  that follows: if the order can be shuffled without the section becoming wrong, it does not get
  numbers.
- No gradient text, no glassmorphism, no side-stripe borders.
- No radial cobalt bloom behind the hero. It is the single most common dark dev-tool move and it would
  make this page guessable from its category.
- No hero-metric tile. The headline numbers are charted in the same grammar as every other number on
  the page, with the caveat in the sentence underneath, because the caveat is the point.
- No stock photography. The imagery is the commands, the DSNs and the tenant directory, which is the
  material that could not be find-and-replaced onto another product. The manifest bytes
  survive on the social card.
- No fabricated install affordances. The install block carries only what the docs actually document:
  the `curl | sh` script, the source path via Bun, and the releases page for Windows. There is no
  Homebrew tab, because `brew install` is mentioned in the docs without a formula or tap, and no
  version in the heading, because nothing in the repository states one. Both are one-line additions
  once they exist.

## Where the code lives

`home.css`, imported by `page.tsx`, everything prefixed `.lr` so it never reaches the documentation
shell. `page.tsx` mounts the sections and holds nothing but the hero.

| File                                | Holds                                                    |
| ----------------------------------- | -------------------------------------------------------- |
| `install.tsx`                       | The install tabs, in the hero and again in `get-started`  |
| `benchmarks.tsx`                    | The four three-way hero tabs and the numbers behind them  |
| `charts.tsx`                        | `BarChart`, `GroupedBarChart` and `Legend`                |
| `features.tsx`                      | The six capabilities, the one ported block                |
| `lifecycle.tsx`                     | The four steps, the commands and the three DSNs           |
| `promise.tsx`                       | The commit contract and the tenant directory beside it    |
| `cost.tsx`                          | The three-way argument, in prose                          |
| `editor.tsx`                        | langoneditor and its four surfaces                        |
| `get-started.tsx`                   | The closing action                                        |
| `site-footer.tsx`                   | The four footer columns                                   |
| `components/ui/copy-button.tsx`     | Shared by the install block and the lifecycle commands    |
| `manifest.ts`                       | The rows, the bytes and the digest, for the social card    |

`features.tsx` is the one file that styles itself with Tailwind utilities rather than an `.lr` class,
because it is a ported block and keeping it recognisable as one makes it cheaper to replace. The shell
retint lives in `global.css` under `.dark`.

`hexdump.tsx` is referenced by nothing since the manifest section came out. So are the `.lr-table`,
`.lr-row`, `.lr-panel-head`, `.lr-digest` and `.lr-c-*` rules in `home.css`. Both are left in place
rather than deleted, because the section they belonged to was removed by hand and may come back.
