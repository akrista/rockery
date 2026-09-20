---
title: Infrastructure Tuning
date: 2026-08-22
tags:
  - infrastructures
  - sysctl
  - performance
  - linux
  - containers
  - networking
---

# Infrastructure Tuning

Standard performance tunables, kernel parameters, and container engine configurations optimized for multi-tool developer workstations and production Linux hosts.

## Kernel & Sysctl Tunables

Developer workstations running multiple IDE instances, bundlers (Vite, esbuild), and container runtimes frequently encounter file descriptor and watcher exhaustion.

```ini
# /etc/sysctl.d/99-dev-tuning.conf

# File Watchers & Descriptors (prevents ENOSPC during builds)
fs.inotify.max_user_watches = 524288
fs.inotify.max_user_instances = 512
fs.file-max = 2097152

# Memory & VFS Management
vm.swappiness = 10
vm.vfs_cache_pressure = 50

# TCP Congestion & Networking
net.core.default_qdisc = fq
net.ipv4.tcp_congestion_control = bbr
net.ipv4.ip_unprivileged_port_start = 80
```

> [!tip] TCP BBR
> **BBR** (Bottleneck Bandwidth and RTT) optimizes throughput over high-latency and packet-loss-prone links compared to the traditional loss-based **Cubic** algorithm.

## Container Runtimes: Podman vs Docker

Configuration approaches differ based on daemon architecture:

| Aspect              | Docker (`daemon.json`)                 | Podman (`containers.conf`)                    |
| ------------------- | -------------------------------------- | --------------------------------------------- |
| **Architecture**    | Central root daemon                    | Daemonless rootless engine                    |
| **Config Location** | `/etc/docker/daemon.json`              | `~/.config/containers/containers.conf`        |
| **Log Capping**     | `"max-size": "10m"`, `"max-file": "3"` | `log_size_max = 10485760`                     |
| **Socket Support**  | `dockerd.service`                      | `systemctl --user enable --now podman.socket` |

### Podman Configuration

```toml
# ~/.config/containers/containers.conf
[engine]
log_size_max = 10485760
log_driver = "k8s-file"
events_logger = "file"
```

## Memory Compression: ZRAM

On systems with 16 GB RAM, heavy multitasking spikes can cause disk swap thrashing. **ZRAM** allocates a compressed block device in RAM (using `zstd` algorithm) with higher priority than disk swap.

```bash
# Install and configure ZRAM on Debian/Ubuntu
sudo apt install zram-tools

# /etc/default/zramswap
ALGO=zstd
PERCENT=50
PRIORITY=100

sudo systemctl restart zramswap.service
```

> [!info] Swap Priority
> Setting `PRIORITY=100` ensures pages are compressed into fast in-RAM ZRAM before hitting slower NVMe/SSD swap partitions (`PRIORITY=-2`).

## Related

- [[linux-router]] — Linux routing and network utilities
- [[notakrista-com]] — Contabo VPS infrastructure and deployment
- [[ssh-config]] — OpenSSH client and daemon tuning
