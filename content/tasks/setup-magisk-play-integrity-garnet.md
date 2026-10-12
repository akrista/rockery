---
title: "Setup Magisk and Play Integrity Fix on Redmi Note 13 Pro 5G"
status: done
tags:
  - tasks
  - status/done
  - hardware-projects
  - smartphones
  - android
---

Install Magisk root and configure Play Integrity bypass modules on the **Redmi Note 13 Pro 5G (`garnet`)** running **LineageOS 23.2** (Android 16). The goal is to provide a stealth root environment with Shamiko so critical local apps in Argentina (such as **Mercado Pago** and **Mi Personal**) operate without restrictions.

## Context & Objectives

- **Target Device**: Redmi Note 13 Pro 5G (`2312DRA50G` / `garnet`), active slot `_b`.
- **Target OS**: LineageOS 23.2 Nightly (`23.2-20260916-NIGHTLY-garnet`), Android 16.
- **Problem**: Unlocked bootloader fails Google Play Integrity checks, causing banking, telecom, and payment apps to refuse execution or restrict core features.
- **Affected Apps**:
  - **Mercado Pago** (`com.mercadopago.wallet`); QR payments and transfers.
  - **Mi Personal** (`ar.com.personal`); mobile line management and payments.
  - Local banking apps (Galicia, Santander, Brubank).

## Action Plan

### 1. Boot Image Preparation & Patching

- [x] Obtain matching LineageOS 23.2 (`20260916`) `boot.img` directly from LineageOS download mirrors.
- [x] Push `boot.img` to device: `adb push boot.img /sdcard/Download/`.
- [x] Install latest **Magisk v30.7** APK on device.
- [x] Patch `boot.img` within Magisk app.
- [x] Pull patched file to workstation scratch: `adb pull /sdcard/Download/magisk_patched-30700_rG9XU.img`.

### 2. Flashing & Initial Root Boot

- [x] Connect device via physical USB cable.
- [x] Reboot to fastboot: `adb reboot bootloader`.
- [x] Flash patched boot image to active slot `_b`: `fastboot flash boot magisk_patched.img`.
- [x] Reboot system: `fastboot reboot`.
- [x] Grant superuser rights to Shell/ADB in Magisk Settings.

### 3. Zygisk & Stealth Layer

- [x] In Magisk settings: enable **Zygisk** (`zygisk|1`).
- [x] Flash **Shamiko v1.2.5** module in Magisk.
- [x] Keep native "Enforce DenyList" toggled **OFF** so Shamiko runs in stealth blacklist mode.
- [x] Configure DenyList with target applications:
  - Google Play Services (`com.google.android.gms` , all processes)
  - Google Play Store (`com.android.vending`)
  - Mercado Pago (`com.mercadopago.wallet`)
  - Mi Personal (`ar.com.personal`)
- [ ] Optional: Hide Magisk app with stub repackaging if apps inspect installed packages.

### 4. Play Integrity Fix (PIF) & Attestation Tuning

- [x] Install **PlayIntegrityFork v18** module by osm0sis.
- [x] Run `autopif4.sh` via root shell to crawl and apply certified Pixel build properties and security patch.
- [x] Update `/data/adb/modules/playintegrityfix/custom.pif.prop` with `spoofVendingFinger=1` to ensure Play Store reflects spoofed identity.
- [x] ~~Evaluate TrickyStore...~~ → **reversed in Oct 2026**: TrickyStore + a public hardware keybox works; see 2026-10 keybox session below.
- [x] Clear app data for Google Play Store and restart Google Play Services.
- [x] Confirm `MEETS_BASIC_INTEGRITY` passing.
- [x] Verify full authentication and operation of **Mercado Pago** and **Mi Personal** without blocks.

## Findings & Architecture Notes

