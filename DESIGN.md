---
version: 1.0
name: Saatvik-International-design-system
description: >
  A bright, sticker-pop B2B storefront for a healthy-snack trader. Cream canvas, deep
  purple ink, and a small set of saturated "festival" fills (lime, pink, red, yellow, sky)
  used as solid blocks, never gradients. Headings are words on tilted colour stickers,
  surfaces have hard offset shadows, and every page leaves generous white space.
  Real product photography carries the content; nothing is decorative stock.
  Built on Paper designs supplied by the team (Nov 2026), adapted to the brand logo.

colors:
  # Canvas & surfaces
  canvas: "#fff6e8"          # page background (--cream)
  surface: "#fffaf2"         # cards, inputs (--paper)
  white: "#ffffff"
  # Ink
  ink: "#461025"             # body text, borders, hard shadows (--ink)
  ink-muted: "#674737"       # secondary text (--brand-muted)
  ink-black: "#121212"       # FAQ folder borders and text only
  # Festival palette (Paper)
  purple: "#4f227c"          # primary display colour
  pink: "#ffaaf1"
  pink-light: "#fbd3ff"
  lime: "#d2e796"            # also the button hover fill
  blue: "#3330af"            # text on lime, sky, pink-light
  sky: "#b8defa"             # announcement bar
  red: "#ea392e"             # sticker block and accent
  yellow: "#f7dd54"          # text on red/orange; sticker block
  orange: "#d94508"          # category tile (darkened from Paper #fb580d for contrast)
  folder-yellow: "#f5c904"   # FAQ folders only
  # Legacy template accents (still used by older sections)
  cta-yellow: "#ffd747"      # header "Trade Enquiry" pill, yellow buttons
  wine: "#7c172e"            # primary buttons (--red)
  # Brand logo (never recolour the logo itself)
  logo-green: "#1a3b28"
  logo-gold: "#a5862f"

typography:
  display:
    family: "Ubuntu (self-hosted /assets/display.ttf), Arial, sans-serif"
    weight: 700
    case: "uppercase for stickers, tiles, stats; sentence case for hero"
  body:
    family: "Outfit (variable, self-hosted /assets/outfit-latin.woff2), Arial, Helvetica, sans-serif"
    weight: "400 to 800"
  hero-title:     { family: display, size: "clamp(67px, 7.55vw, 112px)", line-height: 0.88, tracking: "-0.085em" }
  section-heading: { family: display, size: "clamp(40px, 5vw, 76px)", line-height: 0.86, tracking: "-0.01em" }  # EVERY section heading, incl. stats title
  tile-title:     { family: display, size: "clamp(34px, 3.4vw, 48px)", line-height: 0.8 }
  stat-badge:     { family: display, size: "46px", line-height: 0.72 }
  lead:           { family: display, size: "clamp(24px, 2.3vw, 32px)", line-height: 1.15, tracking: "-0.02em" }
  card-title:     { family: display, size: "clamp(17px, 1.85vw, 26px)", line-height: 1.07, tracking: "-0.05em" }
  kicker:         { family: display, size: "clamp(14px, 1.45vw, 22px)", line-height: 1.1, tracking: "0.02em", case: uppercase }
  announcement:   { family: display, size: "16px", weight: 600, line-height: "21.6px" }
  body-lg:        { family: body, size: "18px", line-height: 1.35, tracking: "-0.02em" }
  body:           { family: body, size: "16px", line-height: 1.5 }
  faq-question:   { family: body, size: "17px", weight: 700, line-height: 1.3 }
  faq-answer:     { family: body, size: "15px", weight: 500, line-height: 1.5 }
  button:         { family: body, size: "14.5px", weight: 700, line-height: 1.2 }
  eyebrow:        { family: body, size: "11px", weight: 800, tracking: "0.17em", case: uppercase }

rounded:
  pill: "9999px"
  photo-lg: "45px"        # FAQ photo
  photo: "32px"           # about photo
  card: "24px"            # product card
  tile: "16px 16px 80px 16px"   # category tile (big bottom-right curve)
  stat: "16px 72px 16px 16px"   # stat card (big top-right curve)
  arch: "800px 800px 16px 16px" # category photo arch
  paper: "17px"           # FAQ answer card
  badge: "12px"
  folder: "8.5px"
  sticker: "0.22em"       # scales with sticker font size

