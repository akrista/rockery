---
title: Container Layout and Migration Plan
date: 2026-06-21
tags:
  - project
  - docker
  - self-hosting
  - migration
---

# Container Layout & Migration Plan

This document maps current container distributions across `monolith` (home server) and `notakrista` (VPS) and proposes migrations to reduce resource usage, storage efficiency, and security.

## Current Distribution

| Category           | Home Server (`monolith`)                                           | Cloud VPS (`notakrista`)                                                 |
| ------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| **Databases**      | Local / Dev DBs (MariaDB, MSSQL, PostGIS, Valkey, RustFS, MongoDB) | Production App DBs (MariaDB, PostGIS, Valkey)                            |
| **Apps & Sites**   | Local dashboards, media/sync services, internal dev utilities      | `www.notakrista.com`, Media archive, Internal workflow & admin utilities |
| **Media Stacks**   | Torrent & indexer stack                                            | None                                                                     |
| **Reverse Proxy**  | Local reverse proxy (transitioning to tunnel ingress)              | Traefik + Pangolin zero-trust overlay                                    |
| **Infra/Services** | DNS sinkhole, container agent, security monitor, tunnel client     | Container management, workflow engines, tunnel gateway, security monitor |

## Node Profiles

### Monolith (Home Server)

- **Strengths**: High storage capacity (915.82 GiB Ext4 NAS), low-cost local bandwidth, private LAN access.
- **Weaknesses**: Limited CPU (4 cores Xeon E3-1225), limited RAM (16 GiB), behind residential dynamic IP (NAT).

### Notakrista (Debian VPS)

- **Strengths**: Higher CPU/RAM (8 cores EPYC, 24 GiB RAM), public IP, high availability/uptime, fast NVMe/SSD storage.
- **Weaknesses**: Limited storage (193.83 GiB), public exposure.

---

## Migration Proposals

### 1. Immich (Photos & Videos)

- **Current Location**: VPS (`notakrista`)
- **Proposed Location**: Keep on VPS (`notakrista`)
- **Rationale**: User lives in Venezuela with frequent power blackouts and internet loss. Must-have always-on services like Immich must remain on the high-availability VPS.
- **Action**: Keep Immich running on VPS. Use **Syncthing** to replicate photo/video libraries to `monolith`'s NAS for local backup and storage efficiency.

### 2. Databases Consolidation

- **MSSQL / MongoDB**: Retain on `monolith` since they are for private/local dev tasks and consume substantial memory.
- **PostGIS / MariaDB**: Keep production/public app databases on the VPS. Keep dev/local databases on `monolith`.

### 3. OpenWebUI

- **Current Location**: VPS (`notakrista`)
- **Proposed Action**: Remove from VPS.
- **Action**: Export all chat logs first, then decommission the OpenWebUI stack to free up RAM on the VPS.

### 4. Syncthing

- **Current Location**: Both nodes.
- **Rationale**: Replicates Immich media and databases from the VPS to `monolith` for local backup, compensating for home server offline periods.

### 5. Reverse Proxy & Networking

- **Current Location**: NPM on `monolith`, Traefik on VPS.
- **Proposed Action**: Remove NPM from `monolith`. Use **Pangolin/Gerbil** + **Traefik** to secure and route traffic.
- **Action**: Route local services and inter-node requests through Traefik connected to the Pangolin overlay network.

---

## Migration Action Checklist

- [ ] Export all OpenWebUI chats and decommission the container on VPS.
- [ ] Connect `monolith` to the existing Pangolin overlay tunnel.
- [ ] Remove NPM from `monolith` and deploy a lightweight **Traefik** helper container.
- [ ] Document the subnet and IP address allocation map across Cloud VPS, Monolith, and Docker networks.
