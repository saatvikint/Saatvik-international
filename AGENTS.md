# Saatvik International: agent entry point

B2B website for Saatvik International, a Pune-based healthy-snack trader, wholesaler and exporter (makhana, puffs, freeze-dried fruits). Built by MaximiseTeck.

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

Lint and automated test commands are not configured yet.