1. **App Enforcement Reality**: Neither Mercado Pago nor Mi Personal requires hardware-backed `MEETS_STRONG_INTEGRITY` or strict Google Play Protect certification in current builds. They enforce absence of exposed root binaries, modified zygote hooks, and unlocked bootloader flags in their process sandbox.
2. **Shamiko Effectiveness**: Shamiko running in blacklist mode successfully hides `su` and Zygisk hooks from both Mercado Pago and Mi Personal, satisfying their integrity constraints.
3. **Android 16 Keymint Constraints**: On Android 16, Google rejects software attestation for newer Pixel fingerprints when hardware Keymint is expected. Using TrickyStore without an authentic private OEM keybox causes complete attestation failure (`Labels: []`). Pure software spoofing via PlayIntegrityFork + Shamiko maintains `MEETS_BASIC_INTEGRITY` and app compatibility reliably.

## 2026-10 Audit (adb, live device)

| Property                                     | Verified value                                                                         |
| -------------------------------------------- | -------------------------------------------------------------------------------------- |
| OS / LineageOS                               | Android 16, `ro.lineage.build.version` = 23.2                                          |
| Security patch                               | 2026-09-01                                                                             |
| Fingerprint                                  | `Redmi/garnet_global/garnet:16/BP2A.250605.031.A3/OS3.0.5.0.WNRMIXM:user/release-keys` |
| Magisk                                       | **v31.0** (`magisk -v` → `31.0:MAGISK:R` — newer than the v30.7 noted at install time) |
| `com.topjohnwu.magisk` in `pm list packages` | not listed (hidden / no longer package-listed)                                         |

## 2026-10 Keybox Session (Tricky Store + fintech hardening)

- [x] Install **Tricky Store v1.4.1** with a **public Yurikey keybox** (`github.com/Yurii0307/yurikey`, leaf chain → genuine Google hardware attestation root `f92009e853b6b045`; non-revoked per Google CRL).
- [x] KeyAttestation now shows the hardware Google root chain; SPIC Play Integrity check upgraded to **`MEETS_DEVICE_INTEGRITY`** (2/3 pips, STRONG still out of reach).
- [x] DenyList additions verified working: **Binance** (`com.binance.dev` — root banner gone), **Card Suite Lite**, **Prex**, **PayPal**. Binance fully functional.
- [x] PayPal (`com.paypal.android.p2pmobile`) — **unresolved**: Oslo RASP still throws `RootDetectionSecurityException: s=root` (~2–30 s after launch) despite full vector coverage.
- [x] Installed camera: **Shamim's SGCam 8.5.300** via adb (config `Redmi-Note-13-Pro.xml` at `/sdcard/SGCAM/8.5.300/XML/`; one-time in-app import; Aperture kept as fallback).

### Why PayPal still refuses (vector checklist)

Hardware attestation (MEETS_DEVICE), clean props, mount-clean/unmapped processes (incl. `_zygote` sub-entry and IsolatedProcess), `chmod 000 /proc/net/unix` persisted in `/data/adb/service.d/bootudsbypass.sh`, correct patch in Tricky Store, fresh PIF fingerprints — all verified, detection persists. Remaining suspects: private Oslo signal or server-side device-history verdict. **Decision: use PayPal via browser; app left as-is.** Zygisk Next 1.5.0 was tried in place of built-in Zygisk and left installed (no measurable benefit either way).

### Operational learnings

1. **Tricky Store keybox format is finicky**: the upstream Yurikey `key` file has mangled PEM markers — rebuild `keybox.xml` element-by-element (`-----BEGIN X-----` + 64-char wrapped body + `-----END X-----`), never bulk-strip text (marker words fold into base64).
2. **Wipe `/data/adb/tricky_store/key_db`** whenever `keybox.xml` changes — TS caches generated attest keys in sqlite and keeps serving software chains from stale cache.
3. **Shamiko snapshots the denylist at zygote boot** — denylist edits need a reboot before new (incl. app-zygote) processes honor them.
4. Tricky Store's daemon runs detached (`nohup ./daemon &`); the Oct 3 reboot storm stays inconclusive (pstore wiped by reboots; diagnostic recipe noted in maintenance log).

## Related

- [[redmi-note-13-pro-5g]]: hardware specs and build audit
- [[workspace-standardization]]: workspace environment inventory
