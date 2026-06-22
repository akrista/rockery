---
title: Linux-router
date: 2026-06-21
tags:
  - linux
  - networking
  - router
  - wifi
  - iptables
  - dnsmasq
  - proxy
---

[linux-router](https://github.com/garywill/linux-router) is a single-command tool that turns a [[Linux]] machine into a router. It wraps `iptables`, `dnsmasq`, `hostapd`, and other utilities to provide NAT, DHCP, DNS, WiFi hotspot, and transparent proxy.

## Features

- Create a NATed sub-network with Internet access
- DHCP server and router advertisement (RA)
- DNS server (with optional logging)
- IPv6 behind NATed LAN
- WiFi hotspot (WPA2/WPA, channel selection, 2.4/5 GHz)
- Transparent proxy via redsocks (e.g., Tor)
- Interface-to-interface routing
- Compatible with NetworkManager

## Common use cases

```bash
# Provide Internet to an interface
sudo lnxrouter -i eth1

# Create a WiFi hotspot
sudo lnxrouter --ap wlan0 MyAccessPoint -p MyPassPhrase

# Transparent proxy through Tor
sudo lnxrouter -i eth1 --tp 9040 --dns 9053
```

## Dependencies

- [[bash]]
- procps / procps-ng
- iproute2
- dnsmasq
- iptables (legacy)
- hostapd, iw (for WiFi hotspot)
- haveged (optional)
- qrencode (optional)

## Cleanup

The tool cleans up on Ctrl+C or terminal close. Persistent changes include `ip_forward = 1`, dnsmasq in AppArmor complain mode, and `nf_nat_pptp` kernel module loaded.