spacing:
  container: "1320px"                       # --container, max width of EVERY section
  gutter: "clamp(16px, 4vw, 48px)"          # --gutter, min distance to screen edge
  section-gap: "clamp(64px, 7vw, 104px)"    # --section-gap, space between home sections
  heading-gap: "clamp(28px, 3.2vw, 48px)"   # --heading-gap, section heading to content
  grid-gap: "24px"
  card-pad: "16px to 24px"
  announcement-h: "40px"
  header-h: "86px desktop, 68px at <=760px"

components:
  button-primary:   { bg: "{colors.wine}", text: "{colors.surface}", border: "2px {colors.ink}", radius: "{rounded.pill}", shadow: "0 4px 0 {colors.ink}", min-height: "48px" }
  button-yellow:    { bg: "{colors.cta-yellow}", text: "{colors.ink}", border: "2px {colors.ink}", radius: "{rounded.pill}", shadow: "0 4px 0 {colors.ink}" }
  button-hover:     { bg: "{colors.lime}", text: "{colors.purple}", border: "{colors.purple}", shadow: "0 0 0 {colors.purple}", transform: "translateY(4px)" }
  sticker-word:     { padding: "0.16em 0.24em 0.1em", radius: "{rounded.sticker}", rotate: "-4deg / 3deg / -1.5deg / 2deg / -3deg / 1deg" }
  announcement-bar: { bg: "{colors.sky}", text: "{colors.purple}", separator: "leaf {colors.logo-green}", height: "{spacing.announcement-h}" }
  category-tile:    { height: "490px", padding: "24px", radius: "{rounded.tile}", themes: "purple/pink, lime/blue, orange/yellow" }
  stat-card:        { bg: "{colors.lime}", radius: "{rounded.stat}", min-height: "228px", badge: "80px square or 50% wide" }
  faq-folder:       { bar-bg: "{colors.folder-yellow}", border: "1.6px {colors.ink-black}", answer-bg: "{colors.white}", answer-shadow: "6.4px 6.4px 0 #00000026", answer-rotate: "-1deg" }
  product-card:     { bg: "{colors.white}", border: "3px {colors.ink}", radius: "28px", shadow: none, media: "category colour, aspect 1/0.92", actions: "{colors.ink} pills, lime on hover" }
---

# Saatvik International: DESIGN.md

> **For AI agents:** read this file before any UI work. Use the tokens above; do not invent new colours,
> radii or font sizes. Implementation lives in `app/globals.css` (later rules override earlier template
> rules). Business facts shown in the UI come from `config/APP_CONFIG.ts` and `content/catalogue.ts`,
> never hard-coded. Project rules are in `AGENTS.md` and `.agent/instructions.md`.

## Overview

Saatvik International is a **B2B enquiry website** (no prices, no checkout) for a Pune-based trader of makhana, roasted puffs and freeze-dried fruits. The design has to do two jobs: look premium and trustworthy to procurement buyers, and feel fresh and memorable next to the many plain supplier sites in this category.

The visual language is **"festival sticker pop"**, taken from the team's Paper designs:

- **Cream canvas, purple ink.** Every page sits on `canvas` with `ink`/`purple` text.
- **Solid colour blocks, never gradients.** Lime, pink, red, yellow, sky and orange appear as *fills*: sticker words, tiles, badges, bars.
- **Tilted stickers.** Headings are words on rounded colour blocks, each rotated a few degrees.
- **Hard shadows.** Interactive surfaces use a solid offset shadow (`0 4px 0 ink`), and buttons *sink* into it on hover.
- **Real photography only.** Product photos are the client's own. A missing photo shows a striped "Photo coming soon" tile, never a stock image.
- **Air.** Large vertical rhythm (`section-y`) and a single shared container width.

The brand logo (green `#1a3b28` + gold `#a5862f` with a leaf) is used as an image only. Its colours are not part of the UI palette, so the logo stays distinct in the header.

## Colors

