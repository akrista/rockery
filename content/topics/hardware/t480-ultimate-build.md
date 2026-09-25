---
title: "ThinkPad T480 Ultimate Build"
date: 2026-08-22
tags:
  - thinkpads
  - hardware-projects
  - linux-systems
  - laptop-upgrades
  - tinkering
---

The **ThinkPad T480** (model 20L50067US) is a 2018 business laptop with an 8th Gen Intel quad-core CPU, dual storage slots, upgradable RAM, and the last ThinkPad generation to feature both an internal and a hot-swappable external battery. This document tracks the upgrade roadmap toward the "ultimate" T480 build.

## Current Specs (Audited September 2026)

| Component           | Detail                                                                                                                                                                                             |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Model**           | ThinkPad T480 `20L50067US`                                                                                                                                                                         |
| **CPU**             | Intel Core i5-8250U (4C/8T, 1.6–3.4 GHz, Kaby Lake Refresh)                                                                                                                                        |
| **RAM**             | 16 GB DDR4 (2× 8 GB Samsung DDR4-3200 `M471A1G44CB0-CWE` @ 2400 MT/s dual-channel, both slots full)                                                                                                |
| **Storage**         | Samsung PM9B1 512 GB NVMe (`MZVL4512HBLU-00BH1`) in main 2.5" bay caddy (PCIe 3.0 x2). WWAN slot: **Empty**                                                                                        |
| **GPU**             | Intel UHD Graphics 620 (integrated UMA, no dGPU currently)                                                                                                                                         |
| **Display**         | 14.0" LG `LP140WF6-SPB7` (1920×1080 FHD IPS, 250 nits, ~45% NTSC / 60% sRGB)                                                                                                                       |
| **WiFi**            | Intel Wireless-AC 8265 (802.11ac, BT 4.2, M.2 2230)                                                                                                                                                |
| **Batteries**       | **BAT0 (Internal)**: `01AV489` (24 Wh design, 16.6 Wh capacity, **69.4% health**, 51 cycles)<br>**BAT1 (External)**: `01AV452` (24 Wh slim design, 21.1 Wh capacity, **88.0% health**, 127 cycles) |
| **Thunderbolt**     | Controller NVM **v20.00** (Verified safe from critical EEPROM corruption wear bug)                                                                                                                 |
| **BIOS**            | N24ET81W (v1.56, September 2025; updated, latest microcode & thermal tables)                                                                                                                       |
| **Cooling**         | Stock single-pipe heatsink. `throttled` active (-80mV core/cache undervolt, PL1: 29W, PL2: 44W). Hardware repaste (PTM7950) still needed                                                           |
| **Power / Charger** | Currently using a barrel/slim-tip charger with a loose Type-C adapter dongle (temporary/cumbersome)                                                                                                |
| **OS**              | Debian GNU/Linux 13 (Trixie), Kernel 6.12                                                                                                                                                          |

---

## Motherboard Forward-Compatibility Strategy

> [!IMPORTANT]
> Since the ultimate goal is swapping the motherboard to the **i7-8550U + NVIDIA GeForce MX150 SWG** planar (`Lenovo BDPlanar Win,i7-8550U,TPM2,SWG`), **all peripheral upgrades must be 100% forward-compatible** so no component is purchased twice:
>
> - **Dual-Pipe Heatsink (`01YR200`/`01YR202`)**: Sits on both UMA and dGPU boards. On the UMA board it cools the CPU with both pipes; on the dGPU board it directly covers both the CPU and the MX150 GPU dies.
> - **Charger (65W–100W USB-C GaN)**: The UMA board only needs 45W, but the MX150 dGPU board draws up to 60W–65W under combined CPU+GPU loads. Buying a 65W–100W GaN charger now ensures full power on both boards.
> - **RAM, Storage, WiFi, Display & Batteries**: All interface connectors (DDR4 SODIMM, M.2 2242, M.2 2230 Key-E, 30-pin eDP, internal/external battery interfaces) are identical across both motherboards.

---

## Upgrade Roadmap (Performance First)

### Priority 1: Sustained Performance & Thermal Overhaul

