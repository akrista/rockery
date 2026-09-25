---
title: "Redmi Note 13 Pro 5G (LineageOS Build)"
date: 2026-09-20
tags:
  - smartphones
  - hardware-projects
  - android-systems
  - lineageos
  - tinkering
---

The **Redmi Note 13 Pro 5G** (model `2312DRA50G`, board/codename `garnet`, platform `parrot`) is a mid-range Qualcomm Snapdragon device released in early 2024. This device serves as the primary mobile workstation and daily driver, running official **LineageOS 23.2** (Android 16) with **MindTheGapps** and wireless management via **ADB** and **scrcpy**.

## Current Specs (Audited September 2026)

| Component              | Detail                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------- |
| **Model**              | Redmi Note 13 Pro 5G (`2312DRA50G` / `garnet_global`)                                             |
| **SoC**                | Qualcomm Snapdragon 7s Gen 2 (`SM7435`, 4× Cortex-A78 @ 2.40 GHz + 4× Cortex-A55 @ 1.95 GHz, 4nm) |
| **GPU**                | Adreno 710                                                                                        |
| **RAM**                | 12 GB LPDDR4X                                                                                     |
| **Storage**            | 512 GB UFS 2.2 (~462 GB usable data partition)                                                    |
| **Display**            | 6.67" Flow AMOLED CrystalRes (1220×2712 px, 480 dpi, 120 Hz, Dolby Vision, Gorilla Glass Victus)  |
| **Battery**            | 5100 mAh Li-poly (5012 mAh audited maximum capacity, **98.2% health**, 67W fast charging)         |
| **OS**                 | LineageOS 23.2 (`23.2-20260916-NIGHTLY-garnet`)                                                   |
| **Android Version**    | Android 16 (Build `BP2A.250605.031.A3`, Security Patch `2026-09-01`)                              |
| **Kernel**             | Linux `5.10.269-gki-g57dcedf2303c` (AArch64, GKI)                                                 |
| **Bootloader / State** | Unlocked (`ro.boot.flash.locked=0`, `ro.boot.verifiedbootstate=orange`)                           |
| **Partition Scheme**   | A/B system slots (`boot_a` / `boot_b`, no `init_boot` partition; active slot: `_b`)               |
| **GApps**              | MindTheGapps (`com.google.android.gms`, `com.android.vending`)                                    |
| **Connectivity**       | 5G Sub6, Wi-Fi 6 (802.11ax), Bluetooth 5.2, Dual SIM (Personal AR), NFC, IR Blaster, 3.5mm jack   |
| **Workstation Link**   | Network ADB (`192.168.0.16:5555`) + `scrcpy` over LAN                                             |

---

## Workspace Role & Mobile Developer Environment

The device integrates directly into the [[workspace-standardization]] multi-environment fabric:

- **Wireless Headless Management**: Connected over local Wi-Fi via ADB TCP port `5555`. Low-latency display and input mirroring via `scrcpy` from both Windows and Debian laptops.
- **Termux & Dotfiles**: Android command-line layer integrated with [[dotfiles]] (`.akrista/termux/`), sharing common shell aliases, Git configurations, and SSH keys.
- **Git Sync**: On-device repository synchronization via PuppyGit and Git CLI in Termux.

---

## The Argentina Ecosystem & Integrity Challenge

Operating a custom ROM device with an unlocked bootloader in Argentina introduces critical app compatibility hurdles due to Google's **Play Integrity API** (formerly SafetyNet) and local banking/telecom security profiles.

### Affected Local Apps

1. **Mercado Pago (`com.mercadopago.wallet`)**:
   - De facto payment network and QR rail across Argentina.
   - Enforces `MEETS_DEVICE_INTEGRITY`. Rejects devices with unlocked bootloaders, modified system signatures, or unmasked root binaries (`su`).
