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

The compiled command, and the shape of a read.

The page's imagery is the CLI it documents: four commands in mono panels, each under the sentence
that says what it does, plus the three DSNs that pick a mode. The store is byte-deterministic and
content-addressed, and every command shown corresponds to one the binary actually accepts. That is
the line against the project's own terminal-cosplay anti-reference: no acid green, no blinking
cursor, no ASCII art, no prompt that does not resolve to a real invocation.

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

The ladder is measured rather than asserted: one 60px `h1`, five 36px `h2` that are the same size in
every section, and `h3` sized by what it labels, 20px on a feature card, 18px on a read-path step,
15px on an editor surface. The features block used to render its heading at 60px, which put an `h2`
level with the page's only `h1`, and its card titles at 24px, which matched the `h2` minimum on
mobile exactly. Both were pulled onto `.lr-h2` and a 20px title.

Prose is capped at 68ch with `text-wrap: pretty`; headings and figure captions use `text-wrap:
balance`. Body line-height is 1.65, raised for light type on a dark surface.

## Identity

The wordmark stands alone in the navigation. The stone-cube mark was removed from the nav on request
and from the social card with it. `src/app/icon.png` and `src/app/apple-icon.png` still carry it as
the favicon, so it survives in the browser tab. `public/logo.png` is now referenced by nothing and is
left in place rather than deleted, in case the mark comes back.

The OG card was rebuilt on the dark surface: wordmark, headline, description, and a three-row hex
dump of the real manifest with the separator bytes in cobalt. Satori has no monospace font loaded, so
the byte grid is laid out with fixed-width boxes rather than trusting the glyph advance.

## Data visualization

Five charts, all **emphasis** rather than categorical: one accent hue plus a de-emphasis gray. The
accent follows the entity, not the winner, so langonrock is cobalt in every chart. Colouring by rank
would repaint the meaning every time a number moved.

The form follows the quantity. **Magnitudes** get zero-baseline bars, where length is the measure:
tokens billed, tool calls, the cost of one read, manifest size against bundle slice. Those four sit
in the hero, in a tab widget that shows one at a time, because tokens billed and tool calls decide
whether the page is worth believing and belong on the fold.

**A quantity over a growing tenant** gets a filled area, where the divergence is the measure. One
chart, in `What it costs`: the whole manifest against one bundle slice at 500, 5,000 and 20,000
concepts. It is the only claim on the page where the picture beats the sentence, so it is the only
one that gets a second chart form. `type="linear"` rather than a spline, because three measured
points are all there is and a curve between them would draw shape that nothing measured. The x axis
is spaced by run rather than by concept count, which the caveat under the section says out loud.

The two rate charts, hit rate and mean reciprocal rank, were dot plots and are now two sentences.
The ranking loss reads better as prose next to the claim it qualifies than as a pair of small
multiples, and it keeps `What it costs` to the one chart that earns its space. `DotPlot` came out of
`charts.tsx` with them.

| Token           | Value                    | Role                          |
| --------------- | ------------------------ | ----------------------------- |
| `--lr-mark`     | `oklch(0.68 0.163 258)`  | The langonrock path           |
| `--lr-mark-dim` | `oklch(0.555 0.018 258)` | Context series                |
| `--lr-track`    | `oklch(0.235 0.018 258)` | Bar track                     |

The bar charts are real `<table>` elements with the mark drawn inside a cell, so the chart and its
table view are the same DOM and cannot drift apart. Bars are 8px with a 2px radius on the growing end
only, square at the baseline. Direct labels sit in their own column, so nothing is clipped.

The area chart cannot do that. recharts draws an SVG that only exists after hydration, so the numbers
at both ends of both series are written into the caption under it as text. A reader without
JavaScript loses the picture and keeps every figure in it.

`src/components/ui/chart.tsx` is shadcn's chart wrapper retargeted to this system: `bg-background`
and `text-muted-foreground` do not exist in this Tailwind theme, so they became `--lr-panel` and
`--lr-dim`, and the light/dark `<style>` injection became inline custom properties, because the site
ships one theme.

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

Hero with the claim, the measurement and the install command. Then what you get, the read path, what
it costs, the editor, the action, the footer.

**What you get sits directly under the fold.** A reader who has just seen the number has a reason to
read what the number buys before reading how it was measured.

**The hero is the claim, the measurement and the install command.** It carried a pair of buttons and
the manifest table before. Both went: a reader convinced by the headline number should be able to act
on the fold, and the fastest action for a binary is the command itself, not a link to a repository.
`View the source` still closes the page, where a reader who has read the evidence has a reason to
take it.

