---
title: GCP Fundamentals
date: 2026-06-21
tags:
  - google-cloud
  - gcp
  - cloud-shell
  - gcloud
  - compute-engine
  - ssh
---

## Cloud Shell

[[Cloud Shell]] is a browser-based terminal pre-authenticated with your project. It comes with the [[gcloud]] SDK, `git`, and other tools pre-installed.

```bash
# Check active account
gcloud auth list

# Check current project
gcloud config list project
```

## Regions and zones

A **region** is a specific geographic location. A **zone** is an isolated resource within a region.

```bash
gcloud config get-value compute/zone
gcloud config get-value compute/region
gcloud compute project-info describe --project <PROJECT_ID>
```

## Environment variables

```bash
export PROJECT_ID=<your_project_ID>
export ZONE=<your_zone>
echo $PROJECT_ID
echo $ZONE
```

## Creating a VM

```bash
gcloud compute instances create gcelab2 --machine-type n1-standard-2 --zone $ZONE
```

Key subcommand: `gcloud compute instances create <NAME>` — creates a new Compute Engine VM.

### SSH into the VM

```bash
gcloud compute ssh gcelab2 --zone $ZONE
```

This auto-generates SSH keys on first connection. Disconnect with `exit`.

## gcloud exploration commands

```bash
gcloud -h                              # Basic help
gcloud config --help                   # Config-specific help
gcloud config list                     # Current configuration
gcloud config list --all               # All properties
gcloud components list                 # Installed SDK components
```

## Installing the interactive shell

```bash
sudo apt-get install google-cloud-sdk
gcloud beta interactive
```

Interactive mode provides auto-completing prompts with inline help. Exit with `exit`.
