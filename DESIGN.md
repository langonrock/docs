# Design

The visual system for the Lang on Rock marketing root. The documentation under `/docs` inherits the
Fumadocs neutral preset and is deliberately left alone; this document covers the brand surface.

## Theme

Light and dark are both first-class, inherited from the documentation shell's toggle. The brand
colour is not themed: the cobalt bands stay cobalt in both, because they are the brand rather than
a surface. Everything outside those bands uses Fumadocs `--color-fd-*` tokens so the neutral
surface follows the reader's theme without a second palette to maintain.

## Color

Strategy: **committed**. One saturated colour carries the hero and the editor band, roughly 40% of
the page. The reference is printing ink on paper stock, not a corporate navy and not a terminal.
Neutral surfaces stay at true chroma 0; the mood lives in the brand colour and the type, never in a
tinted background.

| Token                  | Value                    | Hex       | Role                                    |
| ---------------------- | ------------------------ | --------- | --------------------------------------- |
| `--lr-cobalt`          | `oklch(0.42 0.15 252)`   | `#004c9b` | Hero drench                             |
| `--lr-cobalt-deep`     | `oklch(0.3 0.13 252)`    | `#002b6b` | Editor band, closing weight             |
| `--lr-on-cobalt`       | `oklch(1 0 0)`           | `#ffffff` | Headings and ids on cobalt              |
| `--lr-on-cobalt-dim`   | `oklch(0.82 0.05 252)`   | `#adc7e4` | Body copy and inactive cells on cobalt  |
| `--lr-signal`          | `oklch(0.86 0.14 195)`   | `#2eeded` | The `links` column only                 |
| `--lr-flag`            | `oklch(0.87 0.11 25)`    | `#ffb8b0` | A `status` cell that deviates only      |

Colour carries meaning rather than decoration. Cyan means "this is the link graph" and coral means
"this concept is not current". Neither is used anywhere else on the page, and both remain readable
as plain text with colour removed.

### Verified contrast

Computed from OKLCH rather than estimated. All pairs clear WCAG AA for body text.

| Pair                        | Ratio  |
| --------------------------- | ------ |
| white on cobalt             | 8.40:1 |
| dim on cobalt               | 4.83:1 |
| signal on cobalt            | 5.79:1 |
| flag on cobalt              | 5.09:1 |
| white on cobalt-deep        | 13.51:1 |
| fd ink on white             | 16.44:1 |
| fd muted on white           | 7.11:1 |

The flag colour was moved from `oklch(0.8 0.14 25)` to `oklch(0.87 0.11 25)` because the darker
value measured 4.05:1, which passes only for large text and the cell is body-sized.

## Typography

Two families on a real contrast axis, proportional against monospaced.

| Role                              | Family                                      |
| --------------------------------- | ------------------------------------------- |
| Headings, body                    | Public Sans, 400/500/600                    |
| Manifest, numbers, DSNs, controls | Spline Sans Mono, 400/500                   |

**Public Sans** was drawn for United States government public documents, where the brief is to be
read and not admired. That is the same brief as this page: precise, measured, unshowy. The physical
object is a specification sheet.

**Spline Sans Mono** carries anything the reader has to compare column to column. Monospace here is
functional rather than costume: the manifest is tab-aligned data and the number tables are compared
digit against digit, with `font-feature-settings: 'tnum'` on.

Rejected by procedure: IBM Plex Mono, IBM Plex Sans and Inter are on the skill's reflex list, and
JetBrains Mono is the same reflex one step sideways. An earlier version of this page used IBM Plex
Mono and Inter.

Scale is fluid `clamp()`. Display runs 1.75rem to 3.25rem, well under the 6rem ceiling. Display
tracking is `-0.02em`, inside the `-0.04em` floor. Prose is capped at 68ch with `text-wrap: pretty`;
headings use `text-wrap: balance`.

## Layout

Full-width colour bands alternating with a `max-w-6xl` measure. Rhythm comes from the band changes
and from varied vertical padding, not from a repeated section chrome.

There are no cards. The capability list is a two-column text grid with headings and sentences, since
boxing six short items adds borders without adding structure. The manifest is a real `<table>` in an
`overflow-x: auto` container, so the page body never scrolls sideways.

Radii stay at 6px on the one button. Nothing pairs a border with a wide drop shadow.

## Motion

One orchestrated moment: the three manifest rows emit in sequence, 90ms apart, on load. It reads as
the compiler producing rows, which is what the section is about. Nothing else animates except link
underlines on hover.

`prefers-reduced-motion: reduce` collapses the animation to 1ms and drops the hover transition. The
reveal is a CSS keyframe rather than a scroll-triggered class, so it is not gated on an
IntersectionObserver that never fires in a headless renderer.

## Deliberate exclusions

Recorded so they do not creep back in.

- No uppercase tracked eyebrow above section headings. An earlier version had one on all four
  sections, which is the saturated AI scaffold.
- No gradient text, no glassmorphism, no side-stripe borders, no numbered section markers.
- No hero-metric tile. The numbers appear as a table with their caveat attached, because the caveat
  is the point.
- No stock photography. The imagery is the manifest itself, which is the one thing on the page that
  could not be find-and-replaced onto another product.
