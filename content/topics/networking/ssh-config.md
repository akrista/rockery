---
title: SSH Config
date: 2026-06-21
tags:
  - ssh
  - openssh
  - networking
  - configuration
  - security
---

[[SSH]] client configuration is read from `~/.ssh/config` (per-user) and `/etc/ssh/ssh_config` (global). Command-line options take precedence, then the user file, then the global file. The first value obtained for each parameter is used.

## Common configuration options

### X11 and agent forwarding

```conf
ForwardAgent yes
ForwardX11 yes
```

Useful for remote graphical apps and single sign-on, but increases exposure if a server is compromised.

### Port forwarding

Local and remote port forwarding tunnel TCP connections over the secure channel:

```conf
LocalForward 8080 localhost:80
RemoteForward 2222 localhost:22
```

> [!warning] Port forwarding can bypass corporate firewalls — security teams should audit these settings.

### Public key authentication

Specify which identity file to use:

```conf
IdentityFile ~/.ssh/id_ed25519
```

### Host aliases

Define shortcuts for frequently accessed servers:

```conf
Host myserver
    HostName 192.168.1.100
    User admin
    Port 2222
    IdentityFile ~/.ssh/prod_key
```

## File format

- Empty lines and lines starting with `#` are comments
- Each line starts with a keyword followed by arguments
- Keywords are case-insensitive; arguments are case-sensitive
- Arguments containing spaces can be quoted

## Important directives

| Directive               | Description                                 |
| ----------------------- | ------------------------------------------- |
| `Host`                  | Pattern-matched host restriction            |
| `HostName`              | Actual hostname or IP                       |
| `Port`                  | Non-default port                            |
| `User`                  | Login username                              |
| `IdentityFile`          | Path to private key                         |
| `StrictHostKeyChecking` | `yes` / `no` / `accept-new`                 |
| `ServerAliveInterval`   | Keepalive interval (seconds)                |
| `ServerAliveCountMax`   | Missed keepalives before disconnect         |
| `ProxyCommand`          | Command to tunnel through (e.g., jump host) |
| `LocalForward`          | Local → remote port mapping                 |
| `RemoteForward`         | Remote → local port mapping                 |
| `DynamicForward`        | SOCKS proxy on local port                   |
| `Compression`           | `yes` / `no`                                |
| `LogLevel`              | `QUIET` / `INFO` / `VERBOSE` / `DEBUG`      |
| `SendEnv`               | Environment variables to pass to the server |

## Host key verification

```conf
StrictHostKeyChecking ask       # Default — prompt on unknown hosts
StrictHostKeyChecking accept-new # Auto-accept new hosts, reject changed keys
StrictHostKeyChecking yes        # Never auto-add, refuse if changed
```

## Jump host (bastion)

```conf
Host target
    HostName 10.0.0.5
    ProxyJump bastion.example.com
```

Alternatively via `ProxyCommand`:

```conf
Host target
    HostName 10.0.0.5
    ProxyCommand ssh bastion.example.com -W %h:%p
```

## See also

- [[ssh]] — protocol and client overview
- `/etc/ssh/sshd_config` — server-side configuration
