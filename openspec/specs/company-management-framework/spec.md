# Capability: company-management-framework

## Requirements

### Requirement: Standardized Company Dashboard
Each company SHALL have an `index.md` dashboard that provides a high-level overview of the company's state and navigation to sub-sections.

#### Scenario: Dashboard Overview
- **WHEN** user opens the company dashboard
- **THEN** they see navigation links to Projects, Todos, Knowledge, and Meetings
- **AND** they see a "High Priority" callout for immediate tasks

### Requirement: Isolated Folder Hierarchy
The framework SHALL use a consistent folder structure for each company to ensure logical separation of concerns.

#### Scenario: Directory Navigation
- **WHEN** user browses the file system
- **THEN** they see mirrored directories for their private companies
- **AND** each contains dedicated sub-folders for core business areas
