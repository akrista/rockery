---
title: Network & Tunneling Architecture
date: 2026-07-03
tags:
  - project
  - networking
  - docker
  - pangolin
---

# Network & Tunneling Architecture

This document tracks how local and remote services interconnect using the **Pangolin** zero-trust tunnel and local **Docker** networks.

---

## 1. Pangolin Tunnel Mechanics

**Pangolin** and **Gerbil** form a WireGuard-based overlay network. Instead of routing raw container-to-container IP packets directly, it exposes host-level endpoints.

```
+--------------------------+                 +----------------------------+
|        Cloud VPS         |                 |  Home Monolith (192.168.1.4)|
|                          |  VPN Tunnel     |                            |
| Traefik (Public Ingress) | <=============> |  Newt/Hawser client        |
|            |             | (100.90.128.0)  |             |              |
+------------v-------------+                 +-------------v--------------+
             |                                             |
     Routes to Docker                               Routes to localhost
  (Internal VPS Stacks)                           (Mapped Docker Ports)
```

1. **VPS Ingress:** Traefik on the VPS receives public HTTPS requests.
2. **Tunnel Routing:** Traefik routes matching traffic through the local Pangolin interface (`100.90.128.6`) over the tunnel.
3. **Local Forwarding:** The tunnel client (**Newt**) on `monolith` receives the traffic and forwards it to the home server's IP (`192.168.1.4`) or `localhost` on the configured target port.
4. **Docker Ingress:** Docker on `monolith` forwards the port mapping (e.g., `-p 8080:80`) into the destination container.

> [!NOTE]
> **Newt** acts as the user-space WireGuard client for Pangolin. **Hawser** is reserved for **Dockhand** container management.

---

## 2. Scalable Multi-Node Docker IP layout

To scale cleanly to **5+ nodes** (e.g., VPS, Monolith, local dev boxes, offsite backups) without IP conflicts against local LANs or other overlays, we use a structured **Class A IPAM scheme**:

`10.<node-id>.<network-type>.0/24`

> [!note] Superseded scheme
> An earlier version of this scheme stepped node-ids by tens (`10`, `20`, `30`...) with proxy/database/service on `10`/`20`/`30`. That was never actually deployed — the live allocation below (as of 2026-08-13) is what's really running.

### Node IDs grouped by geography

Instead of a flat stepped sequence, node-ids are split into two geographic bands so the range itself signals where a host physically lives:

- **`0`–`100`** (second octet): servers based in **Venezuela**
- **`100`–`200`** (second octet): servers **outside Venezuela**

### Network type (`third octet`) — fixed digits

- `1` = `service` network (general application containers)
- `2` = `database` network (relational, cache, document DBs)
- `3` = `proxy` network (ingress / reverse proxy)

### Known Node ID Allocations

| Node ID | Host                        | Region            | Status                                          |
| :------ | :-------------------------- | :---------------- | :---------------------------------------------- |
| `10`    | Monolith (`monolith`)       | Venezuela         | Confirmed via `docker network inspect`          |
| `11`    | (unnamed)                   | Venezuela         | Reserved/in use — not yet documented in Rockery |
| `100`   | VPS (`notakrista`, Contabo) | Outside Venezuela | Confirmed live                                  |

---

## 3. Concrete Node Allocation Table

| Host                                   | Docker Network | IP Subnet       | Gateway      |
| :------------------------------------- | :------------- | :-------------- | :----------- |
| **Monolith** (`node-id: 10`)           | `service`      | `10.10.1.0/24`  | `10.10.1.1`  |
|                                        | `database`     | `10.10.2.0/24`  | `10.10.2.1`  |
|                                        | `proxy`        | `10.10.3.0/24`  | `10.10.3.1`  |
| **Node 11** (Venezuela, TBD)           | `service`      | `10.11.1.0/24`  | `10.11.1.1`  |
|                                        | `database`     | `10.11.2.0/24`  | `10.11.2.1`  |
|                                        | `proxy`        | `10.11.3.0/24`  | `10.11.3.1`  |
| **VPS** (`notakrista`, `node-id: 100`) | `service`      | `10.100.1.0/24` | `10.100.1.1` |
|                                        | `database`     | `10.100.2.0/24` | `10.100.2.1` |
|                                        | `proxy`        | `10.100.3.0/24` | `10.100.3.1` |

> [!TIP]
> This structure prevents routing table overlaps when managing site-to-site tunnels or connecting multiple docker engines to a unified VPN overlay. It avoids common `192.168.1.0/24` home LANs and default Docker `172.17.x.x` blocks. Because Venezuela-based and outside-Venezuela nodes now sit in genuinely separate second-octet bands (`0-100` vs `100-200`), a future Pangolin overlay connecting them can't collide the way a flat stepped scheme risked.
