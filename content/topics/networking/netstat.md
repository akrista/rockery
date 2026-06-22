---
title: netstat
date: 2026-06-21
tags:
  - linux
  - networking
  - command-line
  - monitoring
---

`netstat` displays network statistics — active connections, listening ports, routing tables, and interface statistics.

## Common flags

```bash
netstat -natup
```

- `-n` — Show numerical addresses instead of resolving hostnames
- `-a` — Show all sockets (listening and established)
- `-t` — TCP connections only
- `-u` — UDP connections only
- `-p` — Show the process/PID associated with each socket

```bash
netstat -i
```

Shows a table of per-interface network statistics (packets sent/received, errors, drops).

## Related

- [[tcpdump]] — capture and analyze live network traffic
- [[ss]] — modern replacement for `netstat` (part of iproute2)
