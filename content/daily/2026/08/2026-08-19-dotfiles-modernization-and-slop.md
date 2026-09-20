---
title: "Modernizing .akrista Dotfiles & Initializing the Slop AI Toolbelt"
date: 2026-08-19
tags:
  - daily-notes
  - logs
  - projects
  - dotfiles
  - ai-tools
---

# Modernizing .akrista Dotfiles & Initializing the Slop AI Toolbelt / Modernizando .akrista Dotfiles e Iniciando el AI Toolbelt Slop

<details>
<summary><b>Read in English</b> (Click to expand)</summary>

Today, I executed a complete overhaul and standardization of the [[projects/dotfiles/|Akrista Dotfiles]] repository, synchronizing the dual-shell environment, securing credentials through a centralized symlink template pattern, and establishing the dedicated `slop` hub for my AI agent toolbelt and custom skills.

## 📝 Key Progress Updates

- **Full Bash & Zsh 1:1 Parity**: Rebuilt `.bashrc` from scratch to share identical features with `.zshrc` — including Oh My Posh (`lambdageneration.omp.json`), Zoxide smart `cd` navigation, modern CLI aliases (`eza`, `bat`, `nvim`, `g`), automated 24-hour update checks, and the `uak` updater function.
- **Runtimes & Package Managers**: Purged legacy NVM in favor of `fnm` (Fast Node Manager) configured for Node.js LTS (v24.19.0), installed Deno (v2.9.5) with dynamic shell completion generation, and integrated **Astral `uv`** (v0.12.5) for hermetic, ultra-fast Python tool and package management without system collisions.
- **Typography & UI**: Downloaded and deployed all 4 variants of **MesloLGS NF fonts** to `~/.local/share/fonts/` with rebuilt font cache (`fc-cache`).
- **Security & Centralized Symlink Pattern**: Implemented an untracked local override architecture for sensitive configurations. Private files (`settings.json`, `.env.local`, `.ssh/config.local`, `.gitconfig.local`, `opencode.json`) now reside locally in `.akrista/config/` and `.akrista/slop/` (gitignored) and are symlinked to their system locations, while Git only tracks sanitized `.example` templates.
- **SSH & Daemon Hardening**: Structured a modular OpenSSH client config with the `Include` directive, decoupled private server hosts, and created `99-hardening.conf` for `/etc/ssh/sshd_config.d/`.
- **Tooling Consolidation**: Migrated `zellij/config.kdl` into `config/zellij/`, streamlined Alacritty into base `alacritty.toml` + `alacritty.windows.toml`, added YouTube Enhancer settings, and added automated Docker `daemon.json` setup.
- **Dedicated AI Toolbelt (`slop/`)**: Created the dedicated top-level `slop/` directory in `.akrista` for declarative configuration of AI coding agents:
  - **Claude Code (`slop/claude/`)**: Configured with custom marketplaces (`wakatime`, `claudeline`, `ponytail`, `last30days-skill`), enabled plugins, custom base URL (`https://claude.notakrista.com/`), and dark fullscreen TUI (gitignored active file + tracked `.example`).
  - **OpenCode (`slop/opencode/`)**: Configured with active plugins (`opencode-wakatime`, `@tarquinen/opencode-dcp`, `@dietrichgebert/ponytail`) and local/remote MCP definitions.
  - **Shared MCP Templates (`slop/mcp/`)**: Curated reference catalog for stdio/SSE servers (Context7, DBHub, Astro, Svelte, Shadcn, NextJs, Metabase, Stitch).
- **Agent Skills Architecture**: Established a dual-tier skills system in `slop/`:
  - **Custom Skills (`slop/skills/custom/`)**: Personal handmade skills tracked directly in Git (e.g. `commit-steward`).
  - **Community Skills (`slop/.agents/skills/`)**: Third-party skills imported from `skills.sh` via `skills-cli` and reproducible via `skills-lock.json`.
  - **Automated Symlinking**: Configured `install.ps1` to link all custom and community skills to `~/.agents/skills/` and `~/.claude/skills/`.

> [!info] Project Impact
> All terminal sessions across Bash, Zsh, Zed, and AI agent CLI tools now share a consistent, secure, and reproducible environment that can be bootstrapped on any fresh Linux or Windows machine with `install.ps1`.

## 🔗 Related Notes

- [[projects/dotfiles/|Akrista Dotfiles Project Hub]] — full architecture overview
- [[topics/tools/|Developer Tools]] — developer tooling notes

</details>

<details>
<summary><b>Leer en Español</b> (Haz clic para expandir)</summary>

