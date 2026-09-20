---
title: Infrastructure Tuning
date: 2026-06-21
tags:
  - project
  - home-server
  - vps
  - performance
---

# Infrastructure Tuning

This project focuses on min-maxing and optimizing a home server (`monolith`) and a cloud VPS (`notakrista`) for maximum resource efficiency, throughput, and stability.

## Infrastructure Overview

### Home Server: `monolith`

- **Hardware**: HP Z220 SFF Workstation
- **CPU**: Intel Xeon E3-1225 V2 (4 cores) @ 3.60 GHz
- **GPU**: Intel Xeon E3-1200 v2 Integrated GPU
- **RAM**: 15.48 GiB
- **Swap**: 7.74 GiB (Zram, zstd compression, 1.2 GiB used)
- **Swappiness**: `100` (too high for Zram — should be 1–10)
- **TCP**: `cubic` + `fq_codel` (should be `bbr` + `fq`)
- **Storage**:
  - `/`: 296.50 GiB (Btrfs, compress=zstd:1, relatime)
  - `/boot`: 974 MiB (Ext4, relatime)
  - `/home/akrista/NAS`: 915.82 GiB (Ext4, relatime)
- **OS**: Fedora Linux 44 (Workstation Edition)
- **Primary Role**: Local storage, media streaming, and Docker host for internal services.
- **Docker**: 24 containers (as of 2026-08-13) — \*arr stack, databases (MSSQL, MariaDB, MongoDB, PostGIS, Valkey, RustFS), Pi-hole, qBittorrent, Syncthing, Excalidraw, ASF, Newt, Endlessh, Hawser Agent, Promtail, and the `notakrista-com` Laravel app (app/horizon/scheduler). **NPM and Glance are no longer running** — unclear if intentionally decommissioned or just down; needs confirmation.

### Cloud VPS: `notakrista`

- **Host**: Contabo VPS (KVM/QEMU Standard PC)
- **CPU**: AMD EPYC (8 vCPUs) @ 2.50 GHz
- **RAM**: 23.47 GiB
- **Swap**: Disabled (swapfile.img commented out in `/etc/fstab`)
- **TCP**: `cubic` + `fq_codel` (should be `bbr` + `fq`)
- **Storage**: 193.83 GiB (Ext4, relatime)
- **Overlay**: Pangolin tunnel active (`pangolin` interface at 100.90.128.6/24)
- **OS**: Debian GNU/Linux 12 (bookworm)
- **Primary Role**: Public-facing gateway, reverse proxy, and external-facing service runner.
- **Docker**: 23 containers — Traefik, Pangolin stack, Immich, Metabase, OpenWebUI, NocoDB, Docuseal, N8N, Bytebase, Syncthing, Glance, PostGIS, MariaDB, Valkey, Newt, Endlessh, Dockhand

## Quick Wins (ordered by impact)

### P0 — Critical

- [x] **Fix swappiness on monolith**: `vm.swappiness = 1` — done 2026-08-13 (`sysctl` applied + persisted via `/etc/sysctl.d/99-swappiness.conf`)
- [ ] **Add swap on VPS**: Uncomment or recreate `/swapfile.img` (4GB). Currently no swap at all — OOM risk.

### P1 — High Impact

- [x] **Switch monolith to BBR + fq**: done 2026-08-13 (`tcp_bbr` module loaded, `sysctl` applied + persisted via `/etc/sysctl.d/99-bbr.conf`)
- [ ] **Switch VPS (`notakrista`) to BBR + fq**: still `cubic` + `fq_codel` — not yet applied
- [x] **Add `noatime` to monolith data mounts**: done 2026-08-13 — `/`, `/home`, and `/home/akrista/NAS` all confirmed `noatime` via `/etc/fstab` edit + live remount
- [ ] **Add `noatime` to VPS (`notakrista`) `/`**: still `relatime` — not yet applied

### P2 — Medium

- [x] **Route VPS→monolith over existing Pangolin overlay**: confirmed done — monolith uses Newt to expose all its services through `notakrista.com` via Pangolin. The failed ping/interface test earlier was a red herring; Newt's tunnel model doesn't work like a raw routable L3 WireGuard mesh, so that wasn't a valid test.
- [x] **Recreate Docker subnets**: done — see updated geography-based scheme in [[network]] (monolith = node-id `10`, `notakrista` VPS = node-id `100`)
- [ ] **Export OpenWebUI chats & decommission**: Export history, then remove container from VPS to free up RAM.
- [x] **Replace NPM on Monolith**: NPM decommissioned 2026-08-13. Traefik is not needed on monolith — Newt handles ingress directly via the Pangolin tunnel, no local reverse proxy required.
- [ ] **Set Docker resource limits**: MSSQL on monolith has a 3GB limit using 1GB; Metabase on VPS is at 54% of its 2GB limit.

### P3 — Nice to have

