---
title: Lerd
date: 2026-08-14
tags:
  - tools
  - laravel
  - php
  - containers
  - podman
  - dev-environments
---

**Lerd** is an open-source local PHP development environment designed primarily for Linux and macOS. It mirrors the zero-config, `.test`-domain developer experience of [[laravel-herd]], but uses **rootless Podman containers** instead of host binaries.

## Key Features

- **Rootless & daemonless**: Runs without `sudo` and without background daemon overhead via Podman.
- **Automatic routing**: Serves projects at `https://<directory>.test` automatically.
- **Service orchestration**: On-demand provisioning of MySQL, PostgreSQL, Redis, Meilisearch, and Mailpit.
- **Framework agnostic**: First-class support for Laravel (Horizon, Reverb, queues) as well as Symfony, WordPress, and generic PHP apps.
- **Built-in Web UI & CLI**: Manage sites, inspect service health, and tail logs through the CLI or browser dashboard.
- **Configuration per project**: Custom configurations defined via `.lerd.yaml`.

## Common CLI Commands

| Command         | Description                                       |
| --------------- | ------------------------------------------------- |
| `lerd up`       | Start required background containers and proxy    |
| `lerd down`     | Stop running containers                           |
| `lerd link`     | Serve current directory as a named `.test` site   |
| `lerd secure`   | Provision local TLS certificates                  |
| `lerd services` | List and toggle auxiliary database/cache services |
| `lerd logs`     | Stream logs for web servers or background workers |

## Comparison with Laravel Herd

| Feature                  | [[lerd]]                   | [[laravel-herd]]        |
| ------------------------ | -------------------------- | ----------------------- |
| **Primary OS**           | Linux, macOS               | macOS, Windows          |
| **Runtime Architecture** | Rootless Podman containers | Native binaries         |
| **License**              | Open Source (MIT)          | Commercial / Freemium   |
| **Linux Support**        | Native first-class citizen | None (requires Wine/VM) |