| Upgrade                                      | Status        | Detail                                                                                                                                                               | Forward Compatible?                  |
| -------------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| **Thermal Repaste (PTM7950)**                | Immediate     | Apply **Honeywell PTM7950** phase-change pad (40×80mm sheet). Drops temps by 10°C–15°C, cures paste pump-out. Leaves plenty of material for the future dGPU repaste. | Yes (Sheet provides 4+ applications) |
| **Dual-Pipe Heatsink (`01YR200`/`01YR202`)** | High ROI      | Replaces single-pipe cooler. Provides immediate thermal headroom for i5-8250U, and is the **exact mandatory heatsink** for the future MX150 dGPU board.              | Yes (Mandatory for dGPU board)       |
| **Linux Software Tuning (`throttled`)**      | **Completed** | `throttled` service enabled on boot. Core/Cache: -80mV, GPU: -40mV, PL1: 29W, PL2: 44W, Trip Temp: 95°C (AC) / 90°C (Battery).                                       | Yes                                  |
| **BIOS & Microcode Update**                  | **Completed** | Flashed to UEFI BIOS **v1.56** (`N24ET81W`, 2025-09-06) with updated Intel microcode and EC thermal trip tables.                                                     | Board-specific                       |

### Priority 2: Power Supply & Battery Autonomy

| Upgrade                                     | Status        | Detail                                                                                                                                                                                                                          | Forward Compatible?           |
| ------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| **All-in-One USB-C GaN Charger (65W–100W)** | High Priority | Replace the loose adapter dongle with a multi-port **USB-C GaN PD 3.0 charger** (e.g. Ugreen Nexode 65W/100W or Lenovo 65W USB-C `ADLX65YLC2D`). Guarantees clean 20V/3.25A+ power for both current UMA and future MX150 board. | Yes (100% universal USB-C PD) |
| **72 Wh External Battery (`61++`)**         | Planned       | Replace slim 24 Wh external battery (`01AV452`) with genuine/OEM 72 Wh pack (FRU `01AV427` / `01AV428` / `SB10K97585`). Increases total capacity to **96 Wh** (~10–14 hours runtime).                                           | Yes                           |

### Priority 3: Expansion & Memory

| Upgrade                    | Status  | Detail                                                                                                                                                         | Forward Compatible? |
| -------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| **RAM → 32 GB or 64 GB**   | Planned | 2×16 GB or 2×32 GB DDR4-3200 SODIMMs (runs @ 2400 MT/s). Replaces current 2×8 GB Samsung sticks.                                                               | Yes                 |
| **Second SSD (WWAN slot)** | Planned | M.2 2242 NVMe PCIe SSD (B+M key, e.g. WD SN520) or M.2 2230 NVMe (Kioxia BG4/BG5) with 2230-to-2242 extension bracket. Fast dedicated scratch/dual-boot drive. | Yes                 |
| **WiFi → Intel AX210**     | Planned | Intel AX210NGW (Wi-Fi 6E 160MHz + BT 5.3). Upgrades stock AC 8265. Direct swap in M.2 2230 Key-E slot.                                                         | Yes                 |

### Priority 4: Visuals & Ergonomics

| Component           | Status   | Detail                                                                                                                                              |
| ------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Display Upgrade** | Optional | Swap stock 250-nit / 45% NTSC LG panel for **Innolux N140HCG-GQ2** (400 nits, 100% sRGB, low-power IGZO, 30-pin eDP). Requires bracket adapter kit. |
| **Glass Touchpad**  | Optional | Drop-in glass touchpad from ThinkPad X1 Extreme Gen 1 / P1 (FRU `01LX660` / `01LX661` / `01LX662`). Native Linux support for Synaptics hardware.    |
| **Keyboard**        | Done     | Backlit keyboard already installed and functional.                                                                                                  |

---

## Argentina Procurement & Pricing Guide (2026)

### Best Local vs Import Purchasing Channels

