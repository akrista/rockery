# AGENTS.md

## Project Overview

**Rockery** is a [Quartz 5](https://quartz.jzhao.xyz/) static site generator that transforms Obsidian-flavored Markdown notes into a published digital garden / personal knowledge base (PKB) at [rockery.notakrista.com](https://rockery.notakrista.com). It is deployed to GitHub Pages on every push to `master`.

### Key Technologies

| Layer       | Technology                                    |
| ----------- | --------------------------------------------- |
| Runtime     | Node.js ≥22, npm ≥10.9.2                      |
| Language    | TypeScript (strict), Preact JSX, SCSS         |
| Bundler     | esbuild + esbuild-sass-plugin                 |
| CSS         | LightningCSS                                  |
| Test runner | Node.js built-in test runner via `tsx --test` |
| Formatter   | Prettier                                      |
| Images      | Sharp (OG image generation)                   |
| Content     | Obsidian Markdown with YAML frontmatter       |

### Project Structure

```
rockery/
├── content/                     # Site content (Obsidian vault)
│   ├── daily/                   #   Public daily notes
│   ├── topics/                  #   Deep-dive concept notes
│   ├── projects/                #   Long-form project docs
│   ├── ideas/                   #   Half-baked concepts, brainstorms
│   ├── tasks/                   #   Public task tracking
│   ├── private/                 #   NOT GIT-TRACKED
│   │   ├── daily/               #     Private daily notes
│   │   ├── tasks/               #     Task management
│   │   ├── scratch/             #     Drafts/WIP
│   │   ├── ideas/               #     Private brainstorms
│   │   └── projects/            #     Private project docs
│   └── index.md                 #   Homepage
├── quartz/                      # Quartz core source
│   ├── bootstrap-cli.mjs        #   CLI entry point
│   ├── build.ts                 #   Build orchestrator
│   ├── cli/                     #   CLI handlers, args, helpers
│   ├── components/              #   Preact UI components
│   ├── plugins/                 #   Transformer/filter/emitter plugins
│   ├── processors/              #   Parse → filter → emit pipeline
│   ├── styles/                  #   SCSS files
│   └── util/                    #   Utilities (path, theme, glob, etc.)
├── .quartz/plugins/             # Installed community plugins (git-ignored locally, installed by CI)
├── public/                      # Build output → deployed to GitHub Pages
├── quartz.config.yaml           # Main site configuration (Gruvbox theme)
├── quartz.lock.json             # Plugin lockfile (47 plugins pinned to commits)
└── package.json                 # Dependencies and scripts
```

## Setup Commands

```bash
# Clone and install
git clone https://github.com/akrista/rockery.git
cd rockery
npm ci

# Install Quartz plugins (required before first build)
npx quartz plugin install
```

## Development Workflow

```bash
# Full dev server with hot reload (builds + serves on port 8080)
npx quartz build --serve --watch

# Or using the npm script (equivalent)
npm run quartz -- build --serve --watch

# Build once without serving
npx quartz build

# Serve built site locally
npx quartz build --serve

# Clean build cache
npm run clean
```

The dev server supports WebSocket-based hot-reload on port 3001. Content changes in `content/` trigger automatic rebuilds.

### Adding content

Create new Markdown files in `content/` with YAML frontmatter:

```yaml
---
title: "My Note"
date: 2025-01-01
tags:
  - tag1
  - tag2
---
```

## Testing Instructions

```bash
# Run all tests
npm test

# Run a specific test file
npx tsx --test quartz/util/path.test.ts

# Run tests matching a pattern
npx tsx --test --test-name-pattern="slug" quartz/util/slugCollisions.test.ts
```

### Test locations

| File                                        | Tests                     |
| ------------------------------------------- | ------------------------- |
| `quartz/cli/helpers.test.js`                | CLI helper utilities      |
| `quartz/util/path.test.ts`                  | Path manipulation logic   |
| `quartz/util/fileTrie.test.ts`              | File trie data structure  |
| `quartz/util/slugCollisions.test.ts`        | Slug collision resolution |
| `quartz/components/renderPage.test.ts`      | Page rendering            |
| `quartz/components/scripts/search.test.ts`  | Full-text search          |
| `quartz/components/scripts/popover.test.ts` | Popover preview           |

Tests use the **Node.js built-in test runner** (`node:test`). No Jest or Vitest. Test files are co-located with source files and named `*.test.ts` or `*.test.js`.

## Code Style

### TypeScript

- **Strict mode** enabled in `tsconfig.json`
- `noUnusedLocals` and `noUnusedParameters` are errors — remove unused code
- JSX uses **Preact** (`jsxImportSource: "preact"`)
- ESNext modules (`"type": "module"` in package.json)
- Use `import`/`export` syntax, not CommonJS `require()`

### Formatting

- **Prettier** with no semicolons, single quotes, trailing commas, printWidth 100
- Format: `npm run format` (writes files) or `npm run check` (checks only)
- Prettier config in `.prettierrc`; ignores: `public`, `node_modules`, `.quartz-cache`

### Linting

- `tsc --noEmit` for type checking — run before committing: `npm run check`
- The `check` script runs both `tsc --noEmit` and `prettier --check`

## Build and Deployment

### Build pipeline

1. `npm run prebuild` → installs/updates plugins from `quartz.lock.json`
2. `npx quartz build` → parses content, applies plugins, emits static site to `public/`
3. Output is in `public/` (HTML, CSS, JS, assets)

### CI/CD

**Deployment** (`.github/workflows/deploy-github-pages.yaml`):

- **Trigger**: Push to `master` branch (or manual `workflow_dispatch`)
- **Steps**: `npm ci` → `npx quartz plugin install` → `npx quartz build` → upload to GitHub Pages
- Uses `actions/deploy-pages@v4` and `actions/upload-pages-artifact@v3`

### Docker

- `Dockerfile` provides a multi-stage build using `node:22-slim`
- `compose.yml` runs SilverBullet (alternative editor) on port 3000

### Environment

- `.node-version` = v22.16.0
- `.npmrc` has `engine-strict=true` — fails if Node/npm version mismatch
- No `.env` files — configuration is in `quartz.config.yaml`

## PKB Workflow & Content Guidelines

### Structure conventions

- **Folder names**: lowercase (`daily/`, `topics/`, `ideas/`)
- **index.md**: top-level content directories get a curated `index.md` (homepage cursor). Subdirectories rely on Quartz's auto-generated folder pages.
- **.gitkeep**: No `.gitkeep` files inside `content/private/`
- **Default**: if unsure about content nature, default to private
- **Site config notes**: `CONFIG.md` at content root is ignored by Quartz (`ignorePatterns`)

### Content Routing Matrix

| Type                | Path                                 | Git-tracked | Purpose                               |
| ------------------- | ------------------------------------ | ----------- | ------------------------------------- |
| Public daily notes  | `content/daily/{yyyy}/{mm}/`         | Yes         | Learning-in-public, daily exploration |
| Public topics       | `content/topics/{category}/`         | Yes         | Deep-dive concept notes, tutorials    |
| Public projects     | `content/projects/{project}/`        | Yes         | Long-form project docs                |
| Public ideas        | `content/ideas/`                     | Yes         | Half-baked concepts, brainstorms      |
| Public tasks        | `content/tasks/`                     | Yes         | Open work tracking                    |
| Private daily notes | `content/private/daily/{yyyy}/{mm}/` | **No**      | Personal daily logs                   |
| Private tasks       | `content/private/tasks/`             | **No**      | Task management                       |
| Private scratch     | `content/private/scratch/`           | **No**      | Drafts, WIP content                   |
| Private ideas       | `content/private/ideas/`             | **No**      | Private brainstorms                   |
| Private projects    | `content/private/projects/`          | **No**      | Private project docs                  |
| Archive             | `content/archive/`                   | Yes         | Moved-outdated content                |
| Quartz docs         | `content/quartz-docs/`               | Yes         | Quartz reference docs                 |
| Obsidian sandbox    | `content/obsidian-sandbox/`          | Yes         | Obsidian feature exploration          |

### Topics subcategorization

Topics are grouped into subdirectories by domain. Current categories:

| Category   | Path                         | Content                                         |
| ---------- | ---------------------------- | ----------------------------------------------- |
| Networking | `content/topics/networking/` | tcpdump, ssh, ssh-config, netstat, linux-router |
| Cloud      | `content/topics/cloud/`      | gcp-fundamentals, gcloud, erp                   |
| CLI        | `content/topics/cli/`        | cp, ls, powershell                              |
| Concepts   | `content/topics/concepts/`   | megabyte                                        |
| Tools      | `content/topics/tools/`      | create-ap                                       |

Add new subdirectories when a category reaches 3+ notes. Keep orphan topics flat in `topics/` until they have siblings.

### Daily Notes Protocol

1. Create a daily note at `content/daily/{yyyy}/{mm}/YYYY-MM-DD-<topic-slug>.md` (public) or `content/private/daily/{yyyy}/{mm}/YYYY-MM-DD-<topic-slug>.md` (private)
2. Include YAML frontmatter with `title`, `date`, and `tags`
3. Summarize key learning in 3–5 bullet points
4. Use **Obsidian wikilinks** (`[[Note Title]]`) to connect related notes
5. Use **Obsidian callouts** (`> [!info]`, `> [!todo]`, `> [!warning]`, etc.) for emphasis

### Privacy & Data Sanitization

**CRITICAL**: Never place sensitive data (company names, client names, people's names, credentials, internal project names) in any git-tracked location — including config files and commit messages. Use generic placeholders:

- Companies/clients → "Client A", "External Client 1"
- Programs/projects → "Program X", "Internal Project 2"
- People → "Collaborator A"

### Task Management

Tasks can be **public** (`content/tasks/`) or **private** (`content/private/tasks/`). Both follow the same format:

Individual `.md` files with YAML frontmatter:

- `title` — task name
- `status` — `pending`, `active`, `done`, or `blocked`
- `tags` — for filtering

When asked "what's up" or "my tasks", glob all `.md` files under both `content/tasks/` and `content/private/tasks/`, read `status` from frontmatter, and group by status (active → pending → blocked, omit done).

## Pull Request Guidelines

- **Title format**: `[component] Brief description` (e.g., `[explorer] Fix sort order`)
- **Required before submission**: `npm run check` (type-check + format) and `npm test`
- This repository's default branch is `master`
- Upstream Quartz 5 is at `https://github.com/jackyzha0/quartz.git` (branch `v5`)

## Developer Communication Guidelines

- Keep explanations under 200 words — use progressive disclosure for depth
- Use **bold** for key terminology, file paths, and class names
- Anchor complex technical concepts in simple analogies
- State what code does in 1–2 sentences, output the code block, then stop

## Additional Notes

- The `quartz` CLI is the primary entry point: `npx quartz build`, `npx quartz plugin install`, etc.
- Plugin management: `npx quartz plugin list`, `npx quartz plugin add`, `npx quartz plugin rm`
- To sync upstream: `npx quartz update`
- The `public/` dir is git-ignored and auto-generated — never edit it directly
- `.quartz/plugins/` is git-ignored — plugins are installed from `quartz.lock.json`
- Git remotes: `origin` = `https://github.com/akrista/rockery`, `upstream` = `https://github.com/jackyzha0/quartz.git`
