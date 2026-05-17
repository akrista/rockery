## Why

The user is currently managing two private companies and lacks a structured framework to organize information, projects, and tasks within their private knowledge base. This results in fragmented data and reduced productivity. A standardized framework is needed to provide isolation, organization, and easy access to company-specific content.

## What Changes

- **Framework Structure**: Establish a mirrored, isolated folder hierarchy for each company under `content/private/`.
- **Dashboards**: Create central `index.md` dashboards for each company featuring navigation wikilinks and Obsidian-style callouts for status monitoring.
- **Templates**: Design and implement standardized templates for Projects, Todos, Knowledge, and Meetings to ensure data consistency across both companies.
- **Quartz Configuration**: Update `quartz.config.ts` to allow private content to be built/previewed if desired (or documented as a manual step).

## Capabilities

### New Capabilities
- `company-management-framework`: The core structure and navigation system for managing multiple company-related notes.
- `company-templates`: Standardized templates for projects, tasks, and documentation within the framework.

### Modified Capabilities
<!-- None -->

## Impact

- `content/private/`: Primary location for the framework.
- `quartz.config.ts`: Configuration for builder visibility.
- Obsidian/Quartz workflow for company data.