| Component                                    | Recommended Channel                     | Estimated Price (ARS / USD)                                                                        | Notes & Strategy                                                                                                   |
| -------------------------------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Honeywell PTM7950** (40×80mm)              | **MercadoLibre Argentina**              | **~$31,000 – $33,000 ARS** (~$25–$28 USD)                                                          | In stock locally with fast delivery (24–48h). Best immediate thermal investment.                                   |
| **All-in-One GaN Charger** (65W/100W)        | **MercadoLibre Argentina** / **Amazon** | **~$98,000 – $130,000 ARS** (Ugreen 65W GaN)<br>**~$40,500 – $70,000 ARS** (Lenovo OEM 65W Type-C) | Get a multi-port GaN (Ugreen Nexode/Anker) or genuine Lenovo 65W USB-C brick (`ADLX65YLC2D`) to eliminate dongles. |
| **Dual-Pipe Heatsink** (`01YR200`/`01YR202`) | **AliExpress** (Puerta a Puerta)        | **~$13 – $18 USD** (~$18,000 – $25,000 ARS)                                                        | Far cheaper on AliExpress than local imports ($60k+ ARS). Ships via Correo Argentino.                              |
| **Intel AX210 WiFi 6E**                      | **AliExpress** (Puerta a Puerta)        | **~$15 – $20 USD**                                                                                 | Under $400 allowance. Pick `AX210NGW` (non-vPro).                                                                  |
| **2230-to-2242 M.2 Extender**                | **AliExpress**                          | **~$2 – $4 USD**                                                                                   | Required if using modern 2230 NVMe drives in WWAN slot.                                                            |
| **32 GB RAM Kit** (2×16 GB DDR4)             | **Amazon Global** / **Tiendamia**       | **~$55 – $65 USD** + ~$25 shipping/customs (~$85k–$110k ARS total)                                 | Local MercadoLibre charges ~$190k–$250k ARS per module; importing via courier is half the cost.                    |
| **72 Wh Battery** (`61++` 6-cell)            | **AliExpress** / **Tiendamia**          | **~$25 – $40 USD** (generic/OEM)                                                                   | Batteries have air freight restrictions on some couriers; AliExpress standard shipping or Tiendamia accepts them.  |

### Argentina Import Rules Summary (2026)

- **Correo Argentino (Puerta a Puerta / ARCA)**: Tax-free allowance of up to **$400 USD FOB per shipment** (up to 5 shipments/year for personal use). Declare tracking on [Portal de Envíos Internacionales de Correo Argentino](https://epago.correoargentino.com.ar) and pay the handling fee.
- **Courier Privado (Amazon Global / Tiendamia / DHL)**: Best for RAM and electronics above $50 where speed and warranty matter. Customs and door-to-door delivery handled automatically in 5–8 days.

---

## Upgrade Guides & Resources

| Task                               | Resource                                                                                                                                                                            |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Disassembly, RAM, SSD & Battery    | [Video walkthrough](https://www.youtube.com/watch?v=8HEAU71Jp1g)                                                                                                                    |
| Dual-pipe heatsink installation    | [Video walkthrough](https://www.youtube.com/watch?v=GUECUZi1NMk)                                                                                                                    |
| Motherboard swap & cephacore build | [cephacore T480 upgrade video](https://www.youtube.com/watch?v=uvBacehUmYM)                                                                                                         |
| Adding second SSD in WWAN slot     | [Video walkthrough](https://www.youtube.com/watch?v=Vkk9GoAFAmM)                                                                                                                    |
| Glass trackpad swap (X1E)          | [Video walkthrough](https://www.youtube.com/watch?v=E51a_fRZG7Y); [Driver notes](https://www.reddit.com/r/thinkpad/comments/jlbj1e/t480_trackpad_replacement_guide_windows_driver/) |
| Linux undervolting & tuning        | [lenovo-throttling-fix / throttled](https://github.com/erpalma/throttled)                                                                                                           |
| Buying & parts guide               | [The Ultimate ThinkPad T480 Buying Guide](https://www.reddit.com/r/thinkpad/comments/1cq3u2u/the_ultimate_thinkpad_t480_buying_guide/)                                              |

## Related

- [[Linux]]: primary OS running on this hardware
- [[hardware-projects]]: tracking hardware tinkering
