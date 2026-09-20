---
title: Laravel Herd
date: 2026-08-14
tags:
  - tools
  - laravel
  - php
  - dev-environments
---

**Laravel Herd** is a native, zero-configuration local PHP development environment for macOS and Windows. It ships with pre-compiled binaries for PHP, [[nginx]], and Dnsmasq, serving requests instantly without requiring Docker or Homebrew background daemons.

## Key Features

- **Zero configuration**: Automatically serves sites from parked directories under `.test` domains.
- **Native performance**: Runs directly on the host OS via optimized native binaries.
- **Multi-PHP management**: Switch PHP versions per site or globally with zero downtime.
- **Integrated tooling**: Bundles Composer, Node.js, NPM, and the `herd` CLI.
- **Herd Pro services**: Built-in GUI and process managers for MySQL, PostgreSQL, Redis, and Mailpit.
- **One-click TLS**: Generates and trusts local SSL certificates automatically via `herd secure`.

## Common CLI Commands

| Command                  | Description                                                    |
| ------------------------ | -------------------------------------------------------------- |
| `herd park`              | Register the current directory as a site root                  |
| `herd link [name]`       | Link the current directory to a specific `.test` domain        |
| `herd isolate [version]` | Pin a specific site to a PHP version (e.g. `herd isolate 8.4`) |
| `herd secure`            | Enable local HTTPS with auto-generated certificates            |
| `herd unsecure`          | Revert a site back to HTTP                                     |
| `herd php:list`          | List installed PHP runtimes                                    |

## Ecosystem Alternatives

- [[lerd]]: An open-source, rootless Podman-based alternative tailored for Linux (and macOS).
- **Laravel Sail**: Docker Compose-based environment included with Laravel.
- **Laravel Valet**: macOS-only background service runner powered by Homebrew.
