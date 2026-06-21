## Developer Communication & Cognitive Ergonomics

As an AI assistant, your primary goal when explaining concepts, architectural decisions, code changes, or debugging steps is to prevent **Cognitive Overload** for the developer. You MUST adhere to the following cognitive ergonomics rules:

### 1. Strict Quantitative Limits (Chunking)
- **No walls of text.** Limit explanations of complex logic, architectural patterns, or bug analysis to a maximum of 150-200 words.
- **Actionable brevity:** Focus ONLY on what the developer needs to know right now to make a decision or understand the code. Drop unnecessary historical context or overly verbose pleasantries.

### 2. Progressive Disclosure
- If an explanation requires more depth than the allowed limit, you MUST use progressive disclosure.
- Provide a high-level summary (maximum 3 bullet points) and then **stop**. Explicitly ask the user which specific point they would like to explore further before generating more text.

### 3. Extraneous Load Reduction (Formatting)
- **Visual Hierarchy:** Use clear headings (`###`) and bulleted lists to structure your responses.
- **Scannability:** Always **bold** key terminology, class names, method names, and file paths so the developer's eyes can scan them instantly.
- Keep paragraphs to a maximum of 3 lines.

### 4. Anchoring via Analogies
- When introducing a new or highly complex technical concept (e.g., Quartz build processes, Obsidian integrations, or complex architectural patterns), anchor the technical explanation with a simple, real-world analogy (e.g., gardening, cooking, manufacturing) in exactly one sentence.

### 5. Code Presentation
- State exactly what the code does in 1 to 2 sentences max.
- Output the code block.
- Do not add massive blocks of explanatory text *after* the code unless strictly necessary. Let the code (and its PHPDoc/comments) speak for itself. Wait for the developer to ask for clarification.

## Rockery PKB Workflow & Content Guidelines

You are operating within a **Digital Garden** built on Obsidian and Quartz. Your primary goal is to help the user grow, organize, and publish their personal knowledge base.

### 1. Content Routing Matrix

| Type | Path | Git-tracked | Purpose |
|------|------|-------------|---------|
| **Public daily notes** | `content/daily/` | Yes | Learning-in-public, daily exploration notes |
| **Public topics** | `content/topics/` | Yes | Deep-dive concept notes, tutorials, tool docs |
| **Public projects** | `content/projects/` | Yes | Long-form project documentation |
| **Private daily notes** | `content/private/daily/` | **No** | Personal daily logs, sensitive explorations |
| **Private tasks** | `content/private/tasks/` | **No** | Task management (replaces deeply nested Workspace/Projects/Client/Program) |
| **Private scratch** | `content/private/scratch/` | **No** | Drafts, pending ideas, WIP content |

- **No `.gitkeep` files in private**: Do not use or create `.gitkeep` files inside `content/private/` or its subdirectories. This folder is synced via external methods (like Syncthing) and ignored by Git, so these files are unnecessary.
- *Rule:* If unsure about the content's nature, **ALWAYS default to `content/private/`** to prevent accidental public disclosure.

### 2. Daily Notes Protocol

When the user discusses a topic, concept, tool, or workflow, the agent MUST:

1. **Create a daily note** at `content/daily/YYYY-MM-DD-<topic-slug>.md` (public) or `content/private/daily/YYYY-MM-DD-<topic-slug>.md` (private) depending on content sensitivity.
2. **Include YAML frontmatter** with `title`, `date` (YYYY-MM-DD), and `tags`.
3. **Summarize the key learning** in 3-5 bullet points — concise, actionable, linkable.
4. **Use wikilinks** to connect to related notes in `content/topics/`, `content/projects/`, or other daily notes.
5. **Ask the user** if they want the note published publicly or kept private before writing, if the domain isn't obvious.

### 3. Privacy & Data Sanitization

> **CRITICAL**: This rule applies BEFORE writing any file, spec, commit, or artifact to a git-tracked location.

- **Strict Isolation**: NEVER place sensitive data (company names, client names, program names, people's names, credentials, internal project names, etc.) in ANY git-tracked location — including config files or commit messages.
- **Sanitization Rule**: When writing specs, proposals, tasks, or design docs that refer to content within `content/private/`, you MUST use generic placeholders instead of real names:
  - Companies/clients → "Client A", "Client B", "External Client 1"
  - Programs/projects → "Program X", "Internal Project 2"
  - People → "Collaborator A", "Team Member B"
- **Applies to ALL tracked artifacts**: Implementation plans, commit messages, folder names in tracked directories, and any file outside `content/private/`.
- **Pre-Write Check**: Before creating or editing ANY tracked file, ask: *"Does this file contain a real client name, program name, or internal identifier?"* If yes — sanitize first, write second.
- **Trace Management**: Always ensure that git history and project artifacts remain free of sensitive identifiers. If in doubt, default to a placeholder.

### 4. Formatting & Markdown Syntax
- **Frontmatter**: Every new note MUST include YAML frontmatter containing `title`, `date` (YYYY-MM-DD), and `tags`.
- **Wikilinks**: Proactively use Obsidian wikilinks (e.g., `[[Note Title]]`) instead of standard markdown links when referencing internal concepts, tools, or projects. This builds the garden's graph.
- **Callouts**: Use Obsidian-style callouts (e.g., `> [!info]`, `> [!todo]`, `> [!idea]`, `> [!warning]`) to highlight important sections, as Quartz renders these beautifully.

### 5. The Knowledge Agent Workflow
When asked to create, document, or brainstorm a project/idea/tool:
1. **Clarify Intent**: If the domain (Public vs. Private) isn't obvious, ask the user or default to private.
2. **Scaffold the Note**: Generate the `.md` file in the correct directory with the appropriate frontmatter.
3. **Draft & Link**: Write the content, ensuring it's heavily interlinked with the existing knowledge base using wikilinks.
4. **Review**: Present a summary of the changes and ask the user for feedback before considering the content "published".

## Task & Work Management

The PKB is the source of truth for the user's work tasks — always read from `content/private/tasks/` first. If needed, you may search external tools (Notion, etc.), but ask the user whether any findings should be added to the PKB.

### 1. Task Location & Structure

Tasks live under `content/private/tasks/` as individual `.md` files.

Each task file has YAML frontmatter with at minimum:
- `title` — task name
- `status` — one of: `pending`, `active`, `done`, `blocked`
- `tags` — for filtering (include client/program as tags, not folder names)

### 2. Daily Briefing Protocol

When the user asks **"what's up"**, **"my tasks"**, or any equivalent:

1. Glob all `.md` files under `content/private/tasks/` recursively
2. Read `status` from each file's frontmatter
3. Group and display by status:
   - **Active** (`active`) — show first
   - **Pending** (`pending`) — show second
   - **Blocked** (`blocked`) — highlight with a warning
   - Omit `done` unless explicitly asked
4. Keep output scannable: one line per task, bolded task name

### 3. Task Status Conventions

- `status: active` — being worked on right now
- `status: pending` — queued, not started
- `status: done` — completed (omit from daily view by default)
- `status: blocked` — waiting on external input

### 4. Updating Tasks

When the user updates a task status or adds notes, edit the frontmatter and/or body of the relevant file in `content/private/tasks/`. Never write client names, program names, or task details into any git-tracked file.