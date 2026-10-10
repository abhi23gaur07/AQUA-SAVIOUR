<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,50:0284c7,100:06b6d4&height=230&section=header&text=AQUA%20SAVIOUR%20(AQUASAFE%20AI)&fontSize=44&fontColor=ffffff&animation=fadeIn&fontAlignY=36&desc=Real-Time%20Underground%20Pipe%20Crack%20%26%20Between-Node%20Leakage%20Detector%20%7C%20ESP32%20IoT%20%2B%20AI%2FML%20GIS&descAlignY=58&descSize=16" width="100%" alt="AQUA SAVIOUR Header Banner" />

[![ESP32 Dual-Core](https://img.shields.io/badge/Edge_Controller-ESP32_Dual--Core_240MHz-0284c7?style=for-the-badge&logo=espressif&logoColor=white)](https://www.espressif.com/)
[![INMP441 I2S Mic](https://img.shields.io/badge/Acoustic_Sensor-INMP441_I2S_MEMS_(256_DMA)-10b981?style=for-the-badge)](https://invensense.tdk.com/)
[![NEO-6M GPS PPS](https://img.shields.io/badge/Time_Sync-NEO--6M_GPS_1Hz_PPS_(<1µs)-7c3aed?style=for-the-badge)](https://www.u-blox.com/)
[![Open-Meteo Hydro API](https://img.shields.io/badge/Hydro_Moisture-Open--Meteo_&_NASA_POWER_API-0ea5e9?style=for-the-badge)](https://open-meteo.com/)
[![3D WebGL Digital Twin](https://img.shields.io/badge/3D_Digital_Twin-Three.js_+_React_19_+_Leaflet-f97316?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![Jal Jeevan Mission](https://img.shields.io/badge/Aligned_With-Jal_Jeevan_Mission_&_Smart_Cities-16a34a?style=for-the-badge)](#)

<br />

[**🌐 Explore 3D Digital Twin**](#️-1-initial-3d-road--underground-pipeline-digital-twin) •
[**📐 Time-of-Flight Math**](#-mathematical-model-between-node-leak-pinpointing) •
[**🛰️ Live GIS & Hydro Portals**](#️-2-multi-portal-command-interfaces-live-screenshots) •
[**🛠️ ESP32 Hardware BOM & Pinout**](#️-hardware-architecture--esp32-wiring-pinout) •
[**🚀 Quick Start**](#-quick-start--local-installation)

---

### **⚡ `RUPTURE` ➔ `CAPTURE` ➔ `TRANSMIT` ➔ `CORRELATE` ➔ `LOCATE` ➔ `ACT`**
> **Mission**: Pinpoint the **exact meter & centimeter of underground water pipe cracks and leaks between wireless sensor nodes** for **Prior Safety** and **Surgical Pipe Replacement ($1.2\text{ m} \times 0.8\text{ m}$ window)**—eliminating blind street excavation and achieving **98.8% road infrastructure preservation**.

</div>

---

## 🏗️ 1. Initial 3D Road & Underground Pipeline Digital Twin

When launching **AQUA SAVIOUR**, the user enters a full-screen, 360° interactive **Three.js WebGL 3D Cutaway Model** of the road surface, soil/gravel strata, and buried pressurized PVC water main with **`AQUA SAVIOUR`** embossed on the model. **Clicking anywhere on the 3D model smoothly transitions into the Role-Based Login Portal.**

<div align="center">
  <img src="./public/study/model-3d-cutaway.png" alt="AQUA SAVIOUR 3D Road & Internal Underground Pipeline Cutaway Model" width="94%" />
  <p>
    <em><strong>Figure 1:</strong> AQUA SAVIOUR 3D Physical &amp; WebGL Cutaway Model (60 cm × 20 mm Prototype Scale) — <strong>Top 5 cm:</strong> Asphalt Road &amp; Surface Solar ESP32/GPS Gateway Pillar | <strong>Middle 15 cm:</strong> Compacted Soil &amp; Gravel Strata | <strong>Bottom 10 cm:</strong> 1-Inch Pressurized Blue PVC Water Pipeline with Clamped <code>INMP441</code> I2S Sensor Node, Active Leak Jet &amp; Bi-Directional Acoustic Wave Rings.</em>
  </p>
</div>

---

## 🖥️ 2. Multi-Portal Command Interfaces (Live Screenshots)

Rather than crowding everything onto a single webpage, **AQUA SAVIOUR (`AQUASAFE AI`)** is architected as a **Modular Multi-Portal Platform** where each official role (`HEAD ENGINEER`, `GIS ANALYST / ENGINEER`, `TECHNICAL ENGINEER`, `HEAD ADMIN`, `ADMIN`) can click and switch between dedicated operational portals:

<div align="center">
<table>
  <tr>
    <td width="50%" align="center">
      <img src="./public/study/portal-live-map-dashboard.png" alt="Node Live Map Surveillance Portal" width="100%" />
      <br />
      <strong>1. Node Live Map Portal (<code>/dashboard</code>)</strong>
      <br />
      <sub>7 Real-Time KPI Cards, L3 Critical Rupture Banner, Satellite Surveillance &amp; 5-Indicator Node Cards with <code>Detail &gt;</code> links.</sub>
    </td>
    <td width="50%" align="center">
      <img src="./public/study/portal-satellite-nodes.png" alt="Satellite Dual-Intelligence Heatmaps & Relay Valves" width="100%" />
      <br />
      <strong>2. Dual-Intelligence Satellite Heatmaps &amp; Valve Relays</strong>
      <br />
      <sub>Concentric Purple/Red AI Risk Heatmaps around <code>N02 (L3)</code>, Green Safe Nodes (<code>N01</code>, <code>N03</code>) &amp; Isolation Relays (<code>R-01</code>, <code>R-02</code>).</sub>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <img src="./public/study/portal-hydro-moisture.png" alt="Open-Meteo Hydro-Geological Moisture Monitor Portal" width="100%" />
      <br />
      <strong>3. GIS Engineer Hydro-Geological Moisture Map (<code>/hydro-moisture</code>)</strong>
      <br />
      <sub>Powered by live <strong>Open-Meteo &amp; NASA POWER APIs</strong> with toggleable <em>Moisture Heatmap</em>, <em>Pore-Pressure Risk Zones</em> &amp; <em>Hydro Stratification (0–100cm)</em>.</sub>
    </td>
    <td width="50%" align="center">
      <img src="./public/study/portal-compliance-report.png" alt="Regulatory Compliance & Safety Reports Builder" width="100%" />
      <br />
      <strong>4. Regulatory Compliance &amp; Safety Reports Builder (<code>/report</code>)</strong>
      <br />
      <sub>Custom dossier generator for Water Authorities, Hydro-Geotechnical Engineers &amp; Jal Jeevan Mission Regulators.</sub>
    </td>
  </tr>
</table>
</div>

---

## 🧮 3. Mathematical Model: Between-Node Leak Pinpointing

When a pressurized underground pipe develops a crack or rupture between **Node A (`N01`)** and **Node B (`N02`)**, escaping water generates a continuous high-frequency acoustic signature ($1.2\text{ kHz} - 2.8\text{ kHz}$) that travels **bi-directionally** along the pipe wall and water column at acoustic velocity $v = 1,480\text{ m/s}$.

Both ESP32 nodes are synchronized to within **$< 1\ \mu\text{s}$** using the **1Hz Pulse-Per-Second (`PPS`)** hardware interrupt from their **NEO-6M GPS** receivers. By cross-correlating the 256-sample `INMP441` I2S DMA audio snapshots from both nodes, the cloud engine extracts the arrival time delay $\Delta t = t_B - t_A$:

$$\text{Distance from Node A} = \frac{L - (v \times \Delta t)}{2}$$

### **Worked Live Triangulation Example (Segment `N01` ↔ `N02`)**

| Parameter | Symbol | Measured / Configured Value | Physical Meaning |
| :--- | :---: | :---: | :--- |
| **Segment Length** | $L$ | $100.0\text{ m}$ | Physical distance between buried sensor **Node `N01`** and **Node `N02`** |
| **Acoustic Velocity** | $v$ | $1,480\text{ m/s}$ | Speed of sound in pressurized water-filled PVC / Ductile Iron main |
| **Arrival Time Delay** | $\Delta t$ | $+23.65\text{ ms}$ ($0.02365\text{ s}$) | Wavefront reaches `N01` $23.65\text{ ms}$ earlier than `N02` |
| **Wave Path Offset** | $v \times \Delta t$ | $35.00\text{ m}$ | $1,480\text{ m/s} \times 0.02365\text{ s} = 35.00\text{ m}$ differential travel path |
| **Pinpointed Leak Location** | $D_{\text{N01}}$ | **$32.50\text{ meters}$** | $\frac{100 - 35}{2} = \mathbf{32.50\text{ m}}$ **from `N01`** ($67.50\text{ m}$ from `N02`) |

---

## 📚 4. Complete 4-Page System Study & Prototype Reference

<div align="center">
<table>
  <tr>
    <td width="50%" align="center">
      <img src="./public/study/page1-webchart.png" alt="Page 1: From Hidden Leak to Actionable Alert" width="100%" />
      <br />
      <strong>Study Page 1: Sensing Pathway — From Hidden Leak to GIS Alert</strong>
    </td>
    <td width="50%" align="center">
      <img src="./public/study/page2-scalability.png" alt="Page 2: Scalability, Impact & Roadmap" width="100%" />
      <br />
      <strong>Study Page 2: Scalability (10m Prototype ➔ 1km Pilot ➔ 100km City Grid)</strong>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <img src="./public/study/page3-how-it-works.jpg" alt="Page 3: 5-Phase Architecture & Time-of-Flight Math" width="100%" />
      <br />
      <strong>Study Page 3: 5-Phase GPS PPS Sync &amp; Cross-Correlation Architecture</strong>
    </td>
    <td width="50%" align="center">
      <img src="./public/study/page4-prototype.jpg" alt="Page 4: 3D Physical Cutaway Prototype (60cm x 20mm)" width="100%" />
      <br />
      <strong>Study Page 4: 3D Physical Cutaway Prototype (60 cm × 20 mm)</strong>
    </td>
  </tr>
</table>
</div>

---

## 🔬 5. End-to-End 5-Phase Operational Architecture

```mermaid
flowchart LR
    subgraph UNDERGROUND["地下 Buried Pipeline Layer (-25 cm)"]
        R["1. RUPTURE\nPressurized Pipe Crack\n(1.2–2.8 kHz Acoustic Wave)"]
        M["2. CAPTURE\nClamped INMP441 I2S Mic\n+ Rubber Acoustic Isolator"]
    end

    subgraph SURFACE["地上 Roadside Solar Gateway Pillar"]
        G["3. GPS 1Hz PPS SYNC\nNEO-6M Microsecond Trigger\n+ ESP32 256-Sample DMA"]
    end

    subgraph CLOUD["☁️ AQUASAFE AI Cloud & GIS Portals"]
        C["4. CORRELATE & PREDICT\nTime-of-Flight Engine\nD = [L - (v × Δt)] / 2"]
        A["5. LOCATE & ACT\nLive GIS + Hydro Moisture Map\n1.2m × 0.8m Surgical Repair"]
    end

    R -->|"v = 1,480 m/s"| M
    M -->|"Shielded I2S Conduit"| G
    G -->|"MQTT Burst Packet"| C
    C -->|"Exact Meter Offset"| A
```

---

## 🛠️ 6. Hardware Architecture & ESP32 Wiring Pinout

### **5-Indicator Multi-Sensor Node Specification**
Each wireless node monitors **5 critical underground indicators** simultaneously:
1. **`Acst` — Acoustic Vibration (`INMP441` I2S Digital MEMS Mic)**: Captures pipe-wall vibration in `dB` via 256-sample DMA bursts.
2. **`Prs` — Internal Water Pressure (`Bar`)**: Detects localized pressure drops across pipeline segments.
3. **`Vib / Flow` — Volumetric Flow Loss Delta (`L/min`)**: Tracks flow differential between paired upstream/downstream nodes.
4. **`Crk` — Pipe Wall Crack Signature (`AI/ML Classifier`)**: Distinguishes early `L1` joint micro-cracks (Prior Safety) from `L3` active ruptures.
5. **`Mst` — Sub-Surface Soil Moisture (`%`) & Pore Pressure (`kPa`)**: Fuses trench capacitive probe data with **Open-Meteo 0–100cm Hydro-Geological Stratification**.

### **ESP32 ↔ INMP441 (I2S DMA) & NEO-6M (GPS PPS) Pinout**

| Hardware Module | Module Pin | ESP32 GPIO Pin | Protocol / Function |
| :--- | :---: | :---: | :--- |
| **`INMP441` I2S MEMS Mic** | `SCK` (Serial Clock) | `GPIO 14` | I2S Bit Clock (`BCLK`) for DMA audio capture |
| **`INMP441` I2S MEMS Mic** | `WS` (Word Select) | `GPIO 15` | I2S Left/Right Word Select (`LRCLK`) |
| **`INMP441` I2S MEMS Mic** | `SD` (Serial Data) | `GPIO 32` | 24-bit Digital Acoustic Stream into ESP32 DMA RAM |
| **`INMP441` I2S MEMS Mic** | `L/R` | `GND` | Selects Left Channel mono pipe-wall capture |
| **`NEO-6M` GPS Receiver** | `PPS` (Pulse-Per-Second) | `GPIO 4` (ISR) | **Hardware Interrupt** triggering simultaneous 1Hz capture |
| **`NEO-6M` GPS Receiver** | `TX` / `RX` | `GPIO 16` / `GPIO 17` | `UART2` NMEA UTC Timestamp & Latitude/Longitude lock |
| **Power Subsystem** | `TP4056` + `18650` | `VIN` / `3.3V` | `3.7V 2600mAh` Li-ion cell charged by `6V` Roadside Solar Panel |

---

## 🧭 7. Role-Based Portals & Route Directory

| Route Path | Dedicated Portal Interface | Primary Authorized Role(s) |
| :--- | :--- | :--- |
| **`/` & `/model-3d`** | **Full-Screen Interactive 3D Road & Pipeline Digital Twin** | All Visitors (Click anywhere to enter `/login`) |
| **`/login`** | **5-Role Authentication & Portal Option Launcher** | `Head Engineer`, `GIS Analyst`, `Technical Engineer`, `Head Admin`, `Admin` |
| **`/dashboard`** | **Node Live Map Portal (Default Landing Page)** | All Roles — Satellite Map, Dual Heatmaps, 7 KPIs & Node Cards |
| **`/hydro-moisture`** | **Open-Meteo Hydro-Geological Moisture Monitor Portal** | **GIS Engineer / Analyst** — Moisture Heatmap, Pore-Pressure & 0–100cm Strata |
| **`/gis-realtime`** | **GIS Details & Between-Node Triangulation Calculator** | **GIS Analyst & Head Engineer** — Live $\Delta t$ slider & Surgical Excavation GIS |
| **`/nodes`** | **ESP32 Wireless Sensor Nodes Fleet Directory** | **Technical Engineer** — Complete 5-indicator matrix across `N01`–`N04` |
| **`/detail/:nodeId`** | **Individual Node Detail & 256-Sample DMA Oscilloscope** | **Technical Engineer** — Live waveform comparison (`N01` vs `N02`) & diagnostics |
| **`/analytics`** | **AI/ML & Waveform Shift Cross-Correlation Portal** | **AI / Technical Engineer** — Interactive $R_{AB}(\tau)$ peak matcher |
| **`/report`** | **Regulatory Compliance & Safety Reports Builder** | **Head Admin & Head Engineer** — Printable PDF compliance dossiers |
| **`/server` & `/alerts`** | **Server Status & Emergency Crew Dispatch Portals** | **Admin & Operations** — MQTT broker health & L3 surgical repair dispatch |
| **`/study`** | **Interactive 4-Page System Architecture Viewer** | All Roles — Full-resolution technical study & prototype reference |

---

## 🚀 8. Quick Start & Local Installation

```bash
# 1. Clone the repository
git clone https://github.com/abhi23gaur07/AQUA-SAVIOUR.git
cd AQUA-SAVIOUR

# 2. Install dependencies
npm install

# 3. Start the Vite development server
npm run dev
```

Open **`http://localhost:5173/`** in your browser:
1. Rotate and inspect the **3D Road & Internal Underground Pipeline Model** (`/`), then **click anywhere** to open the **Login Portal** (`/login`).
2. Pick any of the **5 official roles** (`Head Engineer`, `GIS Analyst / Engineer`, `Technical Engineer`, `Head Admin`, `Admin`) or click any **Portal Option Card** to launch that dedicated portal directly.

---

<div align="center">

### **👨‍💻 Developed by Abhishek Gaur (`@abhi23gaur07`)**
**Project AQUA SAVIOUR (`AQUASAFE AI`)** • *Smart Underground Water Infrastructure Protection & Zero-Damage Pipe Replacement*

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,50:0284c7,100:06b6d4&height=110&section=footer" width="100%" alt="Footer Banner" />

</div>
