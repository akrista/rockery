# Capability: company-templates

## Requirements

### Requirement: Standardized Project Template
The framework SHALL provide a template for new projects that includes metadata for status, priority, and links.

#### Scenario: New Project Creation
- **WHEN** user creates a new project note
- **THEN** it includes frontmatter for `status` (active/backlog) and `priority`
- **AND** it contains sections for Objectives and Next Steps

### Requirement: Unified Task Template
The framework SHALL include a template for tasks or "Todos" that captures deadlines and context.

#### Scenario: Task Documentation
- **WHEN** user logs a new task
- **THEN** it includes a checkbox and a link back to the parent project
