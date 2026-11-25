# AGENTS.md

Rockery is a Quartz 5 site that publishes an Obsidian vault (`content/`) to GitHub Pages. Setup, structure, and CI are in [README.md](README.md).

## Commands

- Dev server: `npm run dev` (port 8080)
- Build: `npm run build`
- Plugins (required before first build): `npx quartz plugin install`
- Tests: `npm test`, or one file: `npx tsx --test quartz/util/path.test.ts`
- Before a PR: `npm run check` (tsc + prettier) and `npm test`

## Code Style

- TypeScript strict, ESM only (`import`/`export`, no `require`), Preact JSX.
- `noUnusedLocals` and `noUnusedParameters` are errors: delete unused code.
- Prettier: no semicolons, single quotes, trailing commas, printWidth 100. Run `npm run format`.
- Tests use `node:test`, co-located as `*.test.ts` / `*.test.js`. No Jest or Vitest.

## Never

- Edit `public/` (generated) or `.quartz/plugins/` (installed from `quartz.lock.json`).
- Commit anything under `content/private/` (git-ignored).
- Put sensitive data in any git-tracked file or commit message: company, client, person, or internal project names, credentials. Use placeholders: "Client A", "Program X", "Collaborator A".

## Content Conventions

- Default to private if unsure about a note's nature.
- Folders and filenames: lowercase, hyphens, English. No `.gitkeep` inside `content/private/`.
- Tags and categories are plural (`topics`, not `topic`).
- YAML properties: short, reusable, composable (`start`/`end`, not `start_date`/`end_date`). Use a list when multiple values are possible.
- Ratings use an integer 1-7: 7 perfect, 6 excellent, 5 good, 4 passable, 3 bad, 2 atrocious, 1 evil.
- `CONFIG.md` at the content root is ignored by Quartz.

### Where content goes

| Type     | Public (tracked)              | Private (not tracked)                |
| -------- | ----------------------------- | ------------------------------------ |
| Daily    | `content/daily/{yyyy}/{mm}/`  | `content/private/daily/{yyyy}/{mm}/` |
| Topics   | `content/topics/{category}/`  | n/a                                  |
| Projects | `content/projects/{project}/` | `content/private/projects/`          |
| Ideas    | `content/ideas/`              | `content/private/ideas/`             |
| Tasks    | `content/tasks/{entity}/`     | `content/private/tasks/{entity}/`    |
| Drafts   | n/a                           | `content/private/scratch/`           |

Also tracked: `content/archive/` (outdated), `content/quartz-docs/`, `content/obsidian-sandbox/`.

Note types have skills (`rockery-daily-note`, `rockery-topic`, `rockery-idea`, `rockery-project`, `rockery-task-manager`). Use them. They hold the frontmatter and template details.

## Tasks

- Listing tasks ("what's up", "my tasks"): use PowerShell `Get-ChildItem -Recurse -Filter "*.md"` over `content/tasks/` and `content/private/tasks/`. The Glob tool respects `.gitignore` and hides `private/`.
- Group by `status`: active, pending, blocked. Omit done.

## Git

- Default branch is `master`. Remotes: `origin` = akrista/rockery, `upstream` = jackyzha0/quartz (branch `v5`). Sync upstream with `npx quartz update`.
- PR title: `[component] Brief description`.