**Everything below the features block was rebuilt as four narrative sections.** Six sections of
prose, tables and small multiples became: the read path, a numbered walkthrough where each step pairs
a sentence with the command or the DSN list that performs it; what it costs, where the numbers live
inside the argument rather than in charts beside it; the editor; and one closing section that repeats
the install command next to the repository link. Every claim the old sections carried has a home in
one of the four. The latency and disk-size charts did not survive the cut, and neither figure had
been on the page before that day.

The caveat about the synthetic corpus closes the left column of `What it costs` rather than sitting
full-width under both. It is the qualification on the argument, and PRODUCT.md asks for the caveat
next to the claim; it also happens to balance a two-column grid whose right side is taller.

## Motion

Three moments, each fitting what it reveals.

- Bars in the hero widget grow with an animating `clip-path`. `clip-path` rather than `width` keeps it
  off the layout path, and rather than `scaleX` keeps the rounded end from squashing.
- The two areas in the cost chart draw in on mount, which recharts runs in JavaScript.
- The features hover halo slides between cards on a shared framer `layoutId` instead of fading out
  and back in.

The CSS moments are keyframes with a `from` state and `animation-fill-mode: backwards`, so the
resting state is the default and the reveal is an enhancement. Nothing is gated on a class an
IntersectionObserver has to add, and nothing uses a scroll-driven timeline, both of which render blank
in a headless screenshot of the part of the page below the fold.

The four new sections carry no entrance motion. A page that animates its argument in section by
section is the uniform reflex, and none of these four reveals anything a reveal would clarify.

`prefers-reduced-motion: reduce` collapses every CSS animation to 1ms with no delay and drops the
hover transitions. The two JavaScript-driven moments are outside the stylesheet's reach, so they read
the preference directly: `MotionConfig reducedMotion="user"` for the features hover, and framer's
`useReducedMotion` feeding `isAnimationActive` on each `Area`.

## Deliberate exclusions

Recorded so they do not creep back in.

- No uppercase tracked eyebrow above section headings. The ported features block arrived with a
  `Features` pill and it was taken back out, so the rule still holds everywhere.
- **One** numbered sequence, in the read path, and nowhere else. `01 / 02 / 03` above every section is
  the eyebrow trope one tier deeper, and this document banned it outright until the read path needed
  it. The four steps are a real order: you cannot open a snapshot you have not compiled, or get a
  section out of a store you have not opened. The numbers carry that dependency, which prose alone
  would have to restate four times. The test for anything that follows: if the order can be shuffled
  without the section becoming wrong, it does not get numbers.
- No gradient text, no glassmorphism, no side-stripe borders.
- No radial cobalt bloom behind the hero. It is the single most common dark dev-tool move and it would
  make this page guessable from its category.
- No hero-metric tile. The headline numbers are charted in the same grammar as every other number on
  the page, with the caveat in the sentence underneath, because the caveat is the point.
- No stock photography. The imagery is the commands, the DSNs and the one chart of a tenant growing,
  which is the material that could not be find-and-replaced onto another product. The manifest bytes
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
| `benchmarks.tsx`                    | The four hero tabs and the numbers behind them            |
| `charts.tsx`                        | `BarChart`, `GroupedBarChart` and `Legend`                |
| `features.tsx`                      | The six capabilities, the one ported block                |
| `read-path.tsx`                     | The four steps, the commands and the three DSNs           |
| `cost.tsx`                          | The argument and the one area chart                       |
| `editor.tsx`                        | langoneditor and its four surfaces                        |
| `get-started.tsx`                   | The closing action                                        |
| `site-footer.tsx`                   | The four footer columns                                   |
| `components/ui/chart.tsx`           | shadcn's chart wrapper, retargeted to the `.lr` tokens    |
| `components/ui/copy-button.tsx`     | Shared by the install block and the read-path commands    |
| `manifest.ts`                       | The rows, the bytes and the digest, for the social card    |

`features.tsx` is the one file that styles itself with Tailwind utilities rather than an `.lr` class,
because it is a ported block and keeping it recognisable as one makes it cheaper to replace. The shell
retint lives in `global.css` under `.dark`.

`hexdump.tsx` is referenced by nothing since the manifest section came out. So are the `.lr-table`,
`.lr-row`, `.lr-panel-head`, `.lr-digest` and `.lr-c-*` rules in `home.css`. Both are left in place
rather than deleted, because the section they belonged to was removed by hand and may come back.
