---
title: cp
date: 2026-06-21
tags:
  - linux
  - command-line
  - filesystem
---

`cp` is a [[Linux]] command that copies files and directories.

## Common flags

| Flag | Description                                                                                                                          |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `-a` | Archive mode — preserves permissions, timestamps, ownership, and copies directories recursively (equivalent to `-dR --preserve=all`) |
| `-r` | Recursively copy directories                                                                                                         |
| `-v` | Verbose — print what is being copied                                                                                                 |
| `-i` | Interactive — prompt before overwriting                                                                                              |
| `-u` | Copy only when the source is newer than the destination                                                                              |
| `-p` | Preserve file attributes (mode, ownership, timestamps)                                                                               |

## Examples

```bash
cp -a /source/dir /destination/dir
```

Recursively copies `/source/dir` to `/destination/dir` while preserving all file attributes.

```bash
cp -iv file.txt backup/
```

Copies `file.txt` to `backup/` with verbose output and a confirmation prompt before overwriting.
