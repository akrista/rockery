---
title: "garnet: Installed Apps & Phone Status"
date: 2026-10-12
tags:
  - smartphones
  - android-systems
  - hardware-projects
  - lineageos
  - tinkering
---

Live inventory of the **Redmi Note 13 Pro 5G ([[redmi-note-13-pro-5g|garnet]])**: installed apps with descriptions, phone status snapshotted over ADB, and mobile lines.

## Phone Status

Snapshot taken **2026-10-12** via `dumpsys` / `getprop`.

| Property       | Value                                                         |
| -------------- | ------------------------------------------------------------- |
| OS             | LineageOS 23.2 (Android 16), build `BP4A.251205.006`          |
| Active slot    | `_a`                                                          |
| SoC            | Snapdragon 7s Gen 2 (`SM7435`, `qcom`)                        |
| Battery        | 87 %, charging (AC + USB)                                     |
| Battery health | 4.903 / 5.100 mAh design → **~96 %**                          |
| Storage        | 157 GB used / 485 GB total (33 %)                             |
| Uptime         | 20 h 52 m                                                     |
| Root           | Magisk + Shamiko (see [[setup-magisk-play-integrity-garnet]]) |
| Remote access  | ADB over USB (`5d7f0a9e`) and Wi-Fi (`192.168.0.16:5555`)     |

## Mobile Lines

| Slot | Carrier                         | Status                  | Notes                                                     |
| ---- | ------------------------------- | ----------------------- | --------------------------------------------------------- |
| 1    | **Personal** (AR, PLMN `72234`) | Registered, LTE + IWLAN | Voice/SMS home network, data over Wi-Fi calling preferred |
| 2    | —                               | `NOT_READY` / empty     | No line installed                                         |