2. **Mi Personal (`ar.com.personal`)**:
   - Telecom provider app for cellular line balance, invoice payment, and data pack management.
   - Fails or blocks access when Google Play Protect certification is missing.
3. **Banking & FinTech Apps**:
   - Argentine banking apps (Galicia, Santander, BBVA, Brubank, Lemon) actively probe for unlocked bootloader states, hardware-backed keystore attestation, and developer/debugging flags.

### Integrity Levels Breakdown

```
+-------------------------------------------------------------+
| Play Integrity API Verification Tiers                      |
+-------------------------------------------------------------+
| [PASS] MEETS_BASIC_INTEGRITY  -> System runs basic Android  |
| [FAIL] MEETS_DEVICE_INTEGRITY -> Unlocked bootloader flag   |
| [FAIL] MEETS_STRONG_INTEGRITY -> Hardware key attestation   |
+-------------------------------------------------------------+
```

---

## Magisk & Integrity Bypass Architecture

To restore full compatibility without returning to stock Xiaomi HyperOS, root access via **Magisk** is used not for arbitrary system modifications, but as a stealth substrate to inject integrity fixes and hide bootloader state from target applications.

### Architecture Components

```
+---------------------------------------------------------------+
|                       Target Apps                             |
|          [Mercado Pago]              [Mi Personal]            |
+---------------------------------------------------------------+
                               |
                        Isolated Sandbox
                               |
+---------------------------------------------------------------+
|                      Zygote Process                           |
|       +-----------------------------------------------+       |
|       |               Zygisk Framework                |       |
|       |  +---------------------+ +------------------+ |       |
|       |  | Play Integrity Fix  | |  Shamiko Hide    | |       |
|       |  | (Fingerprint Spoof) | |  (DenyList Enforce) |      |
|       |  +---------------------+ +------------------+ |       |
|       +-----------------------------------------------+       |
+---------------------------------------------------------------+
                               |
+---------------------------------------------------------------+
|                 Magisk Kernel / Boot Patch                    |
|             (Patched boot_b partition / ramdisk)              |
+---------------------------------------------------------------+
```

### Key Modules & Requirements

1. **Magisk Installation**:
   - Because `garnet` uses Snapdragon 7s Gen 2 with a standard GKI layout (no `init_boot`), the ramdisk resides in `boot.img`.
   - Patching requires extracting `boot.img` from the matching `23.2-20260916-NIGHTLY-garnet` payload, patching via the Magisk app, and flashing to the active slot (`boot_b`).
2. **Zygisk & Stealth**:
   - Enable **Zygisk** inside Magisk settings.
   - Use **Shamiko** to enforce hiding without triggering Google's native DenyList detection.
3. **Play Integrity Fix (PIF)**:
   - Spoofs certified device build properties to Google Play Services (`com.google.android.gms`), maintaining `MEETS_BASIC_INTEGRITY`.
4. **Google Play Protect & App Compatibility**:
   - Argentine fintech and telecom apps (Mercado Pago, Mi Personal) enforce root hiding and environment hygiene (handled by Shamiko in blacklist mode) rather than hardware Keymint attestation (`MEETS_DEVICE_INTEGRITY`).

---

## Current Status & Verification

Completed implementation tracked in [[setup-magisk-play-integrity-garnet]]:

- [x] Extracted `boot.img` and patched via Magisk v30.7.
- [x] Flashed patched boot to active slot `_b` via Fastboot.
- [x] Configured Zygisk, Shamiko (blacklist mode), and PlayIntegrityFork.
- [x] Added Mercado Pago, Mi Personal, and GMS to DenyList.
- [x] Verified execution of Mercado Pago and Mi Personal without root detection.

## Related

- [[setup-magisk-play-integrity-garnet]]: task tracking Magisk deployment and integrity configuration
- [[workspace-standardization]]: multi-environment workspace documentation
- [[dotfiles]]: Android Termux configuration
- [[t480-ultimate-build]]: companion laptop hardware build
