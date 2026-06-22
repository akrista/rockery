---
title: ls
date: 2026-06-21
tags:
  - linux
  - command-line
  - filesystem
---

`ls` is a command available in [[Linux]] that lists files and directories in the current working directory.

## Common flags

| Flag | Description                                                                               |
| ---- | ----------------------------------------------------------------------------------------- |
| `-a` | Show hidden files (those starting with `.`)                                               |
| `-l` | Display files in long list format (permissions, owner, size, modification time)           |
| `-h` | Print file sizes in human-readable format (e.g., 1K, 234M, 2G) — typically used with `-l` |
| `-R` | Recursively list subdirectories                                                           |
| `-t` | Sort by modification time (newest first)                                                  |
| `-S` | Sort by file size (largest first)                                                         |

## Examples

```bash
ls -alh
```

Lists all files (including hidden) in a human-readable long format.

```bash
ls -lS /var/log
```

Lists files in `/var/log` sorted by size, largest first.
