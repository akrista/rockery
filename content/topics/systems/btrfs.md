---
title: Btrfs
date: 2026-08-14
tags:
  - linux-systems
  - filesystems
  - storage
  - performance-tunings
---

**Btrfs** (B-tree filesystem) is a copy-on-write Linux filesystem offering subvolumes, snapshots, and transparent compression as native features, rather than layered on top like LVM+ext4 setups.

## Subvolumes

A single Btrfs partition can host multiple independently-mountable **subvolumes**; lightweight, snapshot-friendly divisions of the filesystem that share the same underlying block device:

```conf
UUID=... / btrfs subvol=root,compress=zstd:3,noatime 0 0
UUID=... /home btrfs subvol=home,compress=zstd:3,noatime 0 0
```

Both lines above reference the same `UUID` (same physical partition) but mount different subvolumes (`root`, `home`) at different mount points.

## Transparent compression

Btrfs can compress data as it's written, via the `compress=<algorithm>:<level>` mount option:

```conf
compress=zstd:3
```

- **`zstd`** is the recommended modern algorithm; good balance of speed and ratio, and notably _asymmetric_: decompression cost barely changes across levels, only the write side gets more expensive at higher levels.
- The level (`1`–`15` in practice) trades write-side CPU cost for compression ratio. Because reads stay cheap regardless of level, bumping the level mostly costs write-time CPU, not read latency.
- **Changing the mount option only affects new writes.** Existing data on disk keeps whatever compression level it was originally written with; it isn't retroactively recompressed. An explicit `btrfs filesystem defragment -r -czstd /` (a heavier operation) is needed to recompress data already on disk.

## Common commands

```bash
# Show space usage by block type (data, metadata, system)
sudo btrfs filesystem df /

# Recompress existing data at a given level (heavier operation)
sudo btrfs filesystem defragment -r -czstd /
```

## When compression helps vs. hurts

Compression trades CPU cycles for reduced disk I/O. On I/O-bound workloads (most Docker/database/media-serving traffic), it usually improves effective throughput; moving fewer bytes to/from disk outweighs the CPU cost. On genuinely CPU-bound workloads, it can add overhead since compression steals cycles that have nowhere to spare. Check actual CPU headroom (`docker stats`, `top`) before assuming either direction.

## Related

- [[atime]]: commonly combined with `compress=` in the same fstab mount options
- [[vm-swappiness]]: another performance tunable trading CPU for I/O/memory behavior
