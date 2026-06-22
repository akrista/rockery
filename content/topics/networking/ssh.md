---
title: SSH
date: 2026-06-21
tags:
  - linux
  - networking
  - security
  - remote-access
---

**SSH** (Secure Shell) is both a protocol and the program that implements it. Its primary purpose is remote access to a server over a secure, encrypted channel.

## How it works

SSH uses a client-server model. The client authenticates to the server using:

- **Password authentication** — username and password sent over the encrypted tunnel
- **Public-key authentication** — the client proves identity using a private key; the server verifies against an authorized public key (more secure, recommended)

## Common usage

```bash
ssh user@hostname
```

Connects to `hostname` as `user`. If no user is specified, the current local username is used.

### Key management

```bash
# Generate a new SSH key pair
ssh-keygen -t ed25519

# Copy public key to a remote server
ssh-copy-id user@hostname
```

## Related

- [[gcloud]] uses SSH to connect to Compute Engine VM instances via `gcloud compute ssh <INSTANCE>`
