---
title: "FlipperHTTP Integration"
date: 2026-07-06
tags:
  - networking
  - esp32
  - flipper-zero
  - api
---

A step-by-step guide to setting up **FlipperHTTP** to connect your Flipper Zero to the internet using the **WiFi Developer Board**.

### What is FlipperHTTP?

It is a bridge framework that allows the Flipper Zero to communicate with web servers via standard **HTTP requests**. The Flipper Zero sends commands via GPIO to the ESP32, which acts as a Wi-Fi client.

---

### Step 1: Download the Binaries

You need the compiled firmware files for the ESP32-S2 chip.

1. Navigate to the official [FlipperHTTP GitHub Release page](https://github.com/jblanked/FlipperHTTP).
2. Download these three files:
   - `flipper_http_bootloader.bin`
   - `flipper_http_firmware_a.bin`
   - `flipper_http_partitions.bin`

---

### Step 2: Upload Files to SD Card

Transfer the files to your Flipper Zero.

1. Connect your Flipper Zero to your computer and launch **qFlipper**.
2. Go to the File Manager and look for `/SD/apps_data/esp_flasher/`.
   _(Note: If the directory does not exist, run the **ESP Flasher** app on your Flipper once to create it)._
3. Drag and drop the three `.bin` files into `/SD/apps_data/esp_flasher/`.

---

### Step 3: Flash the WiFi Dev Board

Flash the custom FlipperHTTP firmware onto your ESP32-S2 board.

1. Turn off your Flipper Zero and plug in the **WiFi Developer Board**.
2. Power on the Flipper and open **Apps > GPIO > [ESP] ESP Flasher**.
3. Select **Manual Flash**.
4. Match and select the three binary files:
   - **Bootloader**: `flipper_http_bootloader.bin`
   - **Firmware A**: `flipper_http_firmware_a.bin`
   - **Partitions**: `flipper_http_partitions.bin`
5. Press **Flash** and wait for the process to complete.

---

### Step 4: Configure Wi-Fi & Test

1. From the Flipper App Store, install **FlipWiFi** and **Web Crawler**.
2. Run **FlipWiFi** to scan for your local 2.4 GHz network, select it, and enter your password.
3. Once connected, open **Web Crawler** or **FlipWeather** to verify the Flipper Zero can retrieve data from the internet.