- [x] **Bump Btrfs compression to `zstd:3`**: done 2026-08-14 — confirmed via `mount` on `/` and `/home`. Only affects new writes going forward; existing data keeps its original `zstd:1` compression until rewritten.
- [x] **Tune Docker log rotation**: done — a shared `x-logging: &default-logging` anchor (`json-file`, `max-size: 10m`, `max-file: 3`, `compress: true`) is already applied across compose files.

## Progress

### 2026-08-13 — Monolith status check

Live check via SSH (`free -h`, `sysctl`, `mount`, `docker ps`, `btrfs filesystem df`):

- **Swappiness**: still `100` — P0 fix not yet applied. Swap is actively in use (3.1GiB / 7.7GiB), so this is worth doing soon.
- **TCP congestion control**: still `cubic` + `fq_codel` — P1 fix not yet applied.
- **Mount options**: `/`, `/home`, and `/boot` all still on `relatime` — P1 `noatime` fix not yet applied.
- **Btrfs compression**: still `zstd:1` on `/` and `/home` — P3 fix not yet applied.
- **Docker subnets — done, doc was stale**: initial read flagged this as a mismatch against `network.md`'s old stepped-by-10 scheme, but that plan was superseded by a deliberate geography-based scheme (node-id band `0-100` = Venezuela, `100-200` = outside Venezuela; fixed digits `1`/`2`/`3` for service/database/proxy) that was already live and just undocumented. Monolith = node-id `10` (`10.10.1/2/3.0/24`), VPS `notakrista` = node-id `100` (`10.100.1/2/3.0/24`). `network.md` updated to match reality. P2 item is **complete** — no overlap risk, since Venezuela and non-Venezuela nodes now sit in genuinely separate `/8` bands.
- **Container catalog changed**: NPM and Glance are no longer running; Promtail and the `notakrista-com` Laravel app (app/horizon/scheduler containers) are now present. Container count is 24, up from the 22 in the original inventory.
- **Disk**: `/` and `/home` (shared Btrfs volume) at 50% (145G/297G), `/boot` at 62% — no capacity concerns.
- Not yet re-checked this round: VPS swap status, Docker resource limits, log rotation config, Pangolin overlay routing to monolith.

### 2026-08-13 — Follow-up: swappiness, BBR+fq, noatime applied; Newt/resource checks

- Applied and persisted `vm.swappiness=1`, `bbr`+`fq`, and `noatime` on `/`, `/home`, `/home/akrista/NAS` (see checklist above).
- **NPM/Glance**: confirmed intentional — NPM was manually removed, no longer in use. Traefik isn't needed on monolith; Newt exposes all services through `notakrista.com` via the Pangolin tunnel directly.
- **`asf` container**: Newt's health check logged repeated connection-refused failures for `asf` (port 1242) after the reboot and never recovered within the observed window — confirmed a false alarm, `asf` works fine.
- **Docker resource limits reviewed**: MSSQL (1.24GiB/3GiB, 41%), MongoDB (610MB/2GiB, 30%), PostGIS (62MB/2GiB, 3%) all healthy. **Excalidraw is tight**: 4.5MiB used against a 10MiB limit (45%) — small container, but worth bumping the limit as preventive maintenance since it has little headroom before an OOM kill.

### 2026-07-03

- Corrected Pangolin tunnel client naming references (Newt vs Hawser).
- Decided to retain Immich on high-availability Contabo VPS due to local electrical blackouts/instability in Venezuela; Syncthing handles local backups.
- Resolved Docker network IP address collisions (`172.19.0.0/16`) by introducing a scalable `10.<node-id>.<network-type>.0/24` subnet map.
- Step-by-ten allocation ensures no collisions with consumer LAN default gateways and allows sub-node clustering.

### 2026-06-22

- Ran inventory commands on both hosts (lscpu, free, mount, sysctl, docker ps/stats).
- Discovered `swappiness=100` on monolith with Zram — top-priority fix.
- Discovered VPS has zero swap (swapfile commented out in fstab).
- Both hosts on `cubic` + `fq_codel` — missing BBR throughput gains.
- All data mounts on `relatime` — missing `noatime` write reduction.
- Identified existing Pangolin overlay on VPS (`100.90.128.6/24`) — can be extended to monolith.
- Catalogued all 45 running containers across both hosts.
- Updated optimization priorities based on actual system state.

### 2026-06-21

- Documented hardware inventory and OS specs.
- Drafted initial list of memory, storage, and network optimizations.

## Related

- [[containers]] — Docker container optimization and migration plan
- [[network]] — Pangolin tunnel and Docker subnet map
- [[vm-swappiness]] — kernel memory tunable used for the Zram swap fix
- [[atime]] — mount option tuning used for the noatime fix
- [[btrfs]] — filesystem covering the compression fix
- [[tcp-congestion-control]] — BBR + fq tuning applied to monolith
- [[docker-log-rotation]] — log rotation policy applied across compose files
