---
title: Bitwarden SSH Agent
date: 2026-08-13
tags:
  - networking
  - security
  - remote-accesses
  - password-managers
  - key-managements
---

**Bitwarden Desktop's SSH agent** is a built-in feature that stores and manages SSH private keys inside the Bitwarden vault instead of as flat files on disk. It implements the standard SSH agent protocol, so any OpenSSH client can request a signing operation from it instead of reading a raw private key file directly.

## How it works

Normally, an OpenSSH client reads a private key file (e.g. `~/.ssh/id_ed25519`), decrypts it with a passphrase, and uses it to sign the authentication challenge. With an SSH agent in the loop, the client instead talks to the agent over a socket (Unix domain socket on Linux/macOS, a named pipe on Windows) and asks it to perform the signing; the private key material never has to be read from a flat file by the client itself.

Bitwarden Desktop's agent works the same way: once enabled, it exposes an agent endpoint that vault-stored SSH keys are signed through, and unlocking the vault (biometrics, master password, etc.) authorizes signing requests instead of a per-key passphrase prompt.

## Configuration

1. Enable **Settings → SSH agent** in Bitwarden Desktop.
2. Add or import SSH keys into the vault as SSH key items.
3. Point the environment at Bitwarden's agent endpoint so OpenSSH clients use it:

```bash
# Linux/macOS — Bitwarden sets this automatically when the agent is running
echo $SSH_AUTH_SOCK

# Windows — Bitwarden exposes a named pipe that a proxy tool bridges to
# the OpenSSH client (e.g. via WSL or Git Bash's SSH_AUTH_SOCK)
```

If `SSH_AUTH_SOCK` isn't set (or points somewhere else) in a given shell, [[ssh]] falls back to its default behavior: reading the key file named in `IdentityFile` (see [[ssh-config]]) straight off disk.

> [!warning] A shell that isn't wired up to the Bitwarden agent will try to read the raw key file directly. If that on-disk key uses a cipher or format the local OpenSSL build doesn't support, the connection fails with `Load key "...": error in libcrypto: unsupported`; even though the exact same key works fine from a terminal that's correctly forwarding to the Bitwarden agent.

## Practical implication

An `error in libcrypto: unsupported` failure on a key that is known to work elsewhere is not proof the key itself is broken. Before assuming key corruption or regenerating anything, check whether the current shell's `SSH_AUTH_SOCK` points to the Bitwarden agent. Different terminal environments (e.g. Git Bash vs. a properly configured Windows terminal) can have inconsistent agent wiring even on the same machine, so a failure in one shell and success in another is a strong signal the agent socket; not the key; is the problem.

## Related

- [[ssh]]: protocol and client overview
- [[ssh-config]]: client configuration, including `IdentityFile` and agent forwarding
