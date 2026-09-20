---
title: Bizkit Starter Kit
date: 2026-08-17
tags:
  - projects
  - laravel
  - starter-kit
  - php
  - livewire
  - octane
---

## Overview

**Bizkit** is our batteries-included [Laravel](https://laravel.com) starter kit, designed to serve as a complete, robust baseline for rapidly bootstrapping production-ready web applications. It pairs modern reactivity and developer ergonomics with high-performance real-time infrastructure and team-scoped authorization.

The repository lives at [`github.com/akrista/bizkit`](https://github.com/akrista/bizkit).

## Architecture & Tech Stack

| Layer                  | Component                        | Description                                                        |
| :--------------------- | :------------------------------- | :----------------------------------------------------------------- |
| **Runtime & Server**   | **Laravel Octane + FrankenPHP**  | High-performance application worker serving.                       |
| **Real-time & Queues** | **Laravel Reverb & Horizon**     | Native WebSocket broadcasting and Redis queue management.          |
| **Observability**      | **Laravel Pulse**                | Real-time performance, query, and system monitoring.               |
| **Authentication**     | **Laravel Fortify**              | Registration, 2FA (TOTP/recovery codes), and WebAuthn/Passkeys.    |
| **Authorization**      | **Spatie Laravel Permission**    | Tenancy-aware, team-scoped role and permission enforcement.        |
| **Frontend & UI**      | **Livewire v4 + Flux UI**        | Server-driven reactive interface with Tailwind CSS v4.             |
| **API & Docs**         | **Dedoc Scramble & Scalar**      | Zero-config OpenAPI generation and interactive documentation.      |
| **Quality & Tests**    | **Pest, Pint, Rector, Larastan** | Automated test suite, strict static analysis, and code formatting. |
| **Deployment**         | **Containerized Docker**         | Multi-stage Alpine image with FrankenPHP and Supercronic.          |

## Key Subsystems

### Team-Scoped Authorization

Bizkit implements a hybrid, team-scoped authorization layer built on Spatie Laravel Permission:

- **Gate-Level Scoping**: Intercepts authorization via `Gate::before` to scope all `$user->can()` checks to the active team (`current_team_id`).
- **Super Admin Bypass**: Seamlessly grants full access to configured admin emails or users possessing the Spatie `admin` role.
- **Dynamic Policy & Permission Sync**: Built-in Artisan commands (`bizkit:sync-permissions`, `bizkit:generate-policies`) to keep database permissions and policies in sync.

### Upstream Upgrade System

Maintains clean separation between starter kit core updates and downstream application logic, allowing applications to pull template updates safely.

## Goals

- [ ] **Upstream Upgrade Automation**: Refine synchronization workflow to pull upstream Laravel & starter-kit improvements cleanly.
- [ ] **Policy & Permission Scaffolding**: Expand custom stubs for granular resource policies and team-permission mappings.
- [ ] **Pest Test Suite Parity**: Maintain 100% test coverage for Fortify auth flows, passkeys, and team permission isolation.
- [ ] **Production Docker Recipes**: Provide tested deployment manifests for Laravel Cloud and self-hosted VPS setups.

## Progress

### 2026-08-17

- Initialized Bizkit project documentation in Rockery.
- Documented full stack architecture (Octane, Reverb, Fortify, Spatie Permission, Livewire 4, Flux UI).

## Related

- [[dotfiles]] — Tooling and environment replication across operating systems
- [[workspace-standardization]] — Standardizing developer workstations and AI-agent workflows
- [[masonite-starter-kit]] — Python counterpart starter kit built on Masonite
- [[infrastructure-tuning]] — Server infrastructure and tuning
