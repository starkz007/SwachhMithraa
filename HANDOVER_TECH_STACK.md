# SwachhMitra (स्वच्छ मित्र) — Technical Handover & Architecture Guide

This document is the official technical handover guide for the **SwachhMitra Unified Civic Sanitation & Governance Platform**. It is written in straightforward English to explain **every technology in the tech stack**, its exact version, why it was chosen, how it works, and where it is located in the codebase.

---

## 1. Executive Summary of Tech Stack

| Layer | Technology | Exact Version | Primary Role | Where Used in Project |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend Framework** | **React** | `v18.3.1` | UI component tree, component lifecycles, and reactive rendering | Entire user interface (`src/`) |
| **DOM Renderer** | **React DOM** | `v18.3.1` | Mounts and syncs React components with the browser's DOM | `src/main.jsx` |
| **Build Tool & Dev Server**| **Vite** | `v5.4.14` | Ultra-fast Hot Module Replacement (HMR) and optimized rollup production bundling | `vite.config.js`, `package.json` |
| **Vite React Plugin** | **@vitejs/plugin-react** | `v4.3.4` | Enables Fast Refresh (Babel/SWC) for React in Vite | `vite.config.js` |
| **CSS Utility Framework** | **Tailwind CSS** | `v3.4.17` | Utility-first styling engine implementing the "Civic Radiance" design system | `tailwind.config.js`, `src/index.css` |
| **CSS Post-Processor** | **PostCSS** | `v8.4.49` | Transforms modern CSS and integrates Tailwind into Vite pipeline | `postcss.config.js` |
| **CSS Vendor Prefixing** | **Autoprefixer** | `v10.4.20` | Automatically appends vendor prefixes (`-webkit-`, `-moz-`) for cross-browser support | `postcss.config.js` |
| **Machine Learning Engine**| **TensorFlow.js (tfjs)** | `v4.22.0` | Browser-native hardware-accelerated (WebGL/WASM) machine learning runtime | `index.html`, `LiveCameraSurveillance.jsx` |
| **Vision Object Model** | **COCO-SSD** | `v2.2.3` | Pre-trained deep neural network that detects 80 standard everyday objects in real time | `index.html`, `LiveCameraSurveillance.jsx` |
| **Camera Hardware Stream**| **WebRTC MediaDevices API**| Native W3C Standard | Captures real-time video feed from connected USB cameras, webcams, or mobile phones | `src/views/cctv/LiveCameraSurveillance.jsx` |
| **Image & Canvas Processor**| **HTML5 Canvas 2D API**| Native HTML5 Standard | Frame extraction, stamping AI bounding boxes, SHA-256 watermarks, and optical evidence | `LiveCameraSurveillance.jsx`, `InteractiveMap.jsx` |
| **Audio Feedback System** | **Web Audio API** | Native W3C Standard | Generates synthetic dual-tone chimes without external MP3 files for instant feedback | `LiveCameraSurveillance.jsx` |
| **State Management** | **React Context API** | Native React 18 | Global single-source-of-truth state engine with localStorage persistence | `src/context/AppContext.jsx` |
| **Local Persistence** | **Browser LocalStorage API**| Native Web Storage | Preserves complaints, worker wallet credits, attendance punch-in, and language choice across refreshes | `src/context/AppContext.jsx` |
| **Icon Library** | **Google Material Symbols** | Google Fonts CDN | Civic iconography for all governance actions and status pills | `index.html`, throughout all views |
| **Vector Icon System** | **Lucide React** | `v1.16.0` | High-fidelity React SVG icons for modern UI controls | `package.json` |
| **Primary Typography** | **Plus Jakarta Sans** | Google Fonts CDN | Modern, readable, professional civic typography | `index.html`, `tailwind.config.js` |
| **Celebratory Feedback** | **Canvas Confetti** | `v1.9.4` | Physics-based particle celebration when a complaint is filed or reward redeemed | `RaiseGrievanceModal.jsx`, `RewardStoreModal.jsx` |

