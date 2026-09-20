---
title: TCP Congestion Control
date: 2026-08-14
tags:
  - networking
  - linux-systems
  - performance-tunings
  - protocols
---

**TCP congestion control** is the algorithm governing how aggressively a connection ramps up its sending rate and how it reacts to signs of network congestion. It works alongside the kernel's **queueing discipline (qdisc)**, which manages the buffer of outgoing packets waiting to be sent.

## Congestion control algorithms

| Algorithm | Behavior                                                                                                                                                                                                                                                                                                                                                       |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cubic`   | Linux's traditional default. Treats packet loss as the primary congestion signal and backs off aggressively on loss, then slowly probes back up. Works well on stable, low-latency links, but reacts poorly to non-congestion loss (common on WiFi, mobile, or unreliable links), mistaking it for congestion and throttling unnecessarily.                    |
| `bbr`     | Bottleneck Bandwidth and RTT (Google). Actively models the actual bottleneck bandwidth and round-trip time of the path and paces sending to match, ignoring random loss that isn't actually caused by congestion. Gets much better throughput on lossy or high-latency real-world links. In mainline Linux since kernel 4.9 (2016) — mature, not experimental. |

## Queueing disciplines

| qdisc      | Behavior                                                                                                                                                                                                                          |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fq_codel` | Fair Queuing + CoDel (Controlled Delay). Fights bufferbloat — the problem where an oversized buffer lets packets queue so long that latency balloons even without outright packet loss. Solid general-purpose default.            |
| `fq`       | Fair Queuing without CoDel. Co-designed with and expected by BBR — BBR does its own pacing/timing math, and `fq` enforces the per-flow pacing BBR calculates. Pairing BBR with `fq_codel` instead can interfere with that pacing. |

`bbr` + `fq` is a matched pair for this reason — mixing BBR with a qdisc built around a different congestion-control model can lose some of BBR's benefit.

## Checking and applying

```bash
# Check current values
sysctl net.ipv4.tcp_congestion_control net.core.default_qdisc

# Confirm the BBR module is available and loaded
sudo modprobe tcp_bbr
lsmod | grep bbr

# Apply immediately
sudo sysctl net.ipv4.tcp_congestion_control=bbr
sudo sysctl net.core.default_qdisc=fq

# Persist across reboots
printf 'net.core.default_qdisc=fq\nnet.ipv4.tcp_congestion_control=bbr\n' | sudo tee /etc/sysctl.d/99-bbr.conf
```

## Safety notes

- Only affects **new** TCP connections going forward — existing connections keep whatever algorithm they already negotiated, so this can't disrupt an active session (including the one applying the change over SSH).
- Fails safe: if `tcp_bbr` isn't loadable, the `sysctl` write is rejected with an error rather than silently half-applying.
- Fully and instantly reversible by setting the values back — no reboot required in either direction.

## Related

- [[netstat]] — inspecting active connections and their state
- [[ssh]] — a protocol whose connections are directly affected by the active congestion-control algorithm