Hoy realicé una reestructuración y estandarización completa del repositorio de [[projects/dotfiles/|Akrista Dotfiles]], sincronizando el entorno de doble shell, asegurando credenciales mediante un patrón centralizado de plantillas y symlinks, y estableciendo el centro dedicado `slop` para mi conjunto de herramientas de agentes de IA y habilidades personalizadas.

## 📝 Actualizaciones Clave de Progreso

- **Paridad Total 1:1 entre Bash y Zsh**: Reconstruí `.bashrc` desde cero para compartir exactamente las mismas funcionalidades que `.zshrc`: Oh My Posh (`lambdageneration.omp.json`), navegación inteligente con Zoxide (`cd`), alias modernos (`eza`, `bat`, `nvim`, `g`), verificación automática de actualizaciones cada 24 horas y la función `uak`.
- **Entornos de Ejecución y Gestores**: Eliminé NVM heredado en favor de `fnm` (Fast Node Manager) configurado para Node.js LTS (v24.19.0), instalé Deno (v2.9.5) con generación dinámica de autocompletado en Zsh/Bash, e integré **Astral `uv`** (v0.12.5) para gestión hermética y ultrarrápida de paquetes y herramientas Python sin colisiones del sistema.
- **Tipografía e Interfaz**: Descargué e instalé las 4 variantes de las fuentes **MesloLGS NF** en `~/.local/share/fonts/` y reconstruí la caché de fuentes con `fc-cache`.
- **Seguridad y Patrón Centralizado de Symlinks**: Implementé una arquitectura de sobrescritura local para configuraciones sensibles. Los archivos privados (`settings.json`, `.env.local`, `.ssh/config.local`, `.gitconfig.local`, `opencode.json`) ahora residen localmente en `.akrista/config/` y `.akrista/slop/` (ignorados por Git) y se enlazan simbólicamente a sus rutas del sistema, mientras que Git solo rastrea plantillas `.example` sanitizadas.
- **SSH y Fortalecimiento del Demonio**: Estructuré la configuración del cliente OpenSSH con la directiva `Include`, desacoplé los hosts privados del repositorio y creé `99-hardening.conf` para `/etc/ssh/sshd_config.d/`.
- **Consolidación de Herramientas**: Migré `zellij/config.kdl` dentro de `config/zellij/`, simplifiqué Alacritty en un `alacritty.toml` base + `alacritty.windows.toml`, agregué la configuración de YouTube Enhancer y la configuración automatizada de `daemon.json` para Docker.
- **AI Toolbelt Dedicado (`slop/`)**: Creé el directorio raíz dedicado `slop/` en `.akrista` para la configuración declarativa y manual de los agentes de codificación de IA:
  - **Claude Code (`slop/claude/`)**: Configurado con marketplaces personalizados (`wakatime`, `claudeline`, `ponytail`, `last30days-skill`), plugins habilitados, URL base personalizada (`https://claude.notakrista.com/`) y TUI a pantalla completa (archivo activo ignorado + `.example` en Git).
  - **OpenCode (`slop/opencode/`)**: Configurado con plugins activos (`opencode-wakatime`, `@tarquinen/opencode-dcp`, `@dietrichgebert/ponytail`) y definiciones MCP locales y remotas.
  - **Plantillas MCP Compartidas (`slop/mcp/`)**: Catálogo de referencia curado para servidores stdio/SSE (Context7, DBHub, Astro, Svelte, Shadcn, NextJs, Metabase, Stitch).
- **Arquitectura de Habilidades de Agentes**: Establecí un sistema de habilidades de dos niveles en `slop/`:
  - **Habilidades Personalizadas (`slop/skills/custom/`)**: Habilidades propias rastreadas directamente en Git (ej. `commit-steward`).
  - **Habilidades Comunitarias (`slop/.agents/skills/`)**: Habilidades de terceros importadas de `skills.sh` mediante `skills-cli` y reproducibles mediante `skills-lock.json`.
  - **Symlinks Automatizados**: Configuré `install.ps1` para enlazar todas las habilidades a `~/.agents/skills/` y `~/.claude/skills/`.

> [!info] Impacto del Proyecto
> Todas las sesiones de terminal en Bash, Zsh, Zed y herramientas CLI de agentes de IA ahora comparten un entorno consistente, seguro y reproducible que se puede instalar en cualquier máquina nueva con `install.ps1`.

## 🔗 Notas Relacionadas

- [[projects/dotfiles/|Centro de Proyecto Akrista Dotfiles]] — vista general de la arquitectura
- [[topics/tools/|Herramientas de Desarrollo]] — notas de herramientas de desarrollo

</details>
