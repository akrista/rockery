## 1. Directory Scaffolding

- [x] 1.1 Create `content/private/templates` directory for shared structures.
- [x] 1.2 Verify or create sub-folders (`Projects`, `Todos`, `Knowledge`, `Meetings`) for each private entity.

## 2. Dashboard Implementation

- [x] 2.1 Create/Update dashboards for managed private entities (e.g., Company A, Company B) with enhanced sections, navigation, and priority callouts.

## 3. Template Development

- [x] 3.1 Create `content/private/templates/Company Project.md` with status, priority frontmatter, and standard headers.
- [x] 3.2 Create `content/private/templates/Company Task.md` with metadata for deadlines and parent project links.
- [x] 3.3 Create `content/private/templates/Company Meeting.md` with sections for attendees, agenda, and action items.

## 4. Configuration & Visibility

- [x] 4.1 Modify `quartz.config.ts` to remove `"private"` from `ignorePatterns` so the building process includes these notes.
