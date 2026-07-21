---
title: notakrista.com
date: 2026-07-04
tags:
  - project
  - portfolio
  - laravel
  - web-development
---

# notakrista.com

A unified personal brand, landing page, and application hub for Jorge Thomas (akrista). This project consolidates standalone tools and profiles into a single production application built with Laravel, replacing the previous Astro-based architecture.

## Overview

The primary goal of `notakrista.com` is to serve as the canonical entry point for my online identity, hosting tools, project showcases, and personal support pages.

Due to structural damages sustained during the 2026-06-24 earthquake in Venezuela, the site will prominently feature a dedicated funding and support section to coordinate donations.

Additionally, the project involves migrating and consolidating existing standalone tools—such as the Todoticket calculator currently built in Astro—into a single Laravel backend to simplify deployment and maintenance.

## Goals

### P0 — Critical & Immediate

- [ ] **Donations & Support Section**: Add a clear, accessible section to coordinate financial assistance for home repair following the 2026-06-24 earthquake.
- [ ] **Laravel Foundation Setup**: Initialize the new Laravel project codebase and configure deployment to the Contabo VPS (`notakrista`).

### P1 — Core Features

- [ ] **Personal Brand Landing Page**: Design and implement a modern, responsive landing page detailing professional experience and skills.
- [x] **Migrate Todoticket Calculator**: Port the Todoticket calculator logic from Astro into a Laravel controller/view.
- [ ] **Project Showcase Directory**: Create a page/section dynamically highlighting public and private personal projects.

### P2 — Enhancements

- [ ] **Private Projects Gateway**: Set up secure access rules or portals for managing personal/private utility apps.
- [ ] **Analytics & Tracking**: Implement lightweight privacy-focused analytics to monitor page traffic.

## Architecture / Tech Stack

- **Framework**: Laravel (PHP)
- **Styling**: Tailwind CSS or Vanilla CSS (to be confirmed)
- **Deployment Host**: Contabo VPS (`notakrista`)
- **Legacy Stack (to be migrated)**: Astro (static/SSG)

## Progress

### 2026-07-21

- Successfully migrated the Todoticket calculator to Laravel at [todoticket](https://www.notakrista.com/todoticket).

### 2026-07-04

- Initiated the project organization and drafted the initial project outline.
- Defined the target stack transition from Astro to Laravel.
- Prioritized the earthquake relief donation section as the primary immediate milestone.

## Related

- [[infrastructure-tuning]] — Contabo VPS deployment host environment
- [[laravel]] — Laravel development guide