- Cell signal (RSRP −92 dBm, level 4 of 5) — good indoor reception.
- Number not exposed via `gsm.sim.msisdn` (carrier doesn't publish it to the OS).

## Installed Apps

175 third-party packages as of 2026-10-12. Grouped by purpose; package id kept for adb references. Descriptions marked **(?)** were inferred from the package id.

### Termux / device tooling

| App / Package                                                      | Description                                            |
| ------------------------------------------------------------------ | ------------------------------------------------------ |
| Termux · `com.termux`                                              | Linux terminal environment, the automation backbone    |
| Termux:API · `com.termux.api`                                      | Bridge between Termux and Android APIs                 |
| Termux:Boot · `com.termux.boot`                                    | Run scripts at device boot                             |
| Termux:Widget · `com.termux.widget`                                | Shortcuts to Termux scripts on launcher                |
| Termux:Tasker · `com.termux.tasker`                                | Run Termux scripts from Tasker                         |
| Termux:Window · `com.termux.window`                                | Floating terminal window                               |
| TermuxHub · `com.maazm7d.termuxhub`                                | Termux script manager                                  |
| PuppyGit Pro · `com.catpuppyapp.puppygit.play.pro`                 | Git client for Termux/Android                          |
| PlainApp · `com.ismartcoding.plain`                                | Web-based file/device manager                          |
| Material Files · `me.zhanghai.android.files`                       | Open-source file manager                               |
| Shizuku · `moe.shizuku.privileged.api`                             | Privileged API access without root                     |
| Dhizuku · `com.rosan.dhizuku`                                      | Delegates device-owner privileges to other apps        |
| Aves · `deckers.thibault.aves`                                     | Gallery app with strong metadata support               |
| Hail · `com.aistra.hail`                                           | App hider / freezer                                    |
| APK Extractor · `axp.tool.apkextractor`                            | Export installed APKs                                  |
| Aurora Store · `com.aurora.store`                                  | FOSS Play Store client                                 |
| Droid-ify · `com.looker.droidify`                                  | F-Droid client                                         |
| F-Droid · `org.fdroid.fdroid`                                      | F-Droid catalog                                        |
| Project Toolbox (?) · `com.wstxda.toolkit`                         | Multi-tool utilities                                   |
| PDF Reader+ · `com.foobnix.pro.pdf.reader`                         | PDF reader                                             |
| MJ PDF · `com.gitlab.mudlej.MjPdfReader`                           | Lightweight PDF reader (Moon+ based?)                  |
| Kde Connect · `org.kde.kdeconnect_tp`                              | Phone ↔ desktop sync                                   |
| LocalSend · `org.localsend.localsend_app`                          | LAN file transfer                                      |
| RustDesk · `com.carriez.flutter_hbb`                               | Remote desktop                                         |
| Syncplay · `com.yuroyami.syncplay`                                 | Synchronized media watching                            |
| SD Maid SE · `eu.darken.sdmse`                                     | Storage cleaner                                        |
| Amarok (FOSS) · `deltazero.amarok.foss`                            | Hider for privacy apps                                 |
| ProofMode · `org.witness.proofmode`                                | Cryptographic media attestation                        |
| Key Attestation · `io.github.vvb2060.keyattestation`               | Hardware key attestation check                         |
| Play Integrity Checker · `com.henrikherzig.playintegritychecker`   | Verifies Integrity verdict status                      |
| Network Scanner (?) · `com.victorb.androidnetworkscanner`          | LAN device scanner                                     |
| Ning · `de.csicar.ning`                                            | Port/network scanner                                   |
| WiFi Analyzer · `com.vrem.wifianalyzer`                            | Wi-Fi spectrum analyzer                                |
| NFC Tools / NFC Tasks · `com.wakdev.wdnfc` / `com.wakdev.nfctasks` | NFC tag reading and automation                         |
| Rose/App (?) · `com.roxum`                                         | Roxum utility (?)                                      |
| unknown · `uquxesec.yij`, `dev.daily`                              | Sideloaded, unidentified — audit and clean             |
| WebAPKs · `org.chromium.webapk.*` (3×)                             | PWAs auto-generated by Chrome, safe to ignore in lists |

### Communication

| App / Package                                          | Description                    |
| ------------------------------------------------------ | ------------------------------ |
| WhatsApp · `com.whatsapp`                              | Main messaging channel         |
| WhatsApp Business · `com.whatsapp.w4b`                 | Second number / merchant chats |
| Signal · `org.thoughtcrime.securesms`                  | E2EE messaging                 |
| Telegram · `org.telegram.messenger.web`                | Communities and channels       |
| Messenger · `com.facebook.orca`                        | Facebook messaging             |
| Discord · `com.discord`                                | Communities / gaming chats     |
| KakaoTalk · `com.kakao.talk`                           | Korean contacts                |
| LINE · `jp.naver.line.android`                         | JP/TW contacts                 |
| Battle.net · `com.blizzard.messenger`                  | Blizzard friends chat          |
| Snapchat · `com.snapchat.android`                      | Ephemeral social               |
| Briar · `org.briarproject.briar.android`               | Peer-to-peer offline messaging |
| Google Messages · `com.google.android.apps.messaging`  | SMS/RCS fallback               |
| Bitsie (?) · `app.coreply.coreplyapp`                  | Coreply AI reply assistant (?) |
| Jomi (?) · `llc.app.jomi.jomi`                         | Unknown / sideloaded           |
| Meet (Duo) · `com.google.android.apps.tachyon`         | Video calls                    |
| Gmail · `com.google.android.gm`                        | Email                          |
| Thunderbird · `net.thunderbird.android`                | FOSS email client              |
| Outlook · `com.microsoft.office.outlook`               | Work email                     |
| Google Contacts · `com.google.android.contacts`        | Contacts                       |
| Google Translate · `com.google.android.apps.translate` | Translation                    |
| RTranslator · `nie.translator.rtranslator`             | FOSS offline translation       |
| Microsoft Teams · `com.microsoft.teams`                | Work meetings                  |
| Zoom · `us.zoom.videomeetings`                         | Video conferencing             |

### Social / content

| App / Package                                           | Description                                        |
| ------------------------------------------------------- | -------------------------------------------------- |
| Instagram · `com.instagram.android`                     | Social                                             |
| Threads · `com.instagram.barcelona`                     | Text-based Meta network                            |
| Facebook · `com.facebook.katana`                        | Social                                             |
| TikTok · `com.zhiliaoapp.musically`                     | Short video                                        |
| Reddit · `com.reddit.frontpage`                         | Forums                                             |
| X (Twitter) · `com.twitter.android`                     | Microblogging                                      |
| Grok · `ai.x.grok`                                      | X's AI assistant                                   |
| LinkedIn · `com.linkedin.android`                       | Professional network                               |
| Snapchat · (above)                                      | —                                                  |
| Medium · `com.medium.reader`                            | Long-form articles                                 |
| Wikipedia · `org.wikipedia`                             | Offline-friendly encyclopedia                      |
| Twitch · `tv.twitch.android.app`                        | Live streaming                                     |
| YouTube · `com.google.android.youtube`                  | Video                                              |
| YouTube Music · `com.google.android.apps.youtube.music` | Music                                              |
| Google Photos · `com.google.android.apps.photos`        | Photo library                                      |
| Shazam · `com.shazam.android`                           | Music recognition                                  |
| FUTO PlatformPlayer · `com.futo.platformplayer`         | Self-hosted video/podcast player                   |
| FreeTube-type (?) · `dev.twilitrealm.dusk`              | Unknown / sideloaded                               |
| Gemini · `com.google.android.apps.bard`                 | Google AI assistant                                |
| Claude · `com.anthropic.claude`                         | AI assistant                                       |
| Luma · `com.luma.mobile` / `com.luma.studio`            | AI video generation                                |
| Clarity (?) · `com.microsoft.clarity`                   | Analytics SDK — likely unused, candidate to remove |

### Banking / payments (VE + AR)

> Low-privilege list because of Play Integrity bypass (see [[setup-magisk-play-integrity-garnet]]).

| App / Package                                          | Description                              |
| ------------------------------------------------------ | ---------------------------------------- |
| Mercado Pago · `com.mercadopago.wallet`                | AR/VE payments — needs Integrity passing |
| Banco de Venezuela · `com.bancodevenezuela.bdvdigital` | VE banking                               |
| Banesco · `com.banesco.samfbancamovilunificada`        | VE banking                               |
| Mercantil Banco · `com.mercantilbanco.mercantilmovil`  | VE banking                               |
| Mercantil Seguros · `com.mercantilseguros.client`      | VE insurance                             |
| Bancaribe · `com.bancaribe.compraacuotas`              | VE banking                               |
| Bancamiga · `com.bancamiga`                            | VE banking                               |
| Banplus Pay · `com.asociadosgerenciales.banpluspay`    | VE payments                              |
| Applemon Cash (?) · `com.applemoncash`                 | VE cash app                              |
| Kontigo · `com.kontigo.lat`                            | USD remittances                          |
| Zinli · `com.zinli.app`                                | VE digital wallet                        |
| FinityPay (?) · `com.finitypay`                        | VE payments                              |
| Facebank (?) · `com.facebank2.mobile`                  | VE finance                               |
| Binance · `com.binance.dev` — crypto exchange          |
| MetaMask · `io.metamask`                               | Crypto wallet                            |
| Uphold · `com.uphold.wallet`                           | Multi-asset wallet                       |
| Google Wallet · `com.google.android.apps.walletnfcrel` | NFC payments                             |

### Shopping / food / mobility (AR/VE)

| App / Package                                           | Description         |
| ------------------------------------------------------- | ------------------- |
| Mercado Libre · `com.mercadolibre`                      | Marketplace         |
| Coto · `com.coto.cotodigital` / `com.coto.superapp`     | AR supermarket      |
| Supermercados Día · `ar.com.supermercadosdia.customers` | AR supermarket      |
| Carrefour · `ar.com.carrefourargentina.app`             | AR supermarket      |
| Bandana (?) · `com.bandana.bandana`                     | AR shopping app     |
| Farmatodo · `com.farmatodo.app.ve`                      | VE pharmacy         |
| PedidosYa · `com.pedidosya`                             | Food delivery       |
| Yummy Customer · `com.yummy.customer`                   | AR food delivery    |
| Uber · `com.ubercab`                                    | Mobility            |
| Cabify · `com.cabify.rider`                             | Mobility            |
| Personal · `ar.com.personal` / `com.orange.miorange`    | Carrier apps        |
| Movistar · `com.telefonica.movistar`                    | Carrier app         |
| Digitel · `com.moonshot.digitel.app`                    | VE carrier app      |
| Sube · `com.sube.app`                                   | AR transit card     |
| Avellaneda A Toque (?) · `com.avellanedaaltoque.aat`    | Local municipal app |
| Prex (?) · `air.PrexArgentina`                          | Payments            |
| Yummy Rides · `com.yummyrides`                          | Ride/rider app      |
| Ridery · `com.ridery`                                   | AR ride-share       |
| Airbnb · `com.airbnb.android`                           | Accommodation       |
| DiDi · `com.didiglobal.passenger`                       | Mobility            |

### Media / files / cloud

| App / Package                                                 | Description              |
| ------------------------------------------------------------- | ------------------------ |
| Spotify · `com.spotify.music`                                 | Streaming music          |
| Fossify Music Player · `org.fossify.musicplayer`              | Local music              |
| Fossify Voice Recorder · `org.fossify.voicerecorder`          | Recorder                 |
| Transistor · `org.y20k.transistor`                            | FOSS radio streaming     |
| mpv · `is.xyz.mpv`                                            | Video player             |
| VLC · `org.videolan.vlc`                                      | Video player             |
| Kodi · `org.xbmc.kodi`                                        | Media center             |
| Kotatsu · `io.github.kotatsuredo.kotatsu`                     | Manga reader             |
| Immich · `app.alextran.immich`                                | Self-hosted photo backup |
| Google Drive · `com.google.android.apps.docs`                 | Cloud storage            |
| Google Sheets · `com.google.android.apps.docs.editors.sheets` | Spreadsheets             |
| OneDrive · `com.microsoft.skydrive`                           | Cloud storage            |
| MEGA · `mega.privacy.android.app`                             | Cloud storage            |
| BitTorrent (?) · `com.bittorrent.client`                      | Torrent client           |
| Files by Google · `com.google.android.apps.nbu.files`         | File manager             |
| Brave · `com.brave.browser`                                   | Chromium browser         |
| Chrome · `com.android.chrome`                                 | Chromium browser         |
| Firefox · `org.mozilla.firefox`                               | Gecko browser            |
| Kiwix · `org.kiwix.kiwixmobile.standalone`                    | Offline Wikipedia reader |

### VPN / privacy / security

| App / Package                                           | Description                   |
| ------------------------------------------------------- | ----------------------------- |
| WireGuard · `com.wireguard.android`                     | Fast VPN tunnel               |
| Mullvad · `net.mullvad.mullvadvpn`                      | Anonymous VPN                 |
| OpenVPN · `net.openvpn.openvpn`                         | Legacy VPN                    |
| Shadowsocks · `com.github.shadowsocks`                  | Proxy client                  |
| Tor Browser · `org.torproject.torbrowser`               | Censorship-resistant browsing |
| Bitwarden · `com.x8bit.bitwarden`                       | Password manager              |
| Bitwarden Authenticator · `com.bitwarden.authenticator` | TOTP                          |
| SecScanQR · `de.t_dankworth.secscanqr`                  | QR scanner                    |

### Remote / gaming

| App / Package                                                          | Description                                        |
| ---------------------------------------------------------------------- | -------------------------------------------------- |
| Limelight · `com.limelight`                                            | Sunshine/GameStream client — streams desktop games |
| Steam Link · `com.valvesoftware.steamlink`                             | Steam remote play                                  |
| Moonlight-adjacent?? · `com.xiaoji.xtouch.google`                      | GameSir-ish controller tool (?)                    |
| Flipper Zero · `com.flipperdevices.app`                                | Multi-tool device companion                        |
| Xbox · `com.microsoft.xboxone.smartglass`                              | Xbox companion                                     |
| Steam · `com.valvesoftware.android.steam.community`                    | Steam mobile                                       |
| Steam Friends (website?) · `com.valvesoftware.android.steam.friendsui` | Steam friends list                                 |
| Epic Games · `com.epicgames.portal`                                    | Fortnite store                                     |
| Warframe Mobile · `com.digitalextremes.warframemobile`                 | Crossplay shooter                                  |
| Warframe Companion · `com.digitalextremes.warframenexus`               | Companion app                                      |
| Helltaker (NeutroTeam) · `com.NeutroTeam.Helltaker`                    | Puzzle game port                                   |
| Awaria (NeutroTeam) · `com.NeutroTeam.Awaria`                          | Puzzle game port (?), sideloaded                   |
| MechaBreak/Exo?? (?) · `com.bifrosttech.jump`                          | Unknown / sideloaded                               |
| PPSSPP · `org.ppsspp.ppsspp`                                           | PSP emulator                                       |
| RetroArch · `com.retroarch`                                            | Multi-console emulator                             |
| SuperTuxKart · `org.supertuxkart.stk`                                  | FOSS kart racer                                    |
| Breakout (?) · `me.lecaro.breakout`                                    | Casual breakout                                    |
| FNF (?) · `me.funkin.fnf`                                              | Friday Night Funkin mobile                         |
| CrossCode · `de.radicalfishgames.crosscode`                            | Action RPG port                                    |
| Snake Reborn (?) · `com.snakereborn.app`                               | Casual snake                                       |
| 2048 · `org.andstatus.game2048`                                        | Sliding puzzle                                     |
| Mental Math · `com.helddertierwelt.mentalmath`                         | Brain training                                     |
| Forkyz · `app.crossword.yourealwaysbe.forkyz`                          | Crossword/Cryptic source pack                      |
| SGTPuzzles · `name.boyle.chris.sgtpuzzles`                             | Simon Tatham's puzzle collection port              |
| Doodle · `xyz.zedler.patrick.doodle`                                   | FOSS drawing app                                   |
| Memeboard (?) · `com.bluefirestudios.memeboard`                        | Meme keyboard                                      |
| OMG Soundboard · `audio.omgsoundboard`                                 | Sound board                                        |
| Google Calendar · `com.google.android.calendar`                        | Planner                                            |
| Google Keep · `com.google.android.keep`                                | Notes                                              |
| Trail Sense · `com.kylecorry.trail_sense`                              | Outdoor toolkit (compass, barometer)               |
| Stride · `org.stridetasks.stride`                                      | Task tracker                                       |
| Doodle (?) — `xyz.zedler.patrick.doodle`                               | See above                                          |
| Kanade · `io.alexrintt.kanade`                                         | Unknown, sideloaded                                |
| Dusk · `dev.twilitrealm.dusk`                                          | Unknown, sideloaded                                |
| Termix · `com.karmaa.termix`                                           | Termux alternative (?)                             |
| LibreCuts · `com.tharunbirla.librecuts`                                | Unknown, sideloaded                                |
| Podroid · `com.excp.podroid`                                           | Podcast app, sideloaded                            |
| Connect Enduser · `com.connect.enduser`                                | Unknown runtime/service, sideloaded                |
| PhotosWoooper · `com.example.photoswooper`                             | Self-compiled dev build (`com.example.*`) — review |
| GCam (Shamim) · `com.shamim.cam`                                       | Google Camera port                                 |
| Gboard · `com.google.android.inputmethod.latin`                        | Keyboard                                           |
| ARCore · `com.google.ar.core`                                          | AR runtime                                         |
| SafetyCore / contactkeys / verifier                                    | Play/Android system services — not cleanup targets |
| Office · `com.microsoft.office.officehubrow`                           | MS Office suite                                    |

### Cloud consoles / dev

| App / Package                                        | Description                |
| ---------------------------------------------------- | -------------------------- |
| AWS (?) · `com.amazonaws.awsconsole` — not detected  |
| GCP Console · `com.google.android.apps.cloudconsole` | Google Cloud admin         |
| Google Cloud (?) · `com.google.android.apps.giant`   | Smart device companion (?) |
| Azure (?) · `com.microsoft.azure`                    | Azure management           |
| Authenticator · `com.azure.authenticator`            | Microsoft MFA              |
| GitHub · `com.github.android`                        | Repos and PRs              |

## Hygiene

Every routine snapshot uses `adb shell dumpsys battery` for battery state, `adb shell getprop gsm.sim.operator.alpha` for active carriers, and `adb shell pm list packages -3` for the app list. Apps found under `com.example.*` or with unreadable package names are flagged — they usually come from personal dev builds or sideloading and should be reviewed (and usually removed).

## Related

- [[redmi-note-13-pro-5g]] — hardware reference
- [[setup-magisk-play-integrity-garnet]] — why bank/watch apps need special handling
- [[wifi-pentesting-basics]] — Wi-Fi-side security work
