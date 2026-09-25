---
title: Venezuela Egress Proxy
date: 2026-09-21
tags:
  - projects
  - networking
  - vpns
  - proxies
  - pangolin
---

# Venezuela Egress Proxy

This project establishes a resilient, cross-platform egress tunnel routed through a home server (`monolith`) in Venezuela. The primary purpose is enabling devices outside Venezuela (workstations and Android mobile devices) to spoof their traffic and originate public internet requests from a residential Venezuelan ISP IP.

Because the infrastructure spans geographic boundaries without on-site physical access, network changes must strictly avoid disrupting the server's primary network interfaces, DNS resolution, default routing tables, or the existing Pangolin tunnel overlay.

## Goals

- [x] Inspect existing Docker network topology and Compose definitions in `~/containers` on `monolith`
- [x] Deploy an isolated, lightweight `shadowsocks-rust` container on `monolith` attached to the `proxy` or `service` Docker network
- [x] Expose the proxy service securely through the Pangolin zero-trust overlay as a Private Resource or Public TCP Resource
- [x] Configure client connectivity on workstations (via local proxy / `tun2socks` / `sshuttle` / `nekoray`)
- [x] Configure mobile client connectivity on Android using the open-source Shadowsocks client to provide a 1-tap VPN toggle
- [x] Validate outbound IP, DNS leak protection, and latency from both client devices

## Architecture & Design

### Traffic Flow

```
[ Android / Workstation ]
          |
          | (Pangolin Zero-Trust WireGuard Tunnel)
          v
[ Pangolin Server (Cloud VPS - Node 100) ]
          |
          | (Newt WireGuard Tunnel)
          v
[ Monolith (Home Server - Node 10, Venezuela) ]
          |
          | (Docker Proxy Container: shadowsocks-rust)
          v
[ Local Residential Gateway / ISP ]
          |
          v
[ Public Internet (Venezuelan Geo-IP) ]
```

### Safety Constraints

> [!WARNING]
> Remote accessibility is critical. Changes must not modify host-level routing tables (e.g. `0.0.0.0/0`), flush firewall rules, alter `/etc/resolv.conf`, or touch the systemd `newt` service. All proxy components run strictly in containerized userspace.

### Network Allocation

Adhering to the geographic IPAM scheme defined in [[network]]:

- **Host**: `monolith` (Node ID `10`, Venezuela)
- **Docker Network**: `10.10.3.0/24` (`proxy`) or `10.10.1.0/24` (`service`)
- **Container Port**: Shadowsocks listener mapped to a non-conflicting internal proxy port

## Progress

### 2026-09-21

- Verified direct SSH connectivity to `monolith` via Pangolin tunnel.
- Evaluated tunnel architecture and ruled out native Pangolin exit nodes (Pangolin is resource-centric and does not support full-tunnel exit nodes natively).
- Ruled out Tailscale to prevent routing and DNS collisions with Pangolin and avoid proprietary coordination dependencies.
- Selected `shadowsocks-rust` over Pangolin for zero-collision application-layer egress on both Linux and Android.
- Initialized project documentation in Rockery.
- Created `~/containers/services/shadowsocks/compose.yml` and registered include in `compose.yml`.
- Deployed `shadowsocks` container on `monolith` (`ghcr.io/shadowsocks/ssserver-rust:latest`) listening on container proxy port (TCP/UDP, `chacha20-ietf-poly1305`). Verified container status and listening sockets.
- Configured public TCP resource on VPS gateway (`<vps-ip>:<proxy-port>`) forwarding to `monolith`.
- Imported profile on Android device via ADB (`com.github.shadowsocks`), confirming 1-tap mobile VPN operation.
- Configured Linux desktop client using Nekoray with `sing-box` core in TUN mode.
- Validated full traffic egress spoofing through Venezuela. Project complete.

## Related

- [[infrastructure-tuning]]: Server specifications, hardware baseline, and host tuning for `monolith`
- [[network]]: Geographic Docker IPAM scheme and Pangolin overlay architecture
- [[containers]]: Docker container organization and deployment guidelines
