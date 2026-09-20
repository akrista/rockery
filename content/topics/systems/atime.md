---
title: atime, relatime, and noatime
date: 2026-08-14
tags:
  - linux-systems
  - filesystems
  - mount-options
  - performance-tunings
---

**`atime`** (access time) is a filesystem timestamp recording when a file was last read — distinct from `mtime` (last modified) and `ctime` (last metadata change). Mount options control how eagerly the kernel updates it, trading write overhead for timestamp accuracy few applications actually rely on.

## Mount options

| Option        | Behavior                                                                                                                           |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `strictatime` | Updates atime on every single read — full POSIX compliance, highest write overhead                                                 |
| `relatime`    | Updates atime only if the previous atime is older than mtime, or hasn't been updated in over a day — most distros' current default |
| `noatime`     | Never updates atime on reads — no write overhead from reads at all                                                                 |

`relatime` is already a compromise over strict POSIX behavior, but it still writes to disk periodically purely from reading files. `noatime` eliminates that entirely. Almost nothing on a typical server depends on accurate atime — a handful of niche tools (`mutt`'s new-mail detection, some old cache-eviction scripts) do, but nothing in a typical Docker/database/media-serving stack cares.

## Applying via fstab

Mount options live in the fourth field of each `/etc/fstab` line, comma-separated with any existing options (e.g. Btrfs `subvol=` or `compress=`):

```conf
UUID=... / btrfs subvol=root,compress=zstd:3,noatime 0 0
```

```bash
# Back up first
sudo cp /etc/fstab /etc/fstab.bak

# Edit /etc/fstab to add noatime to the relevant lines, then remount live — no reboot needed
sudo mount -o remount /
sudo mount -o remount /home

# Verify
mount | grep -E "on / |on /home"
```

> [!warning] Don't blindly text-substitute `relatime` → `noatime` across `/etc/fstab`. Many fstab lines don't contain the literal word `relatime` at all — `defaults`, or a Btrfs line listing only `subvol=`/`compress=`, both fall back to the kernel's implicit `relatime` default without the word ever appearing in the file. Read the actual file before editing it; a blind substitution can be a silent no-op or hit unintended lines.

## Related

- [[vm-swappiness]] — another kernel/mount tunable trading write overhead for a rarely-needed guarantee
- [[btrfs]] — filesystem this option is commonly combined with
