---
title: Rockery Skills
date: 2026-06-21
tags:
  - rockery
  - workflow
  - automation
  - tools
---

A set of AI agent skills that automate content creation for the Rockery digital garden. Each skill handles a specific content type — from daily notes to project docs — enforcing the project's conventions for file paths, frontmatter, formatting, and privacy routing.

There are five skills, each designed for a distinct content type. They are available in all agent directories (`.opencode/skills/`, `.claude/skills/`, `.agents/skills/`).

## Skills overview

### rockery-daily-note

Creates daily learning logs at the correct date-based path. Follows the daily notes protocol: YAML frontmatter with title, date, and tags; a first-person journal-style summary; bullet points with wikilinks to related concepts; and optional callouts for emphasis.

**When to use**: writing a daily entry, logging what you learned or worked on, capturing a journal entry, documenting today's exploration.

**Privacy**: defaults to public (`content/daily/{yyyy}/{mm}/`). Routes to private (`content/private/daily/{yyyy}/{mm}/`) when the content involves sensitive information.

### rockery-topic

Creates deep-dive reference notes organized by category subdirectory. Follows the man-page template observed in existing topics like [[tcpdump]], [[ssh]], and [[gcp-fundamentals]]: opening definition, common flags or usage with code blocks, tables for structured data, examples, and a closing related-links section with wikilinks.

**When to use**: writing a tutorial, a reference note, documentation for a tool or concept, or a deep dive on a specific technology.

**Categories**: [[Networking]], [[Cloud]], [[CLI]], [[Concepts]], [[Tools]], or a new category when the topic is clearly distinct.

### rockery-idea

Captures half-baked concepts, brainstorms, and rough thoughts that haven't yet matured into a full topic or project. Uses a flexible structure — concrete ideas get sections (Concept, Why it's interesting, Open questions), while raw thoughts can be free-form.

**When to use**: brainstorming, capturing a rough concept, thinking out loud about something, recording a creative spark or hypothesis.

**Privacy**: defaults to private (`content/private/ideas/`). Make public only when the idea is clearly shareable.

### rockery-project

Creates long-form project documentation with a directory per project. Starts with an index.md containing Overview, Goals (with checkboxes), optional Architecture section, and a reverse-chronological Progress log. Supports growing into multiple files as the project expands.

**When to use**: documenting a substantial project, setting up a new project directory, recording progress on ongoing work, capturing project architecture or design decisions.

**Privacy**: defaults to public (`content/projects/{name}/`). Routes to private (`content/private/projects/{name}/`) for internal or sensitive projects.

### rockery-task-manager

Task CRUD with status tracking. Each task is a markdown file with a `status` frontmatter field (`active`, `pending`, `blocked`, `done`). Can create tasks, list them grouped by status (active first, then pending, then blocked), and update status. When asked "what's up", it globs all task files and presents an organized summary.

**When to use**: adding a task, checking what you're working on, asking "what's up", marking a task done or blocked, listing pending work.

**Privacy**: defaults to private (`content/private/tasks/`). Make public only when tracking open, visible work items.

## Privacy routing summary

| Skill | Default | Public path | Private path |
|-------|---------|-------------|--------------|
| Daily note | Public | `content/daily/{yyyy}/{mm}/` | `content/private/daily/{yyyy}/{mm}/` |
| Topic | Public | `content/topics/{category}/` | N/A (topics are always public) |
| Idea | Private | `content/ideas/` | `content/private/ideas/` |
| Project | Public | `content/projects/{name}/` | `content/private/projects/{name}/` |
| Task | Private | `content/tasks/` | `content/private/tasks/` |

The default-to-private rule applies when in doubt: if content could involve sensitive information, route it to the private path.

## Related

- [[create-ap]] — the GitHub Pages workflow that deploys the site
- [[content/index|Homepage]] — the digital garden itself
