---
title: "Capturing and Inspecting Video Streams in Electron Applications"
date: 2026-08-03
tags:
  - electron
  - streaming
  - reverse-engineering
  - tools
---

Electron applications bundle Chromium and Node.js, making them popular for building cross-platform desktop video clients. Extracting, capturing, or reverse-engineering video streams from an Electron app requires different techniques depending on whether you have access to the source code or are inspecting a compiled binary.

---

## 1. In-App Video Capture (Developer Approach)

When developing or modifying an Electron application, native web and Node.js APIs provide full control over screen capture and stream re-direction.

### Desktop Capturer & MediaRecorder

Electron provides the **`desktopCapturer`** module to select specific windows or screens as a **`MediaStream`**:

```javascript
const { desktopCapturer } = require("electron")

async function getWindowStream() {
  const sources = await desktopCapturer.getSources({ types: ["window", "screen"] })
  const targetSource = sources[0] // Select target window

  return navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: "desktop",
        chromeMediaSourceId: targetSource.id,
      },
    },
  })
}
```

This stream can be recorded locally using the browser's **`MediaRecorder`** API into WebM or MP4 format.

### Live Streaming via FFmpeg Pipe

To stream video live to an RTMP/HLS ingestion server (e.g., NGINX-RTMP or Node-Media-Server), pass chunks from the renderer process into an **`FFmpeg`** child process in the main process. Using a synthetic audio source (`anullsrc`) prevents stream dropouts when no microphone audio is provided:

```javascript
const { spawn } = require("child_process")

const ffmpeg = spawn("ffmpeg", [
  "-f",
  "lavfi",
  "-i",
  "anullsrc", // Generate silent audio track
  "-i",
  "pipe:0", // Read video stream from stdin
  "-c:v",
  "libx264",
  "-preset",
  "ultrafast",
  "-tune",
  "zerolatency",
  "-c:a",
  "aac",
  "-f",
  "flv",
  "rtmp://live.example.com/app/stream_key",
])

// Pipe MediaRecorder blob chunks directly into ffmpeg.stdin
```

---

## 2. Reverse Engineering & Inspecting Compiled Electron Apps

When working with packaged production binaries, several external methodologies enable stream extraction and media analysis without source modification.

### A. Remote DevTools Inspection

Many packaged Electron applications inherit Chromium command-line flags. Launching the executable with remote debugging enabled opens the Chromium Inspector:

```bash
# Launch application with remote debugging port
./TargetApp.exe --remote-debugging-port=9222
```

Open `http://localhost:9222` or `chrome://inspect` in a standard browser to:

- Inspect DOM elements such as `<video>` tags and Video.js player instances.
- Inspect blob URLs (`blob:file://...`) bound to `HTMLVideoElement.src`.
- Analyze active Web Workers handling stream demuxing or decryption.

### B. Network Traffic Proxying

If the application streams media over HTTP/HLS (`.m3u8`, `.ts`) or WebRTC:

- **Proxy Configuration**: Configure tools like **`mitmproxy`**, **Charles**, or **Burp Suite** to intercept TLS traffic by installing a local CA certificate.
- **Electron Flag Injection**: Force proxying via CLI:
  ```bash
  ./TargetApp.exe --proxy-server="http://127.0.0.1:8080"
  ```
- **HLS Segment Extraction**: Filter captured traffic for `.m3u8` playlists and AES-128 segment encryption keys.

### C. OS-Level Graphics & Screen Capture via FFmpeg

For non-intrusive stream capture of rendered output, **`FFmpeg`** provides native display grabbers for each operating system:

#### 1. Windows (`gdigrab`)

Capture an active application window by title or full desktop:

```bash
# Grab specific window by exact title
ffmpeg -f gdigrab -framerate 30 -i title="Target App Window" -c:v libx264 output.mp4

# Grab full primary desktop
ffmpeg -f gdigrab -framerate 60 -i desktop -c:v libx264 -preset ultrafast output.mp4
```

