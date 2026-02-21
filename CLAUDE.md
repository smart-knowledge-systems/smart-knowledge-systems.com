# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 website for Smart Knowledge Systems, a consulting business focused on breaking down information silos in organizations. The site is built with React, TypeScript, and Tailwind CSS, using modern Next.js App Router features.

## Development Commands

### Core Commands

- `bun run dev` - Start development server with Turbopack (opens on http://localhost:3000)
- `bun run build` - Build production version
- `bun run start` - Start production server
- `bun run lint` - Run ESLint for code linting

### Testing

No test framework is currently configured. If adding tests, check with the project maintainer for preferred testing approach.

## Architecture & Code Organization

### Content-Driven Architecture

The site follows a content-driven approach where marketing content is stored separately from presentation components. This separation allows content updates without changing site structure.

### Key Directories

**`/src/content/`** - All site content and copy

- `marketing-content.tsx` - Main marketing content (hero, services, footer data)
- `blog/posts.ts` - Blog post metadata and content structure
- `blog/*.md` - Individual blog post markdown files
- `cv/student-work.json` - Academic work data with comprehensive metadata
- `cv/portfolio.ts` - Portfolio TypeScript interfaces and helper functions
- `dialog-synthialog-about-pages.md` - Additional content

**`/src/components/`** - Reusable UI components

- `marketing/` - Marketing-specific components (hero, services, main)
- `blog/` - Blog-specific components (post, featured)
- `portfolio/` - Portfolio-specific components (filtering, display, pagination)
- `header.tsx`, `footer.tsx` - Site layout components
- `markdown-content.tsx` - Markdown rendering component

**`/src/app/`** - Next.js App Router pages and layouts

- Page components import content from `/src/content/` and render with components
- `blog/` - Blog pages with dynamic routing
- `portfolio/` - Portfolio page with client-side filtering
- `russ-fugal/route.ts` - Special redirect route

**`/src/lib/`** - Utility functions

- `load-markdown.ts` - Markdown content loading utilities
- `post-filters.ts` - Blog post filtering logic
- `portfolio-filters.ts` - Portfolio filtering, sorting, and pagination utilities

### Configuration Files

- `next.config.ts` - Next.js configuration with subdomain redirects
- `tsconfig.json` - TypeScript configuration with path aliases (`@/*` → `./src/*`)
- `eslint.config.mjs` - ESLint configuration extending Next.js rules
- `postcss.config.mjs` - PostCSS configuration for Tailwind CSS

## Content Management

### Blog Posts

Blog posts are managed through a dual-file system:

1. **Metadata**: Defined in `/src/content/blog/posts.ts` with the `Post` interface including:
   - `id`, `title`, `href`, `description`, `datetime`
   - `categories` array with optional priority for display order
   - `author` object with centralized author information (Russ Fugal)
   - `body` field (can be markdown content or empty string)
2. **Content**: Individual markdown files in `/src/content/blog/` (e.g., `friction.md`, `crossing-the-divide.md`)
3. **Categories**: Six predefined categories in `posts.ts`:
   - Knowledge Management (`knowledgeManagement`)
   - Organizational Culture (`organizationalCulture`)
   - Leadership (`leadership`)
   - Project Management (`projectManagement`)
   - Technology Integration (`technologyIntegration`)
   - Team Collaboration (`teamCollaboration`)
4. **Adding New Posts**: Create markdown file in `blog/` directory AND add entry to `postsData` array in `posts.ts`

### Portfolio (Academic Work)

Student work is managed through:

1. **Data**: JSON structure in `/src/content/cv/student-work.json` with academic metadata
   - Each essay has: `title`, `date`, `abstract`, `url`, `course`, `school`, `tags[]`
2. **Types**: TypeScript interfaces in `/src/content/cv/portfolio.ts`
   - `StudentWork`, `School`, `Course`, `Tag`, `PortfolioData`
   - Helper functions: `getTagSlug()`, `getTagName()`, `getSchoolSlug()`, `getSchoolName()`
3. **Taxonomies**: 18 predefined tags spanning academic disciplines (Film Studies, Philosophy, Education, Rhetoric, etc.)
   - Three schools: SLCC, University of Utah, SUNY Albany
4. **Filtering**: Client-side filtering with URL state management
   - Tags use OR logic (essay must have at least one selected tag)
   - Schools and courses use exact match filtering
   - All filters work together with AND logic between filter types
5. **Sorting**: Intelligent tag match scoring
   - Multi-tag selections: essays sorted by number of matching tags (higher first), then by date
   - Single/no tags: sorted by date only
   - Sort direction toggleable (ascending/descending)

### Marketing Content

All marketing copy is centralized in `/src/content/marketing-content.tsx`:

- Hero section content
- Services descriptions
- Footer navigation and social links
- Site navigation

## Key Technologies

- **Next.js 15** with App Router
- **React 19** with strict TypeScript
- **Tailwind CSS 4** for styling
- **Markdown Processing**: react-markdown, rehype-pretty-code, remark-gfm
- **Syntax Highlighting**: Shiki
- **Analytics**: Vercel Analytics
- **Fonts**: Geist Sans & Geist Mono

## Development Patterns

### Component Structure

- Components import content from `/src/content/` rather than hardcoding text
- TypeScript interfaces define content structure
- Responsive design with Tailwind CSS utility classes

### Content Updates

- Update marketing content in `marketing-content.tsx`
- Add blog posts by creating `.md` files and updating `posts.ts`
- Update portfolio entries in `student-work.json` and manage tags in `portfolio.ts`
- Maintain separation between content and presentation

### Client-Side vs Server-Side Architecture

- **Blog**: Server-side rendering with static generation
- **Portfolio**: Client-side filtering with URL state management for shareable links
- Both systems use TypeScript interfaces and helper functions for data transformation

### Subdomain Handling

The site handles subdomain redirects through Next.js configuration:

- **Subdomains**: `rusted`, `russ-fugal`, `dialogue`, `social`
- **Behavior**: Redirect from `{subdomain}.smart-knowledge-systems.com` to `smart-knowledge-systems.com/{subdomain}`
- **Configuration**: Defined in `next.config.ts` with `async redirects()` function
- **Special Routes**: `/russ-fugal` route redirects to Bluesky profile via `route.ts` handler

## Path Aliases

- `@/*` maps to `./src/*` for cleaner imports

## Important Filtering Logic

### Portfolio Filtering (`/src/lib/portfolio-filters.ts`)

When working with portfolio filtering:

- `filterSortAndPaginateEssays()` is the main function combining all operations
- Tag filtering uses OR logic within tags, AND logic between filter types
- Sorting with multi-tag selection prioritizes essays matching more tags
- URL parameters manage filter state: `tags`, `schools`, `courses`, `page`, `sort`
- Client-side filtering enables shareable URLs without API calls

### Blog Post Filtering

- Posts sorted by `datetime` (most recent first by default)
- Category filtering available through predefined categories
- Posts contain both inline body content and separate markdown files
