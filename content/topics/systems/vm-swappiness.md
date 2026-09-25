---
title: vm.swappiness
date: 2026-08-14
tags:
  - linux-systems
  - kernel-tunables
  - memory-managements
  - performance-tunings
---

**`vm.swappiness`** is a Linux kernel parameter (range `0`–`100`) that controls how eagerly the kernel moves memory pages to swap before it strictly has to. Higher values swap sooner and more aggressively, even when RAM isn't under real pressure; lower values only swap once RAM is nearly exhausted. Most distributions default to `60`.

## Checking and setting

```bash
# Read the current value
cat /proc/sys/vm/swappiness

# Apply immediately (does not persist across reboot)
sudo sysctl vm.swappiness=1

# Persist across reboots
echo 'vm.swappiness=1' | sudo tee /etc/sysctl.d/99-swappiness.conf
```

Files under `/etc/sysctl.d/*.conf` are read on every boot, so persisting a value there survives reboots without editing `/etc/sysctl.conf` directly.

## Zram changes the calculus

Swap is traditionally backed by disk, where minimizing swap activity matters because disk I/O is slow relative to RAM. **Zram** is different; it's a compressed block device carved out of RAM itself, used as swap. With Zram, swapping isn't "free" idle disk space; it's competing with the very RAM the system is trying to free up, and every page swapped costs CPU time to compress.

A high `swappiness` value with Zram means the kernel pushes pages into compressed swap unnecessarily early, burning CPU for no real benefit. Setting `vm.swappiness=1` ensures the kernel only swaps under genuine memory pressure; treating Zram as emergency headroom rather than a routine paging target.

## Related

- [[atime]]: another low-level kernel/filesystem tunable affecting write behavior
- [[btrfs]]: filesystem-level performance tuning
