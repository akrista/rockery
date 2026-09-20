---
title: "Akrista Dotfiles & AI Toolbelt"
description: Complete architecture, cross-platform configuration, and AI agent toolbelt for the .akrista ecosystem
date: 2026-08-19
tags:
  - projects
  - dotfiles
  - tooling
  - ai-agents
---

# 🛠️ Akrista Dotfiles & Slop AI Toolbelt

The `.akrista` repository is the unified, cross-platform configuration hub powering my developer environments across Debian/Ubuntu Linux, Android (Termux), and Windows.

---

## 🏛️ Core Architecture

```
~/.akrista/
├── config/                      # Traditional tools & shell configurations
│   ├── alacritty/               # Terminal emulator (MesloLGS NF, Monokai Pro / Gruvbox)
│   ├── bash/                    # 1:1 synchronized .bashrc with Zsh
│   ├── docker/                  # daemon.json log-rotation and live-restore
│   ├── enhancer-for-youtube/    # Custom browser player settings & theme
│   ├── env/                     # .env.local machine-specific environment overrides
│   ├── ghostty/                 # Ghostty terminal configuration
│   ├── git/                     # Base .gitconfig + .gitconfig.local
│   ├── omp/                     # Oh My Posh lambdageneration theme
│   ├── oxker/                   # Docker/Podman TUI container manager
│   ├── sqlite/                  # .sqliterc prompt & column formatting
│   ├── ssh/                     # Modular OpenSSH Include configuration + config.local
│   ├── sshd/                    # 99-hardening.conf server daemon security
│   ├── termux/                  # Android Termux customizations
│   ├── tmux/                    # .tmux.conf + TPM plugins
│   ├── zed/                     # Zed Editor settings.json template & MCP servers
│   ├── zellij/                  # Zellij terminal workspace multiplexer
│   └── zsh/                     # .zshrc, .zshenv, aliases, prompt, functions (uak)
├── slop/                        # Dedicated AI Agent Toolbelt & Skills Hub
│   ├── claude/                  # Claude Code settings.json (gitignored) + settings.json.example
│   ├── opencode/                # OpenCode opencode.json (gitignored) + opencode.json.example
│   ├── mcp/                     # Shared MCP catalog & server definitions (servers.json.example)
│   ├── skills/
│   │   ├── custom/              # 🛠️ Handmade custom skills (Tracked in Git)
│   │   └── README.md            # Skills authoring guide
│   ├── .agents/skills/          # 📥 Third-party skills from skills.sh (Tracked via skills-lock.json)
│   ├── skills-lock.json         # 🔒 Skills lockfile for reproducible deployments
│   ├── agy/                     # Antigravity CLI global rules & skills
│   ├── pi/                      # Pi Coding Agent configurations
│   └── README.md                # AI Toolbelt architecture overview
└── install.ps1                  # Polyglot Bash/PowerShell cross-platform automated installer
```

---

## 🔒 The Centralized Symlink Template Pattern

To prevent private credentials (API keys, SSH hosts, proxy URLs, database connection strings) from being tracked by Git while keeping everything organized in a single repository:

1. **Templates in Git**: Clean `.example` files (`settings.json.example`, `.env.local.example`, `config.local.example`, `opencode.json.example`) are tracked in Git.
2. **Local Active Files**: Real working files (`settings.json`, `.env.local`, `config.local`, `opencode.json`) live directly inside `.akrista/config/` and `.akrista/slop/` but are **ignored by `.gitignore`**.
3. **OS Symlinks**: System target paths (`~/.config/zed/settings.json`, `~/.config/opencode/opencode.json`, `~/.claude/settings.json`, `~/.env.local`, `~/.ssh/config.local`) are symlinked directly to their centralized `.akrista` paths.

---

## 🧠 Agent Skills Architecture

Skills are synchronized globally across all AI tools:

- **Custom Skills (`slop/skills/custom/`)**: Personal prompt recipes and operational workflows written in standard `SKILL.md` format.
- **Community Skills (`slop/.agents/skills/`)**: Third-party skills pulled from `skills.sh` via `npx skills-cli add` and locked in `skills-lock.json`.
- **Universal Deployment**: `install.ps1` automatically links all skills into `~/.agents/skills/` (Universal root) and `~/.claude/skills/`.

---

## 🔗 Related Daily Notes

- [[daily/2026/08/2026-08-19-dotfiles-modernization-and-slop|2026-08-19 — Overhaul of Dotfiles & Slop AI Toolbelt]]
