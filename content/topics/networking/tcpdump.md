---
title: tcpdump
date: 2026-06-21
tags:
  - linux
  - networking
  - command-line
  - packet-analysis
  - monitoring
---

`tcpdump` captures and analyzes network traffic passing through a network interface in real time.

## Basic usage

```bash
tcpdump -i any -p tcp port 80
```

- `-i any` — Capture on all available interfaces
- `-p` — Disable promiscuous mode (only see traffic destined for the host)
- `tcp port 80` — Filter expression: only TCP packets on port 80 (HTTP)

## Common filter expressions

| Expression           | Matches                       |
| -------------------- | ----------------------------- |
| `host 192.168.1.1`   | Traffic to/from a specific IP |
| `src net 10.0.0.0/8` | Traffic from a subnet         |
| `tcp port 443`       | TCP traffic on port 443       |
| `udp port 53`        | DNS traffic                   |
| `icmp`               | Ping / ICMP packets           |
| `not arp`            | Exclude ARP broadcasts        |

## Useful flags

| Flag                | Description                              |
| ------------------- | ---------------------------------------- |
| `-v`, `-vv`, `-vvv` | Increase verbosity                       |
| `-n`                | Don't resolve hostnames                  |
| `-X`                | Print hex + ASCII dump of packet payload |
| `-w file.pcap`      | Write raw packets to a file              |
| `-r file.pcap`      | Read packets from a saved file           |

## Related

- [[netstat]] — show active connections and port statistics