---

## 2. In-Depth Layer Breakdown

### Layer 1: Core Framework — React 18.3.1
- **What it is**: The industry-standard JavaScript library for building component-based user interfaces.
- **Why we use it**: SwachhMitra is a complex, 26-screen portal serving 6 different civic roles (Citizens, Sanitation Workers, Ward Admins, Zonal Admins, Central Leadership, and CCTV Ops). React enables us to break down screens into reusable, modular components that update instantly without reloading the browser.
- **How it functions**: When state changes (e.g., a camera detects garbage or a worker resolves a task), React's Virtual DOM calculates the minimum necessary changes and efficiently updates only the affected parts of the screen.
- **Where it is used**:
  - `src/App.jsx`: Main routing and role shell.
  - `src/context/AppContext.jsx`: Synchronized data store.
  - All 26 view components located in `src/views/`.

---

### Layer 2: Fast Bundler & Development Server — Vite 5.4.14
- **What it is**: A modern, extremely fast frontend build tool created by Evan You (creator of Vue).
- **Why we use it**: Traditional bundlers like Webpack become slow as projects grow. Vite uses native browser ES Modules during development, providing instant server bootup and sub-millisecond Hot Module Replacement (HMR). When building for production, it uses Rollup to create minified, tree-shaken chunks.
- **How it functions**:
  - `npm run dev`: Starts a local server that serves files on-demand without pre-bundling.
  - `npm run build`: Compiles JSX and Tailwind CSS into production-ready static assets in `dist/` in under 2 seconds.
  - `npm run preview`: Serves the production build locally to test true deployment behavior.
- **Where it is used**: Configured in `vite.config.js` and `package.json`.

---

### Layer 3: Design & Styling System — Tailwind CSS 3.4.17 + PostCSS + Autoprefixer
- **What it is**: A utility-first CSS framework combined with PostCSS for processing and Autoprefixer for cross-browser CSS prefixing.
- **Why we use it**: To implement the **Civic Radiance** design specification (`civic_radiance/DESIGN.md`) without writing thousands of lines of messy custom CSS files. It ensures consistent colors, spacing, borders, shadows, and glassmorphism across all 26 screens.
- **How it functions**:
  - Custom design tokens are defined in `tailwind.config.js`:
    - `primary`: `#002e87` (Deep Civic Navy / Ashoka Blue)
    - `secondary`: `#1b4332` (Sovereign Clean Green)
    - `tertiary`: `#d97706` (Civic Amber)
    - `surface-container-lowest`: Pure card backgrounds
    - Glassmorphism: `backdrop-blur-md`, subtle translucent borders
- **Where it is used**:
  - Config: `tailwind.config.js`, `postcss.config.js`
  - Global styles: `src/index.css`
  - Inline utility classes across all JSX templates.

---

### Layer 4: Edge AI & Neural Vision — TensorFlow.js 4.22.0 + COCO-SSD 2.2.3
- **What it is**: Google's client-side Machine Learning library that executes deep neural networks directly in the user's web browser using WebGL GPU hardware acceleration.
- **Why we use it**:
  - **Zero Server Costs**: AI inference runs entirely on the user's device (phone, laptop, or edge camera PC) without expensive cloud GPU servers.
  - **Data Privacy**: Video frames are analyzed locally in browser memory and are **never** streamed to a third-party server.
  - **Zero-Latency Real-Time Analysis**: Can process 8 to 15 frames per second in real time.
