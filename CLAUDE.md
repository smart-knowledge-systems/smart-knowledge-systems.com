# CLAUDE.md

## Required Behavior

- **Package manager:** Always use `bun` and `bunx` — never `npm`, `npx`, `yarn`, or `pnpm`
- **Content separation:** Never hardcode marketing copy, blog content, or portfolio data in components. All content lives in `/src/content/`; components only import and render
- **Path aliases:** Always import with `@/*` — never use relative paths that climb above the current directory
- **Env vars:** Do not read `.env` files
- **Git:** Never commit directly to main without checking with the user first
- **UI:** Use Tailwind CSS utility classes for all styling. Use responsive design patterns throughout
- **Codebase search:** Use `codeindex search` as the primary tool for semantic codebase search before falling back to Grep/Glob. See `.claude/skills/codeindex/SKILL.md` for full usage
- **Testing:** No test framework is configured. Ask before adding one

## Commands

```bash
bun run dev       # Dev server with Turbopack (localhost:3000)
bun run build     # Production build
bun run start     # Production server
bun run lint      # ESLint
```

## Content Rules

### Blog Posts

To add a blog post:

1. Create a markdown file in `src/content/blog/`
2. Add a corresponding entry to the `postsData` array in `src/content/blog/posts.ts`
3. Both steps are required — a markdown file without a `postsData` entry won't appear

### Portfolio

To add portfolio entries, edit `src/content/cv/student-work.json`. Types and helper functions are in `src/content/cv/portfolio.ts` — use the existing interfaces, don't create new ones.

### Marketing Content

All marketing copy (hero, services, footer, navigation) lives in `src/content/marketing-content.tsx`. Edit content there, not in components.

## Architecture Constraints

- **Blog** is server-rendered with static generation. Keep it that way
- **Portfolio** uses client-side filtering with URL state management. Filtering logic lives in `src/lib/portfolio-filters.ts` — don't duplicate it in components
- **Portfolio filtering:** Tags use OR logic within tags, AND logic between filter types. Multi-tag sorting prioritizes essays matching more tags. Don't change this behavior without explicit instruction
- **Subdomain redirects** are configured in `next.config.ts`. Subdomains (`rusted`, `russ-fugal`, `dialogue`, `social`) redirect to path equivalents. `/russ-fugal` route redirects to Bluesky profile via `route.ts`
- **Markdown rendering** uses react-markdown with rehype-pretty-code and remark-gfm. Use the existing `markdown-content.tsx` component — don't create alternative markdown renderers
