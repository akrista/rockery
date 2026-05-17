## Context

The user manages multiple private companies within their digital garden. Currently, these are stored in `content/private/` which is ignored by Quartz. The user needs a "framework" that adds value beyond just empty folders, including standardized templates and a dashboard system.

## Goals / Non-Goals

**Goals:**
- Provide a clear, mirrored folder structure for private companies.
- Implement central "Dashboards" for each company with high-level summaries.
- Create reusable templates for Projects, Todos, and Meetings to ensure high-quality, consistent note-taking.
- Configure Quartz visibility for private content (if requested).

**Non-Goals:**
- Automating project management outside of basic note-taking and linking.
- Synchronizing with external tools (e.g., Jira, Trello).

## Decisions

### 1. Folder Structure
- **Decision:** Use a fixed hierarchy: `Projects/`, `Todos/`, `Knowledge/`, `Meetings/`.
- **Rationale:** Predictability across different entities simplifies navigation and template application.

### 2. Dashboard Design
- **Decision:** Use Obsidian callouts for "Priority Tasks" and "Active Projects".
- **Rationale:** Callouts provide a visual hierarchy that highlights critical information at a glance.

### 3. Template System
- **Decision:** Create a `templates/` folder within `content/private/` (or use existing if available) to store company-specific note templates.
- **Rationale:** Standardizing the metadata (YAML) and sections (Requirements, Log, Next Steps) makes notes more valuable over time.

## Risks / Trade-offs

- **Risk:** Private data leakage if pushed to a public repo.
- **Mitigation:** Maintain the `.gitignore` in `content/private/` and ensure Quartz configuration is understood (ignored by default).
- **Risk:** Over-complicating the workflow.
- **Mitigation:** Stick to Vanilla Markdown and native Obsidian/Quartz features (wikilinks, callouts).
