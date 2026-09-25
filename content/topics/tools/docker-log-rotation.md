---
title: Docker Log Rotation
date: 2026-08-14
tags:
  - docker
  - tools
  - performance-tunings
  - operations
---

**Docker's default logging driver** (`json-file`) keeps container stdout/stderr logs completely unbounded unless configured otherwise. A single chatty or crash-looping container can quietly grow a multi-gigabyte log file with nobody noticing until disk space becomes a problem.

## The fix: bounded rotation

Two logging options cap total log size per container:

- `max-size`: rotate the log once it reaches this size (e.g. `10m` for 10MB)
- `max-file`: number of rotated files to keep before deleting the oldest

Together, `max-size: 10m` + `max-file: 3` caps a container's logs at roughly 30MB total instead of unbounded growth. An additional `compress: true` option gzips the rotated (non-active) log files for further space savings.

## Applying via Docker Compose

Rather than repeating the same logging block in every service, define it once as a YAML anchor and reference it wherever needed:

```yaml
x-logging: &default-logging
  driver: "json-file"
  options:
    max-size: "10m"
    max-file: "3"
    compress: "true"

services:
  app:
    image: myapp:latest
    logging: *default-logging
  worker:
    image: myapp:latest
    logging: *default-logging
```

The `x-logging` key is a Compose extension field (ignored by Compose itself, purely a YAML anchor target); `logging: *default-logging` expands to the same block in every service that references it, so the policy is defined and updated in exactly one place.

## Applying globally via daemon.json

For a setting that applies to every container regardless of compose file, configure it once in the Docker daemon:

```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```

This only affects containers **created after** the daemon restarts with the new config; existing containers must be recreated (not just restarted) to pick up the new logging config, since logging driver options are set at container-creation time.

## Related

- [[btrfs]]: another angle on keeping disk usage under control on the same host