- **How it functions**:
  1. COCO-SSD detects 80 classes of objects using a MobileNet convolutional neural network.
  2. Our system separates detected objects into two strict categories:
     - **Definitive Civic Waste Items**: `bottle` (plastic bottle/can), `cup` (paper cup litter), `box` (cardboard carton), `bowl` (takeout container), `banana`, `apple`, `orange`, `sandwich`, `pizza` (organic food waste).
     - **Explicitly Excluded Non-Waste Items**: `person` (human/citizen), `cell phone`, `laptop`, `keyboard`, `mouse`, `book`, `chair`, `desk`, `dog`, `cat`.
  3. **Simultaneous Human Protection & Waste Co-Detection**: If a citizen is holding a bottle or standing next to garbage, the AI draws a **blue box** on the human (citizen safe) and a **red glowing box** on the bottle (waste locked).
  4. **Zero-Click 2-Second Autonomous Filing**: If waste is held in view for 2 continuous seconds, a system timer ref triggers `autoRaiseTicket()`. It stamps an AI bounding box and cryptographic GPS watermark on the frame, plays an alert chime, and dispatches the complaint directly to municipal workers.
- **Where it is used**:
  - Scripts loaded in: `index.html` (lines 12–13)
  - Core logic: `src/views/cctv/LiveCameraSurveillance.jsx`

---

### Layer 5: Camera & Media Access — WebRTC `navigator.mediaDevices`
- **What it is**: The standard HTML5 / WebRTC browser API for accessing connected media input devices (webcams, USB phone cameras, integrated laptop cameras).
- **Why we use it**: Allows the user to connect an Android/iOS smartphone via USB (running as a webcam using apps like DroidCam/Camo/Native USB Webcam) or use their computer webcam to point at physical garbage in real time.
- **How it functions**:
  - `navigator.mediaDevices.enumerateDevices()` discovers all connected camera hardware.
  - `navigator.mediaDevices.getUserMedia({ video: ... })` streams the camera feed into an HTML5 `<video>` element with zero plugins required.
- **Where it is used**:
  - `src/views/cctv/LiveCameraSurveillance.jsx`

---

### Layer 6: Audio Synthesizer — Web Audio API
- **What it is**: The browser's native low-latency audio processing and synthesis architecture.
- **Why we use it**: Provides instant, clean audio feedback ("chime") the moment garbage is verified and filed, without needing to download or bundle external `.mp3` or `.wav` sound files.
- **How it functions**: Creates an `AudioContext`, attaches an oscillator producing a pleasing harmonic chord (D5 at 587 Hz transitioning to A5 at 880 Hz), applies an exponential gain envelope, and routes it to system speakers.
- **Where it is used**:
  - Function `playChime()` in `src/views/cctv/LiveCameraSurveillance.jsx`.

---

### Layer 7: Global Reactive State & Persistence — React Context + LocalStorage
- **What it is**: React's built-in state broadcasting system combined with browser local key-value storage.
- **Why we use it**: Keeps all 6 civic roles synchronized without requiring heavy third-party state libraries like Redux.
- **How it functions**:
  - When an AI camera auto-files a ticket, `addTicket()` prepends the new ticket to the global `tickets` array in `AppContext`.
  - The ticket immediately appears in:
    1. **Citizen Portal** (Live status & past complaints)
    2. **Ward Admin Portal** (Unassigned public complaints triage desk)
    3. **Field Worker Portal** (Assigned clean-up task queue)
    4. **AI CCTV Incident Vault** (Timestamped photographic proof)
  - All tickets, attendance records, dignity credits, and language settings are serialized to `localStorage`, so refreshing the browser preserves all data.
- **Where it is used**:
  - `src/context/AppContext.jsx`

---

### Layer 8: Trilingual Localization System
- **What it is**: A custom client-side translation engine.
- **Why we use it**: To satisfy the national governance requirement for accessibility in multiple regional languages:
  - **English** (National Administrative)
  - **हिन्दी (Hindi)** (Union Official)
  - **ಕನ್ನಡ (Kannada)** (Karnataka Regional / Bengaluru Ward Administration)
- **How it functions**: Stores structured translation dictionaries in `src/context/AppContext.jsx`. The helper function `t('section', 'key')` returns the localized string based on the active language state.
- **Where it is used**:
  - Managed in `src/context/AppContext.jsx`.
  - Language toggle in `src/components/common/Header.jsx`.

