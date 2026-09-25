---
title: Masonite Starter Kit
date: 2026-08-17
tags:
  - projects
  - python
  - masonite
  - starter-kit
  - backend
  - mvc
---

## Overview

The **Masonite Starter Kit** is our Python counterpart to [[bizkit]], bringing the same high-ergonomics, batteries-included philosophy to the Python web ecosystem. Built on [Masonite Framework](https://docs.masoniteproject.com/), it uses Masonite's expressive MVC structure, IoC service container, `craft` CLI, and active record ORM to create an opinionated baseline for full-stack and API development in Python.

## Architecture & Tech Stack

| Layer                   | Component                           | Description                                                               |
| :---------------------- | :---------------------------------- | :------------------------------------------------------------------------ |
| **Framework & Runtime** | **Masonite 4+ (Python 3.12+)**      | Full-stack MVC framework with dependency injection and IoC container.     |
| **CLI & Scaffolding**   | **`craft` CLI**                     | Code generation, migration runners, and artisan-like dev tooling.         |
| **Database & ORM**      | **Masonite ORM**                    | Expressive active-record ORM supporting PostgreSQL, MySQL, and SQLite.    |
| **Authentication**      | **Masonite Auth & Guards**          | Session and token-based authentication, password resets, and RBAC guards. |
| **Background Jobs**     | **Masonite Queues (Redis)**         | Asynchronous task processing and scheduled task execution.                |
| **Frontend & Assets**   | **Vite + Tailwind CSS + Alpine.js** | Modern asset pipeline with lightweight client reactivity.                 |
| **API Documentation**   | **OpenAPI / Swagger**               | Automated interactive API documentation for RESTful endpoints.            |
| **Quality & Linting**   | **Ruff, Pyright, Pytest**           | Instant linting/formatting via Ruff, static typing, and test suite.       |
| **Containerization**    | **Docker (ASGI/WSGI)**              | Production container deployment with Gunicorn / Uvicorn.                  |

## Feature Alignment with Bizkit

| Feature                 | Bizkit (Laravel)        | Masonite Starter Kit (Python)      |
| :---------------------- | :---------------------- | :--------------------------------- |
| **CLI Generator**       | `php artisan`           | `craft`                            |
| **ORM**                 | Eloquent                | Masonite ORM                       |
| **Queues / Jobs**       | Horizon + Redis         | Masonite Queue + Redis             |
| **Frontend Bridge**     | Livewire 4 + Flux UI    | Vite + Tailwind + Alpine.js / HTMX |
| **API Docs**            | Dedoc Scramble + Scalar | OpenAPI / Swagger Generator        |
| **Formatting / Linter** | Laravel Pint + Rector   | Ruff                               |
| **Testing**             | Pest PHP                | Pytest                             |

## Goals

- [ ] **Repository Scaffolding**: Bootstrap the foundational Masonite project structure with modular configurations.
- [ ] **Auth & Permission Guards**: Build authentication scaffolding with role/permission middleware.
- [ ] **Asset Pipeline**: Configure Vite for asset compilation with Tailwind CSS and Alpine.js.
- [ ] **Queue & Worker Orchestration**: Provide pre-configured Redis queue worker and scheduler containers.
- [ ] **Developer Quality Baseline**: Enforce Ruff formatting, Pyright type checking, and Pytest coverage in CI.
- [ ] **Docker Production Blueprint**: Deliver optimized multi-stage Docker build for self-hosted deployment.

## Progress

### 2026-08-17

- Created the Masonite Starter Kit project roadmap and architecture blueprint in Rockery.
- Defined parity roadmap aligning features with the Bizkit (Laravel) starter kit.

## Related

- [[bizkit]]: Laravel starter kit counterpart
- [[dotfiles]]: Unified development toolbelt and workstation setup
- [[workspace-standardization]]: Standardizing developer workstations and AI-agent workflows
