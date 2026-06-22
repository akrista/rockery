---
title: gcloud
date: 2026-06-21
tags:
  - google-cloud
  - cli
  - command-line
  - gcp
---

`gcloud` is the primary command-line tool for [[Google Cloud]]. It is pre-installed in [[Cloud Shell]] and supports tab completion for commands, subcommands, and flag values.

## Common commands

```bash
# List active account
gcloud auth list

# Show project configuration
gcloud config list project

# Show compute zone and region defaults
gcloud config get-value compute/zone
gcloud config get-value compute/region

# Describe project details
gcloud compute project-info describe --project <PROJECT_ID>

# Create a VM instance
gcloud compute instances create <NAME> --machine-type n1-standard-2 --zone <ZONE>
```

## Interactive mode

`gcloud beta interactive` enables auto-completing prompts with inline help snippets shown at the bottom of the terminal as you type.

## Useful flags

- `--help` or `-h` — show help for any command
- `--format` — control output format (e.g., `json`, `yaml`, `table`)
- `--project` — specify a project ID explicitly
- `--zone` / `--region` — override default location