---

### Layer 9: GIS & Interactive Canvas Radar — HTML5 Canvas / SVG
- **What it is**: Native HTML5 Canvas 2D and Scalable Vector Graphics.
- **Why we use it**: Renders real-time municipal tracking components (moving auto-tipper garbage trucks along ward GPS waypoints, ultrasonic smart bin fill radar, and blackspot heatmaps) with 60 FPS performance without requiring paid external map API keys (e.g. Google Maps or Mapbox).
- **Where it is used**:
  - `src/components/common/InteractiveMap.jsx`
  - `src/views/localAdmin/WardGisAiDispatch.jsx`
  - `src/views/localAdmin/BlackspotHeatmap.jsx`

---

## 3. Directory Structure Map

```text
stitch_swachhmitra_multi_role_portal/
├── index.html                     # Main entry HTML (loads fonts & TensorFlow.js scripts)
├── package.json                   # Project metadata, scripts, and dependency versions
├── vite.config.js                 # Vite build configuration with React plugin
├── tailwind.config.js             # Tailwind design tokens (Civic Radiance color palette)
├── postcss.config.js              # PostCSS plugins (TailwindCSS + Autoprefixer)
│
├── src/
│   ├── main.jsx                   # React root entry point
│   ├── App.jsx                    # Top-level application shell & screen router
│   ├── index.css                  # Global styles, Tailwind directives, custom glassmorphism
│   │
│   ├── context/
│   │   └── AppContext.jsx         # Global state store (Tickets, Workers, Role, Language, LocalStorage)
│   │
│   ├── components/
│   │   └── common/
│   │       ├── Header.jsx         # Top civic navigation bar with role switcher & language toggle
│   │       ├── Toast.jsx          # Notification toast popup component
│   │       ├── InteractiveMap.jsx # GPS tipper truck live simulation map
│   │       └── DevPortalSwitcher.jsx # Floating 26-screen navigator for evaluation
│   │
│   └── views/
│       ├── auth/                  # Login & Registration views (Citizen, Worker, Admin)
│       ├── citizen/               # Citizen Dashboard, Grievance Modal, Live Tracker, Rewards
│       ├── employee/              # Sanitation Worker Beat Portal, Attendance, Resolution Proof
│       ├── localAdmin/            # Ward GIS, AI Auto-Dispatch, Complaints Desk, Blackspot Heatmap
│       ├── zonalAdmin/            # Zonal Telemetry, Segregation Reports, Escalations
│       ├── centralAdmin/          # Apex Metropolitan Oversight, City Leaderboard, Directives
│       └── cctv/                  # Live AI Camera Grid, Incident Vault, Live Camera Surveillance
```

---

## 4. How to Run, Build, and Deploy

### Prerequisites
- **Node.js**: v18.0.0 or newer (tested and verified on Node v20/v22)
- **npm**: v9.0.0 or newer

### Commands
```bash
# 1. Install dependencies
npm install

# 2. Start local development server with instant Hot Reload
npm run dev

# 3. Build for production (compiles to dist/ in ~1.8s)
npm run build

# 4. Preview the production build locally
npm run preview -- --port 3000 --host
```

---

## 5. Future Backend & Database Expansion (Roadmap)

If you decide to transition from client-side state to a dedicated server infrastructure:
- **Backend**: **Python (Flask / FastAPI)** — Ideal for handling RESTful endpoints, worker duty allocations, and running server-side YOLO/PyTorch models.
- **Database**: **MySQL 8.0 / PostgreSQL with PostGIS** — Relational storage for citizens, complaints, SLA audits, and spatial coordinates for GIS ward polygons.
- **State Migration**: Replace the `localStorage` sync in `AppContext.jsx` with standard `fetch()` or `axios` calls to the Flask API endpoints (`/api/tickets`, `/api/workers`, `/api/dispatch`).
