# Saatvik International: agent entry point

B2B website for Saatvik International, a Pune-based healthy-snack supplier, wholesaler and exporter (makhana, puffs, freeze-dried fruits). Built by MaximiseTeck.

**This is an enquiry website, not an e-commerce store.** No prices, cart checkout, payments or customer accounts. Every product page exists to produce a qualified enquiry.

## Status

Discovery is finished and the Next.js foundation is in progress. See [.agent/developer/roadmap.md](.agent/developer/roadmap.md).

## Read before working

1. [.agent/instructions.md](.agent/instructions.md): always-on rules. Read every session.
2. [.agent/README.md](.agent/README.md): map of everything else, and where new information goes.
3. [DESIGN.md](DESIGN.md) before any UI work: tokens, components, layout rules.
4. Only the files your task needs. Skills in [.agent/skills/](.agent/skills/) are procedures for repeated tasks.

## Commands

Use npm: pnpm is not installed on the current dev machine.

- `npm run dev`: start the local Next.js development server with webpack.
- `npm run build`: create the production build.
- `npm run start`: serve the production build.
- `npm run typecheck`: run strict TypeScript checks without emitting files.
- `npm run catalogue:pdf`: with `npm run dev` running, rebuild the downloadable product catalogue PDF from `/product-catalogue`. Run it after any product, flavour, packing or contact change.

Lint and automated test commands are not configured yet.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
