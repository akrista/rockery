---
title: "Flipper Zero WiFi Board Projects"
date: 2026-07-06
tags:
  - flipper-zero
  - esp32
  - hardware
  - pentesting
  - ideas
---

A collection of project ideas and experiments combining the **Flipper Zero** (running **Momentum Firmware**) and the **ESP32 WiFi Developer Board**.

### 1. WiFi Marauder Auditing & Wardriving

Use the ESP32 to monitor local 2.4 GHz airspace.

- **Wigle.net Wardriving**: Attach a cheap serial GPS module to the Flipper's GPIO pins, combine it with **Marauder** scanning, and export raw **PCAP** data to map local access points.
- **Handshake Capture**: Sniff WPA/WPA2 authentication handshakes and save them to the SD card for offline cracking tests.

### 2. Captive Portal Security Testing (Evil Portal)

Develop custom portal landing pages to test social engineering resilience.

- **Custom Portals**: Write custom HTML/CSS portal screens (hosted on the Flipper's SD card) to simulate login prompts.
- **Audit Logging**: Capture mock inputs to verify credential transmission behaviors over insecure networks.

### 3. FlipperHTTP API Integration

Connect the Flipper to the internet using the WiFi board as an HTTP bridge.

- **Dashboard Widget**: Display real-time external data (e.g., weather updates, stock prices, crypto tickers) on the Flipper LCD.
- **Webhook Trigger**: Build a Flipper script that sends webhook requests to trigger automation events (e.g., smart home controls via Home Assistant).

### 4. Hardware Debugging Rig (Black Magic)

Use the dev board as a hardware debugger.

- **SWD Debugging**: Use the **Black Magic Probe** firmware on the dev board to debug custom microcontrollers (e.g., **RP2040**, **STM32**) directly from a laptop.