#### 2. Linux (`x11grab`)

Capture X11 display server regions:

```bash
# Grab 1920x1080 region starting at X=100, Y=200
ffmpeg -f x11grab -framerate 30 -video_size 1920x1080 -i :0.0+100,200 -c:v libx264 output.mp4
```

#### 3. macOS (`avfoundation`)

Capture screen device streams:

```bash
# List available AVFoundation capture devices
ffmpeg -f avfoundation -list_devices true -i ""

# Capture screen device 1 without audio
ffmpeg -f avfoundation -framerate 30 -i "1:none" -c:v libx264 output.mp4
```

#### 4. Direct HLS Playlist Extraction

If an `.m3u8` playlist URL is extracted via DevTools or Proxying, stream and losslessly remux it directly:

```bash
ffmpeg -i "https://cdn.example.com/stream/playlist.m3u8" -c copy -bsf:a aac_adtstoasc output.mp4
```

### D. Dynamic Instrumentation with Frida

**`Frida`** allows runtime JavaScript injection directly into the running Electron process to hook lower-level media methods:

```javascript
// Hooking HTMLVideoElement srcObject assignment via Frida script
const videoProto = Uint8Array // Target prototype methods
Interceptor.attach(Module.getExportByName(null, "HTMLVideoElement_srcObject"), {
  onEnter(args) {
    console.log("[+] Intercepted MediaStream:", args[1])
  },
})
```

### E. ASAR Package Unpacking & Patching

Electron packages client code in `.asar` archives. Extracting and patching the archive allows injecting custom logging or enabling DevTools permanently:

```bash
# Install asar CLI tool
npm install -g asar

# Unpack application archive
asar extract app.asar ./unpacked_app

# Patch main.js to enable DevTools or custom preloads
# ...

# Repackage modified files
asar pack ./unpacked_app app.asar
```

---

## 3. HLS Player Mechanics & Web Worker AES Decryption

Modern Electron streaming clients frequently use **Video.js** coupled with custom HLS extensions and Web Workers for AES-128 segment decryption.

```
+-------------------+      +-------------------+      +-------------------+
|  Renderer Window  | ---> |   Web Worker      | ---> | Media Source Ext. |
|  (Video.js / DOM) |      | (AES Decrypter)   |      |  (MSE / Blob URL) |
+-------------------+      +-------------------+      +-------------------+
```

### Decryption Pipeline Breakdown

1. **Segment Fetching**: The player retrieves encrypted `.ts` video chunks and corresponding key fragments over HTTPS.
2. **Worker Offloading**: Encrypted ArrayBuffers, IVs, and AES keys are transferred to a dedicated Web Worker via `self.postMessage()`.
3. **AES-CBC Decryption**: The worker executes AES-CBC decryption (often using custom modules like `aes-decrypter`), strips PKCS#7 padding, and demuxes MPEG-TS into ISO BMFF (`avc1` video / `mp4a` audio).
4. **MSE Playback**: Decrypted ArrayBuffers return to the main thread and are appended to `MediaSource` buffer objects rendered by the HTML5 `<video>` tag (`blob:file://...`).

---

## Summary Matrix

| Approach                 | Latency    | Complexity | Prerequisites                | Primary Use Case                   |
| :----------------------- | :--------- | :--------- | :--------------------------- | :--------------------------------- |
| **DesktopCapturer API**  | Low        | Low        | Source Code Access           | In-app screen recording            |
| **FFmpeg Stdin Pipe**    | Low-Medium | Medium     | Source Code Access           | Live RTMP / HLS streaming          |
| **Remote DevTools**      | N/A        | Low        | CLI flag acceptance          | Network & DOM stream analysis      |
| **mitmproxy / Proxying** | Low        | Medium     | TLS Certificate Installation | Extracting HLS `.m3u8` URLs & keys |
| **ASAR Unpacking**       | N/A        | Medium     | Local filesystem access      | Patching client logic & flags      |
