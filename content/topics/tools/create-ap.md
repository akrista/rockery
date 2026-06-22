---
title: create_ap
date: 2026-06-21
tags:
  - linux
  - networking
  - wifi
  - hostapd
  - dnsmasq
---

**create_ap** is a [[bash]] script that turns a [[Linux]] machine into a WiFi access point. It wraps `hostapd`, `dnsmasq`, and `iptables` to handle AP creation, DHCP, DNS, and NAT. The project is **no longer maintained** — active forks include [[linux-router]] and [linux-wifi-hotspot](https://github.com/lakinduakash/linux-wifi-hotspot).

## Features

- Create an AP at any channel
- Encryption: [[WPA]], WPA2, WPA/WPA2, or open (no encryption)
- Hide [[SSID]]
- Client isolation
- IEEE 802.11n & 802.11ac support
- Internet sharing: NATed, Bridged, or None
- Custom AP gateway IP
- Use the same interface for both Internet and AP
- Pipe-based SSID/passphrase input

## Dependencies

| Dependency         | Purpose                    |
| ------------------ | -------------------------- |
| [[bash]]           | Script runtime             |
| util-linux         | getopt                     |
| procps / procps-ng | Process management         |
| hostapd            | AP management daemon       |
| iproute2           | Network interface control  |
| iw                 | Wireless device management |
| dnsmasq            | DHCP + DNS server          |
| iptables           | NAT / firewall rules       |

## Examples

```bash
# Open network
create_ap wlan0 eth0 MyAccessPoint

# WPA + WPA2
create_ap wlan0 eth0 MyAccessPoint MyPassPhrase

# AP without Internet sharing
create_ap -n wlan0 MyAccessPoint MyPassPhrase

# Bridged mode
create_ap -m bridge wlan0 eth0 MyAccessPoint MyPassPhrase

# Same interface for Internet and AP
create_ap wlan0 wlan0 MyAccessPoint MyPassPhrase
```

## Installation

```bash
git clone https://github.com/oblique/create_ap
cd create_ap
make install
```

## Configuration file

Located at `/etc/create_ap.conf`. Example:

```conf
CHANNEL=default
GATEWAY=10.0.0.1
WPA_VERSION=2
SHARE_METHOD=nat
WIFI_IFACE=wlp5s1
INTERNET_IFACE=enp3s0
SSID=MyAccessPoint
PASSPHRASE=MyPassPhrase
HIDDEN=0
ISOLATE_CLIENTS=0
FREQ_BAND=2.4
```

## systemd service

```bash
systemctl start create_ap   # Start immediately
systemctl enable create_ap  # Start on boot
```
