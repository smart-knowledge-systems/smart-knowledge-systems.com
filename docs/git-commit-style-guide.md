# Git Commit Style Guide

This guide documents the commit message conventions used in this repository. Following these patterns creates a readable history that helps developers understand the codebase evolution.

## Quick Reference

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

**Example:**

```
feat(US-047): Implement Space key to mark reader progress position

Add keyboard handler for Space key in LNF and aWRF assessments to mark
the current reader progress position. Updates visual indicators and
syncs state via Convex.

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

---

## Format Specification

### Subject Line

| Component   | Rule                        | Example                      |
| ----------- | --------------------------- | ---------------------------- |
| **Type**    | Required. Lowercase.        | `feat`, `fix`, `refactor`    |
| **Scope**   | Optional. In parentheses.   | `(US-047)`, `(REFACTOR-001)` |
| **Subject** | Imperative mood. No period. | `Add keyboard navigation`    |

**Length:** Aim for 50 characters, max 72. If you need more space, the subject is too broad—split the commit or move details to the body.

**Imperative mood:** Write as if completing the sentence "This commit will..."

- `Add feature` not `Added feature`
- `Fix bug` not `Fixes bug` or `Fixed bug`

### Body (Optional)

Use for commits that need context. Separate from subject with a blank line.

- Explain **what** changed and **why**
- Wrap at 72 characters
- Use bullet points for multiple changes
- Reference related files when helpful

### Footer (Optional)

Used for metadata:

- `Co-Authored-By:` for AI-assisted or pair-programmed commits
- `BREAKING CHANGE:` for incompatible changes
- Issue references: `Closes #123`, `Refs #456`

---

## Commit Types

| Type       | When to Use                             | Example Subject                    |
| ---------- | --------------------------------------- | ---------------------------------- |
| `feat`     | New functionality                       | `Add word matching drawer`         |
| `fix`      | Bug correction                          | `Fix audio playback on Safari`     |
| `refactor` | Code restructuring (no behavior change) | `Extract useAudioPlayback hook`    |
| `perf`     | Performance improvement                 | `Optimize fluency record queries`  |
| `docs`     | Documentation only                      | `Update README setup instructions` |
| `chore`    | Build, config, dependencies             | `Migrate from pnpm to bun`         |
| `test`     | Adding or fixing tests                  | `Add unit tests for page-parsing`  |
| `style`    | Formatting (no code change)             | `Format with Prettier`             |

**Choose based on primary intent.** A refactor that also fixes a bug? If the bug fix is the goal, use `fix`. If cleaning up code and the fix is incidental, use `refactor`.

---

## Scope Conventions

Scopes provide context about what area of code changed.

### User Stories: `US-XXX`

For feature work tracked in the PRD/story system:

```
feat(US-049): Integrate dual-focus navigation end-to-end
feat(US-048): Add visual indicators for dual focus states
```

### Refactoring Batches: `REFACTOR-XXX`

For coordinated refactoring efforts:

```
refactor(REFACTOR-013): Extract orientation hooks to lib/hooks
refactor(REFACTOR-001): Consolidate server actions
```

### Domain Scopes

When no story/batch applies, use the domain or component:

```
fix(zoom): Handle connection timeout gracefully
feat(ear-reader): Add page progress indicator
refactor(dexie): Simplify fluency record helpers
```

### No Scope

For cross-cutting changes or when scope adds no value:

```
chore: Update dependencies
docs: Add git commit style guide
```

---

## Examples from This Repository

### Feature with Context

```
feat(US-049): Integrate and test dual-focus navigation end-to-end

Complete integration of dual-focus navigation system (US-044 through US-048):
- Hesitation timer now resets aide markup index on trigger
- Manual override during grace period only works for forward navigation
- All visual indicators update correctly for both focus types

Files modified:
- use-lnf-flow.ts: Reset aideMarkupIndex in onHesitate callback
- awrf-assessment.tsx: Reset aideMarkupIndex in onHesitate callback

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

### Refactoring with File List

```
refactor: consolidate handleMarkReaderProgress and extract constants

Code review fixes for US-033 to US-049:
- Add forwardRef to LnfAideGrid for ref forwarding
- Add race condition guard to startAudioPlayback
- Extract shared handleMarkReaderProgress logic to hook
- Move focus constants to dedicated file

Files:
- New: src/lib/hooks/use-mark-reader-progress.ts
- New: src/lib/constants/focus.ts
- Modified: lnf-aide-grid.tsx, awrf-assessment.tsx

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

### Simple Focused Commits

```
feat(US-046): Implement S/D/F marking keys for aide markup position
fix(zoom): Prevent duplicate join attempts on reconnect
perf: Batch fluency record updates to reduce Convex calls
chore: Migrate from pnpm to bun
```

---

## Anti-patterns

| Avoid                                               | Why                              | Instead                                   |
| --------------------------------------------------- | -------------------------------- | ----------------------------------------- |
| `Fixed stuff`                                       | No context, impossible to search | `fix(zoom): Resolve audio echo on Safari` |
| `WIP`                                               | Unclear scope, clutters history  | Squash or amend before push               |
| `feat: Add button and fix layout and update styles` | Multiple concerns in one commit  | Split into separate commits               |
| `Updated the component`                             | Passive voice, vague             | `Refactor WordCard to use forwardRef`     |
| `Changes per review feedback`                       | No standalone meaning            | Describe the actual change                |
| Commit body that just repeats the subject           | Adds no value                    | Explain why or list affected files        |

---

## Why This Matters

Commit messages are **living documentation**. They answer questions that code comments can't:

- **"Why was this approach chosen?"** — The body explains reasoning
- **"When did this behavior change?"** — `git log -S` finds the commit
- **"What was part of feature X?"** — `git log --grep="US-047"` lists all related commits
- **"Who can explain this code?"** — Co-authorship and scope indicate ownership

For new developers, scanning `git log --oneline` reveals:

- Which features exist and their scope
- How the codebase evolved
- Patterns and conventions the team follows
- Entry points for understanding specific domains

Well-written commits reduce onboarding time because the history itself teaches the codebase.

---

## Quick Checklist

Before committing:

- [ ] Type accurately reflects the change
- [ ] Subject is imperative mood, no period
- [ ] Subject fits in ~50 characters (72 max)
- [ ] Scope references story/batch if applicable
- [ ] Body explains "why" for non-obvious changes
- [ ] No unrelated changes bundled together
