# Design system

> **Superseded (2026-11-13).** The implemented design system is documented in [DESIGN.md](../../DESIGN.md) at the repo root. This file records the earlier logo-led green/gold proposal that was not adopted; keep it for history only.

## Direction

Premium, natural and trustworthy, based on the logo and card. Think specialty food trader, not health-app bright or supermarket busy. Calm cream surfaces, deep green weight, restrained gold, fine botanical line art, generous whitespace.

## Colour

Green and gold were measured from the logo PNG. Cream is estimated from the card, so confirm it against the `.ai` file.

```css
--green-900: #1A3B28;   /* brand green */
--gold-500:  #A5862F;   /* brand gold */
--gold-700:  #7A611C;   /* darkened gold for text; not a logo colour */
--cream-100: #F3ECDB;   /* card background */
--white:     #FFFFFF;
```

Derive neutrals and tints from these. Do not add unrelated hues. Semantic colours for errors and success may be added when forms are built.

## Contrast

| Pair | Ratio | Use |
|---|---|---|
| Green on cream | 10.49 | Body text, headings, primary buttons (cream on green) |
| Gold-700 on cream | 5.02 | Small gold text, links on cream |
| Gold-500 on green | 3.56 | Large text and icons only |
| Gold-500 on white | 3.47 | Large text and icons only |
| Gold-500 on cream | 2.95 | **Decoration only. Fails for all text** |

## Typography

The logo lettering is custom, so it stays an image. Proposal, to confirm during design:

- Headings: Fraunces, or another high-contrast serif that sits comfortably with the logo
- Body and UI: Instrument Sans, or a similar clean grotesque, echoing "INTERNATIONAL" in the logo

Self-host with `next/font`. Limit weights to those used. Body text is at least 16px.

## Brand assets

| File | Purpose |
|---|---|
| `assets/brand/saatvik-logo-source.ai` | Master. Export SVGs from this |
| `assets/brand/saatvik-logo-transparent.png` | 4500x4500 with large margins. Logo occupies about 2758x1091 |
| `assets/brand/saatvik-business-card.pdf` | Reference for style and line art |

To produce: trimmed logo SVG, reversed version for dark green (needs client or designer approval), favicon from the leaf mark, social share image.

## Motifs

- Line-art makhana and fruit illustrations from the card, used at low opacity. Check whether vector originals exist. Confirm usage rights for these illustrations.
- The two-leaf sprout from the logo may be used as a small accent. Do not redraw it.
- Thin gold rules, as on the card divider.

## Components

Header, footer, category card, product card, option selector, enquiry list drawer, enquiry form, quantity and unit input, trust strip, process steps, FAQ accordion, mobile action bar.

## Accessibility

WCAG 2.2 AA. Visible focus states, labelled fields, errors announced and tied to fields, 44px minimum touch targets, reduced-motion support.
