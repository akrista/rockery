---
title: Workspace Standardization
date: 2026-08-14
tags:
  - projects
  - dotfiles
  - ai-agents
  - self-hosting
---

## Overview

This project tracks the long-term objective of standardizing a multi-environment, multi-server workspace so that communicating with any of it — and running multiple AI coding agents across multiple projects at once — becomes effortless rather than something to reconfigure per host or per tool. It's the layer above [[infrastructure-tuning]]: that project tunes the two personal servers themselves, while this one is about the toolbelt, connectivity, and AI-agent workflow spanning every environment.

Success looks like: sitting down at any laptop, reaching any server with the same muscle memory, and delegating work to whichever AI agent fits the task — without spending time re-authenticating, re-configuring, or context-switching between tools that overlap in capability.

## Environments

**Workspace laptops**

- Windows laptop
- Debian laptop

**Personal servers** (see [[infrastructure-tuning]] for hardware/tuning detail)

- `notakrista` — Contabo VPS, public-facing gateway
- `monolith` — home server, Docker host

**Mobile devices**

- Redmi Note 13 Pro 5G (`garnet`) — Android 16 / LineageOS 23.2, wireless ADB / scrcpy workflow, Termux environment integrated with `.akrista` dotfiles (see [[redmi-note-13-pro-5g]])

## Goals

- [ ] Standardize dotfiles/config across every environment via the toolbelt repos below (`.akrista`, `nvim`, `pwsh-pf`, `selfhost`)
- [ ] Fix the Bitwarden SSH agent gap in non-native shells (see [[bitwarden-ssh-agent]]) so any tool, on any host, can authenticate the same way
- [ ] Stand up OpenCode as a headless service (systemd) for remote, always-on access — work across multiple projects with different agents concurrently, without a terminal session tied to one laptop
- [ ] Settle a clear lane per AI tool (see below) instead of switching between them ad hoc
- [ ] Showcase parts of this setup publicly — this blog (Rockery) and notakrista.com

## Toolbelt repos

All under `github.com/akrista`:

| Repo                | Purpose                                                      |
| ------------------- | ------------------------------------------------------------ |
| `.akrista`          | Dotfiles                                                     |
| `nvim`              | Editor config                                                |
| `pwsh-pf`           | PowerShell profile                                           |
| `selfhost`          | Self-hosting configs                                         |
| `notakrista.com`    | Personal site/blog                                           |
| `claude-code-proxy` | Claude Code proxy, run on the Contabo VPS / personal servers |

## Networking

All servers are already connected via Newt/Pangolin tunnels — see [[network]] for the current geography-based IPAM scheme (Venezuela-based vs. outside-Venezuela node-id bands). Mullvad VPN is used to reach services blocked in Venezuela. Bitwarden Desktop is the standard SSH agent across workspace laptops, though it has a known gap in non-native shells — see [[bitwarden-ssh-agent]].

**Pangolin as a mesh VPN**: beyond the reverse-proxy-ingress model already documented in [[infrastructure-tuning]], Pangolin also has a client mode that provides secure mesh-like VPN connectivity directly — already in use for short test connections to remote OpenCode instances. A dedicated Tailscale/Headscale layer is very likely unnecessary given this. Caveats to check near-term (not yet identified in detail).

**`mosh`**: already in use via a separate self-hosted service, Termix, on the Contabo VPS. Confirmed gap: no native Windows client, so the Windows laptop would need WSL or an alternative client to use it directly — worth keeping in mind rather than assuming it drops in cleanly everywhere.

## AI agent roster

Currently in active use: **Claude Code**, **OpenCode**, **Google Antigravity**, and **Pi Agent**.

> [!todo] Assign each tool a clear lane by task type, rather than switching between them ad hoc for the same kind of work. Current thinking:
>
> - **Claude Code** — daily driver for reasoning-heavy work: infra debugging, cross-repo work, this PKB.
> - **OpenCode** — the always-on layer once headless via systemd: background/scheduled jobs, remote access from any laptop to work already in progress.
> - **Antigravity** — front-end-heavy or greenfield work where its browser subagent (real in-browser testing/QA) pays off — e.g. notakrista.com.
> - **Pi Agent** — minimal, hackable, TypeScript-extensible — best suited to building custom tooling/skills tied into the toolbelt repos rather than general-purpose coding.

This is a working hypothesis, not a settled decision — revisit as the OpenCode systemd setup and the rest of the toolbelt standardization actually happen.

## Open questions / candidates to evaluate

Not yet decided, revisit later:

- **Dotfiles templating** — `chezmoi` could let one dotfiles repo (`.akrista`) apply differently per-OS/per-host instead of maintaining parallel configs by hand. Not yet evaluated.
- **Declarative provisioning** — Ansible vs. OpenTofu/Terraform for actually enforcing standardization across hosts, rather than manually cloning repos onto each new machine. Undecided — Ansible's per-host Python version/interpreter management is the specific concern holding this back. Worth trying if a clean approach to that surfaces.
- **Pangolin mesh-client caveats** — already using Pangolin's client mode for direct mesh-like connections (e.g. short test connections to remote OpenCode instances), separate from its reverse-proxy ingress role. Caveats mentioned but not yet identified in detail — check near-term.

## Progress

### 2026-08-14

- Captured the current environment inventory, toolbelt repos, and AI agent roster as a starting point.
- Corrected course on tooling recommendations after discussion: Pangolin already covers mesh VPN connectivity (a dedicated Tailscale/Headscale layer is likely unnecessary), and `mosh` is already in use via Termix on the Contabo VPS (with a known no-native-Windows-client gap). `chezmoi` and Ansible/OpenTofu remain open, unevaluated candidates — see below.

## Related

- [[dotfiles]] — Unified dotfiles ecosystem and multi-OS installer consolidation
- [[bizkit]] — Batteries-included Laravel starter kit
- [[masonite-starter-kit]] — Modern Python MVC starter kit
- [[infrastructure-tuning]] — tuning for the two personal servers this project sits above
- [[network]] — Pangolin tunnel and Docker subnet map
- [[bitwarden-ssh-agent]] — the SSH agent standard used across workspace laptops, and its known gap
- [[redmi-note-13-pro-5g]] — primary mobile developer environment and hardware audit