### Brand & Accent
- **Purple** (`{colors.purple}`: #4f227c): the primary display colour. Sticker blocks, about copy, kicker text, button hover text.
- **Lime** (`{colors.lime}`: #d2e796): the signature accent. Button hover fill, stat cards, "Puffs" tile, sticker blocks.
- **Pink** (`{colors.pink}`: #ffaaf1): sticker blocks and text on purple.
- **Red** (`{colors.red}`: #ea392e): sticker blocks and decorative accents. Never body text.
- **Yellow** (`{colors.yellow}`: #f7dd54): text on red/orange tiles and sticker blocks.
- **Orange** (`{colors.orange}`: #d94508): "Freeze-Dried Fruits" tile and stat badge.
- **Sky** (`{colors.sky}`: #b8defa) and **Pink-light** (`{colors.pink-light}`: #fbd3ff): announcement bar and stat badges.
- **Blue** (`{colors.blue}`: #3330af): text on lime, sky and pink-light.

### Surface
- **Canvas** (`{colors.canvas}`: #fff6e8): page background.
- **Surface** (`{colors.surface}`: #fffaf2): cards, inputs, drawer.

### Hairlines & Borders
- **Ink border:** 2px `{colors.ink}` on buttons, product cards, pills, the perks strip.
- **Folder border:** 1.6px `{colors.ink-black}` (FAQ only).
- **Photo border:** 1.6px `{colors.ink-black}` on the FAQ photo; other photos are borderless with large radii.

### Text
- **Ink** (`{colors.ink}`: #461025): default text. 14.4:1 on canvas.
- **Ink-muted** (`{colors.ink-muted}`: #674737): secondary text. 7.7:1 on canvas.
- **Purple** on canvas: 10.6:1.

### Semantic
No dedicated success/error palette yet. Form status messages use ink text. Add semantic tokens here before using new colours for states.

### Approved text/background pairs
| Text on background | Ratio | Allowed for |
|---|---|---|
| ink on canvas | 14.4 | all text |
| purple on canvas | 10.58 | all text |
| purple on lime | 8.43 | all text (button hover) |
| purple on yellow | 8.33 | all text |
| blue on lime | 7.15 | all text |
| blue on pink-light | 7.27 | all text |
| blue on sky | 6.81 | all text |
| pink on purple / purple on pink | 6.63 | all text |
| ink-black on folder-yellow | 11.81 | all text |
| yellow on orange | 3.21 | **large display text only (24px+ bold)** |
| yellow on red | 3.01 | **large display text only (24px+ bold)** |

The logo gold `#a5862f` fails as text on canvas (2.95:1). Use it for decoration only.

## Typography

### Font Family
- **Display:** Ubuntu Bold (700), self-hosted at `/assets/display.ttf`. All headings, stickers, tiles, stats, kickers, the announcement bar.
- **Body:** Outfit (variable 100 to 900), self-hosted at `/assets/outfit-latin.woff2`. Paragraphs, buttons, forms, FAQ.

### Hierarchy
| Token | Size | Weight | Line height | Tracking | Use |
|---|---|---|---|---|---|
| hero-title | clamp(67px, 7.55vw, 112px) | 700 | 0.88 | -0.085em | Hero product name |
| section-heading | clamp(40px, 5vw, 76px) | 700 | 0.86 | -0.01em | **Every** section heading: sticker headings and the stats title (72px at 1440, 40px on phones) |
| tile-title | clamp(34px, 3.4vw, 48px) | 700 | 0.8 | -0.01em | Category tiles |
| stat-badge | 46px | 700 | 0.72 | -0.01em | Stat badges |
| lead | clamp(24px, 2.3vw, 32px) | 700 | 1.15 | -0.02em | About lead line |
| card-title | clamp(17px, 1.85vw, 26px) | 700 | 1.07 | -0.05em | Product card names |
| kicker | clamp(14px, 1.45vw, 22px) | 700 | 1.1 | 0.02em | Line under sticker headings (uppercase) |
| announcement | 16px | 600 | 21.6px | -0.02em | Marquee bar |
| body-lg | 18px | 400 | 1.35 | -0.02em | About body |
| body | 16px | 400 | 1.5 | 0 | Default paragraphs |
| faq-question | 17px | 700 | 1.3 | 0 | FAQ folder bar |
| faq-answer | 15px | 500 | 1.5 | 0 | FAQ answer card |
| button | 14.5px | 700 | 1.2 | 0 | Buttons |
| eyebrow | 11px | 800 | 1.2 | 0.17em | Small labels (legacy) |

### Principles
- Display type is **uppercase and tight** inside stickers, tiles and stats. The hero title stays sentence case.
- Body text stays **at least 16px** (15px only inside FAQ answer cards).
- Never set body copy in the display face, and never set headings in the body face.
- Headings are real `<h1>`/`<h2>` elements. Sticker words are separate spans with real spaces between them.

### Note on Font Substitutes
If the display font fails to load, the fallback is Arial Bold. Keep `font-display: swap`. Do not add a third family.

## Layout

### Spacing System
- Space between home sections: `--section-gap` (about 100px on desktop). It is applied once, as a top margin on each `#main` section, so gaps never double up.
- **Section headers are centred:** sticker heading with rays, kicker below, then any section actions (links, filters) in a centred row. The About section is the one left-aligned exception, because its heading sits in a text column.
- **No section containers.** Sections sit directly on the canvas: no coloured bands or bordered boxes wrapping a whole section. Colour belongs to the cards, tiles and stickers inside a section.
- Sticker heading to content: `{spacing.heading-gap}`.
- Grid gap: 24px (desktop), 14 to 18px (mobile).
- Card padding: 16px (stat cards), 24px (category tiles), 14px (product card copy).

### Grid & Container
- **One container width for every section:** `--section-width = min(1320px, 100% - 2 × gutter)`. This applies to `.shell`, the perks strip, the stats section and the product range. At 1440px wide every section spans x=60 to x=1380.
- Full-bleed backgrounds (announcement, hero, footer) keep their colour edge to edge, but their content aligns to the container.
- **Hero fills the first screen:** `min-height: calc(100svh - 40px)`. On the home page the header overlaps the hero, so announcement + header + hero = one viewport.
- Common grids: category tiles 3 columns; stats 4 columns; products 4 columns; about 450px + fluid; FAQ 490px photo + 650px list.

### Whitespace Philosophy
Modelled on feastie.ca, but tighter: one even rhythm (`--section-gap`) between all sections, one idea per section, headings with room around them. Remove interface clutter (eyebrows and floating stickers) rather than add it. On desktop screens at least 1024px wide, a very dense field of small single-piece product cutouts is anchored at irregular positions down the full page along both outer edges, with an extra pair of varied single pieces clustered loosely around each major section heading: raw and flavoured makhana, varied puff forms, and individual freeze-dried fruits. They scroll with the page rather than sticking to the viewport, and must read as naturally scattered, never as aligned rows or matching pairs. Change spacing through the tokens, not per-section padding.

The About collage keeps its colourful geometric grid but uses realistic lifestyle photography in the three image cells: people sharing makhana, adding freeze-dried mango to breakfast, and preparing a bowl with freeze-dried black jamun. Products must be clearly visible in real settings rather than isolated on coloured backgrounds.

The oversized footer `SAATVIK` wordmark uses the approved reference-matched artwork: bold Saatvik-logo green (`#1A3B28`) custom lettering with connected white extrusion faces and green outlines on a transparent background. Keep the complete word visible and scale it proportionally.

## Elevation
- **Hard shadow (interactive):** `0 4px 0 {colors.ink}` on buttons; `0 6px 0 {colors.ink}` on product cards; `0 3px 0` on small pills.
- **Pressed / hover:** shadow collapses to `0 0 0` and the element moves down by the shadow depth (`--press`).
- **Paper shadow:** `6.4px 6.4px 0 #00000026` on FAQ answer cards only.
- **Flat:** category tiles, stat cards and the about photo have no shadow. Colour does the separation.
- No blurred drop shadows on UI surfaces. The only soft shadows are inside the hero artwork.

## Components

### Buttons
- **Primary** (`.button.primary`): wine fill, cream text, 2px ink border, pill, hard shadow.
- **Yellow** (`.button.yellow`, `.header-enquiry-btn`): cta-yellow fill, ink text.
- **Hover / focus-visible (all pill buttons):** lime fill, purple text and border, shadow collapses, button sinks by its shadow depth. With reduced motion, colours change but nothing moves.
- Icons inside buttons: Hugeicons via `<Icon name>`, 16 to 19px.

### Announcement Bar
40px sky bar, purple 16px display text, small logo-green leaf separators, scrolling marquee with a pause button (WCAG 2.2.2). Static text when reduced motion is on. Messages live in `app/site-header.tsx`.

### Top Navigation
86px header (68px at ≤760px), logo image left, links centre, icon buttons and the yellow "Trade Enquiry" pill right. Transparent and overlapping the hero on the home page. Below 420px the enquiry pill shows its icon only.

### Sticker Heading (`StickerHeading`)
Words on rounded colour blocks (`tone-lime | purple | red | pink | yellow`), rotated by the pattern −4°, 3°, −1.5°, 2°, −3°, 1°. Connector words ("the", "&") use `small`. An optional uppercase kicker sits underneath. Rays (hand-drawn strokes) appear on centred headings only. All sizes render at the shared `section-heading` size; `size` no longer changes the font size.

### Category Tiles
490px tall, radius 16/16/80/16. Big uppercase title top-left, tagline bottom-left, and a photo in a tilted arch (radius 800/800/16/16, rotate −12°) breaking out of the bottom-right. Themes: Makhana purple/pink, Puffs lime/blue, Freeze-Dried Fruits orange/yellow. Hover: lift 6px, arch straightens.

### Stats Band
Sits on the canvas with no band behind it: a centred uppercase title in blue at the shared heading size, then four lime cards (radius 16/72/16/16), each with a coloured badge (number or short word) and a label. **Only verifiable facts**; counts derive from the catalogue.

### Product Cards
White card, 3px ink border, radius 28, no shadow. Two parts:
- **Media (top):** the product photo full-bleed (`object-fit: cover`) on a category-coloured area: Makhana purple, Puffs lime, Freeze-dried orange. A missing photo shows the category name and "Photo coming soon" in the category's text colour. A **white pill** at top left shows the product-specific descriptor (`product.mood`: size, cut or form, e.g. "Sizes 4, 5 & 6", "Slices"; never a repeat of the category). A **dark tilted sticker** at top right shows the category short name (rotate −6°, soft offset shadow). On phones the sticker is hidden.
- **Action:** one dark ink pill over the bottom of the media, "Add to enquiry" ("Enquire" on phones). It slides in on hover or keyboard focus, is always visible on touch screens, and uses the lime hover. Never a price. There is no save/wishlist anywhere on the site.
- **Copy (bottom):** uppercase display name (18 to 22px) and a short bold note in the category's text colour (purple, blue or wine).
4 columns on desktop, 2 below 1000px and on phones.

### Products Mega-menu
Desktop "Products ▾" opens a full-width cream panel under the header: a small "Products" label and the categories plus "All products" in large uppercase display type on the left, and three "Featured" cards on the right (category-coloured media, uppercase name, "category · option" line). Opens on click, and on hover with a mouse; Escape, an outside click or choosing a link closes it, and focus returns to the trigger. Never "best sellers" without sales data. On phones the categories appear at the top of the mobile menu.

### All Products Page
A big plain uppercase "All Products" title on the left and filter pills on the right (All / Makhana / Puffs / Freeze-dried; the active pill is solid ink), with a product count below. Product cards are 3 per row (2 on tablet and phones). On phones the title and pills are centred.

### Puffs in Motion (3D)
A scroll-driven three.js scene (`app/puffs-flow.tsx`, `app/puffs-flow-scene.ts`) on a sticky full-screen stage. **Wide screens:** the copy (left-aligned sticker heading, kicker, one line of text, button) sits on the left of the container with a soft cream glow behind it, and a cream ceramic bowl with a purple rim sits on the right; floating puffs keep to the bowl's side. **Narrow screens:** the copy is centred at the top and the bowl sits at the bottom centre. As the 300vh section scrolls (240vh on phones), procedural puffs (curls, cubes, discs, balls in flavour colours) first float around the heading, then arc one by one into the bowl, filling it from the bottom into a heaped pile; long puffs settle on their side, flat ones lie flat. Progress is measured over the pinned part of the section only, so the whole story plays on screen. It loads only when near the viewport, renders only while on screen, and moves only with scroll, never by itself. With reduced motion it shows the finished, full bowl; without WebGL it shows an image. It needs `overflow-x: clip` (not `hidden`) on `html`/`body`, otherwise sticky positioning breaks.

### Better for Business
Sits straight on the canvas with no card: an oversized red uppercase headline, centred, then three aligned columns from the client's "Why choose us" list. Each column has a Hugeicons icon in a tilted colour badge (yellow, pink, lime), an uppercase title and a short paragraph. On phones the columns stack.

### FAQ Folders
Yellow folder bar (1.6px ink-black border, radius 8.5) with a tab, plus icon rotating to ×. The answer slides up as a white "paper" card rotated −1° with a paper shadow, tucked behind the bar. Photo column on the left (radius 45, 1.6px border).

### About Section
Two columns: left (max 450px) with an "About / Saatvik" sticker heading, a purple lead line and 18px body; right a large photo (radius 32, aspect 1.04). Copy only from the client's company profile.

### Testimonials
Centred "Kind / Words" sticker heading above a horizontal **scroll-snap slider**: 3 cards per view on desktop, 2 on tablet, and 86% width on phones so the next card peeks in. Cards cycle pink, sky, lime and yellow, with the stat-card curve (16/72/16/16), a large display quote mark, the quote in the display face (19 to 22px), and an attribution row with a 56px circular avatar, uppercase name, role, company · city, and a topic chip. Controls: an "n / total" counter and round prev/next buttons that use the shared hover. No autoplay. Content comes from `content/testimonials.ts`; the current entries are fictional design placeholders (`draft`) that never render in production.

### Forms
Pill or rounded inputs on surface, 2px ink border, labels above, required marked with *. Submit uses the primary or yellow button style. Errors in plain text near the field.

### Footer
Full-bleed yellow card with rounded top corners; content aligned to the container. Link columns, a contact column (phone, email, WhatsApp, city) until real social profiles exist (`config/SOCIAL_CONFIG.ts`), copyright with GSTIN, and a giant "SAATVIK" wordmark.

## Responsive Behavior

| Breakpoint | Key changes |
|---|---|
| ≤1050px | Hero art shrinks; product grid gap 11px |
| ≤1024px | Desktop nav and mega-menu hide; the menu button opens the mobile menu (categories first). Footer becomes one column, its grids use `minmax(0,1fr)` so long text wraps instead of overflowing |
| ≤1000px | Category tiles and stats go to fewer columns (tiles 1, stats 2) |
| ≤900px | About and FAQ stack to one column; FAQ photo becomes 16:10 |
| ≤760px | Header 68px; hero stacks copy above art; touch targets at least 44px (header buttons, text links, breadcrumbs) |
| ≤640px | Sticker rays hidden; one-column category grid; product buttons full width |
| ≤520px | Stat cards become horizontal rows (badge left) |
| ≤420px | Header enquiry pill shows icon only |
| ≥1024px | Decorative product cutouts drift gently along both outer edges; hidden on tablet and mobile layouts |

### Touch Targets
On touch screens and below 760px, links and buttons are at least 44px tall (footer links 36px; checkboxes 24px). Small uppercase labels never go below 12px. Interactive elements are at least 44×44px (buttons 48px min-height, icon buttons 42px+, FAQ bars ~60px).

### Collapsing Strategy
Grid columns that hold text use `minmax(0, 1fr)`, never a bare `1fr`, so a long word or a `nowrap` line cannot push a column wider than the phone. Verified 2026-11-14 at 320, 360, 390, 768 and 1024px on every page: no horizontal scroll, no clipped content.
Stack columns rather than shrink text: two-column layouts become one column with the image after the copy (about) or above the list (FAQ). Keep display sizes fluid with `clamp()`; never let a sticker word wrap.

## Known Gaps
- **No real testimonials yet:** the section is hidden in production until the client supplies quotes (Q25).
- **Two palettes coexist:** the Paper festival palette (new sections) and the template's wine/cta-yellow styles (primary buttons, footer, the trade form, corporate and FAQ pages). Converge on the festival palette as those sections are redesigned.
- `.agent/developer/design-system.md` describes an earlier green/gold direction that was not adopted. This file supersedes it.
- No semantic (success/error) colours, no dark mode.
- Makhana and strawberry photos are missing, so placeholders are visible until the client supplies them.
- Corporate and FAQ pages still use the template's older heading and card styles.
