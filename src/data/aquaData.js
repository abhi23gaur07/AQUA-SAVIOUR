export const AQUA_CONFIG = {
  app: {
    projectTitle: 'AQUA SAVIOUR',
    aiPlatformName: 'AQUASAFE AI',
    tagline:
      'Real-Time Underground Pipe Crack & Leakage Detector for Prior Safety & Zero-Damage Pipe Replacement',
    subTagline:
      'Low-Cost ESP32 Wireless Sensor Node • 5-Indicator Hydro-Acoustic Detector • GPS PPS Microsecond Sync • AI/ML Time-of-Flight Triangulation',
    version: '2.4.0-PROTOTYPE'
  },
  physics: {
    soundVelocityWaterMps: 1480, // v = 1,480 m/s in water-filled PVC/municipal pipe
    defaultSegmentLengthM: 100, // L = 100 m between Node A and Node B
    dmaSampleCount: 256, // 256-sample DMA audio snapshot
    ppsSyncHz: 1, // 1 Hz Pulse-Per-Second NEO-6M GPS trigger
    formulaLatex: 'Distance to Leak from Node A = [ L - (v × Δt) ] / 2',
    prototypeDimensions: {
      lengthCm: 60,
      widthMm: 20,
      surfaceLayerCm: 5,
      subSurfaceLayerCm: 15,
      pipelineLayerCm: 10,
      pipeDiameterInch: 1
    }
  },
  site: {
    id: 'JAL-GRID-01',
    name: 'Prototype Pipeline Grid — Central Sector Trunk #4, India',
    region: 'Central Block Pipeline Trench #4',
    location: 'New Delhi / Smart City Pilot Zone, India',
    latitude: 28.6139,
    longitude: 77.2090,
    zoom: 17
  }
};

// Exact 5 Roles requested by the user:
// HEAD ENGINEER, GIS ANALYST, TECHNICAL ENGINEER, HEAD ADMIN, ADMIN
export const PORTAL_ROLES = [
  {
    id: 'HEAD_ENGINEER',
    role: 'Head Engineer',
    badge: 'HEAD ENGINEER',
    username: 'head.engineer',
    defaultName: 'Er. Vikramaditya Rathore',
    department: 'Pipeline Structural Integrity & Zero-Damage Replacement',
    clearance: 'Level 5 — Executive Engineering',
    color: '#0284c7',
    bgLight: 'rgba(2, 132, 199, 0.14)',
    defaultPortal: '/dashboard',
    description:
      'Approves surgical pipe replacement without road destruction, oversees L3 critical rupture protocols & structural safety.'
  },
  {
    id: 'GIS_ANALYST',
    role: 'GIS Analyst / Engineer',
    badge: 'GIS ANALYST',
    username: 'gis.analyst',
    defaultName: 'Dr. Ananya Sharma',
    department: 'Spatial Triangulation, Underground GIS & Hydro Moisture Mapping',
    clearance: 'Level 4 — Geospatial & Hydro Intelligence',
    color: '#10b981',
    bgLight: 'rgba(16, 185, 129, 0.14)',
    defaultPortal: '/dashboard',
    description:
      'Maps exact leak distance between nodes onto physical GPS coordinates, manages GIS Realtime & Open-Meteo Hydro-Geological Moisture Monitor.'
  },
  {
    id: 'TECHNICAL_ENGINEER',
    role: 'Technical Engineer',
    badge: 'TECHNICAL ENGINEER',
    username: 'tech.engineer',
    defaultName: 'Er. Rohan Kulkarni',
    department: 'ESP32 Edge Nodes, INMP441 DMA & NEO-6M GPS PPS Sync',
    clearance: 'Level 4 — IoT Hardware & Edge AI',
    color: '#8b5cf6',
    bgLight: 'rgba(139, 92, 246, 0.14)',
    defaultPortal: '/dashboard',
    description:
      'Monitors ESP32 dual-core nodes, INMP441 I2S 256-sample DMA waveforms, NEO-6M microsecond PPS clock lock & LoRaWAN/MQTT.'
  },
  {
    id: 'HEAD_ADMIN',
    role: 'Head Admin',
    badge: 'HEAD ADMIN',
    username: 'head.admin',
    defaultName: 'Dir. Rajeshwar Prasad (IAS)',
    department: 'Jal Jeevan Mission & Smart City Command Center',
    clearance: 'Level 5 — Supreme Directorate',
    color: '#f59e0b',
    bgLight: 'rgba(245, 158, 11, 0.14)',
    defaultPortal: '/dashboard',
    description:
      'Full multi-zone governance from 10m prototype to 100km municipal grid, compliance reports, policy thresholds & inter-agency dispatch.'
  },
  {
    id: 'ADMIN',
    role: 'Admin',
    badge: 'ADMIN',
    username: 'admin',
    defaultName: 'Abhishek Gaur (System Admin)',
    department: 'Operations, Real-Time Alerts & Automated Crew Dispatch',
    clearance: 'Level 4 — Portal Operations',
    color: '#ec4899',
    bgLight: 'rgba(236, 72, 153, 0.14)',
    defaultPortal: '/dashboard',
    description:
      'Manages portal users, real-time SMS/Email field dispatch alerts, node calibration states & daily leakage reports.'
  }
];

// Dedicated Portal Modules (for Sidebar & Portal Launcher)
export const PORTAL_MODULES = [
  {
    id: 'dashboard',
    path: '/dashboard',
    label: 'Node Live Map',
    shortDesc: 'Geographical Surface Surveillance & Dual Intelligence Heatmaps',
    roleHighlight: 'ALL ROLES (DEFAULT)'
  },
  {
    id: 'gis-realtime',
    path: '/gis-realtime',
    label: 'GIS Realtime',
    shortDesc: 'Between-Node Leak Triangulation, GPS Coordinates & Excavation GIS',
    roleHighlight: 'GIS ANALYST / HEAD ENG'
  },
  {
    id: 'hydro-moisture',
    path: '/hydro-moisture',
    label: 'Hydro Moisture Map',
    shortDesc: 'Open-Meteo Hydro-Geological Moisture Monitor & Pore-Pressure Zones',
    roleHighlight: 'GIS ENGINEER SPECIAL'
  },
  {
    id: 'nodes',
    path: '/nodes',
    label: 'Nodes',
    shortDesc: 'ESP32 Wireless Sensor Nodes Directory & Individual Node Details',
    roleHighlight: 'TECHNICAL ENGINEER'
  },
  {
    id: 'analytics',
    path: '/analytics',
    label: 'Analytics',
    shortDesc: '256-Sample DMA Cross-Correlation & AI/ML Crack Prediction Charts',
    roleHighlight: 'AI / ML ANALYTICS'
  },
  {
    id: 'report',
    path: '/report',
    label: 'Report',
    shortDesc: 'Regulatory Compliance & Safety Reports Configuration Builder',
    roleHighlight: 'HEAD ADMIN / REGULATOR'
  },
  {
    id: 'server',
    path: '/server',
    label: 'Server Status',
    shortDesc: 'Cloud MQTT Broker, 1Hz GPS PPS Sync & Edge Gateway Health',
    roleHighlight: 'SYSTEM INFRASTRUCTURE'
  },
  {
    id: 'alerts',
    path: '/alerts',
    label: 'Alerts',
    shortDesc: 'L3 Critical Leak Emergency Protocol & Surgical Crew Dispatch',
    roleHighlight: 'ADMIN / OPERATIONS'
  },
  {
    id: 'study',
    path: '/study',
    label: '4-Page System Study',
    shortDesc: 'Complete 4-Page Technical Architecture & 3D Prototype Study',
    roleHighlight: 'DOCUMENTATION'
  }
];

// 3D Cutaway Model Hotspots
export const MODEL_3D_LAYERS = [
  {
    id: 'surface-road',
    layerNumber: '01',
    name: 'Surface Layer (Top 5 cm): Road / Asphalt',
    shortLabel: 'Road & Asphalt Surface (5 cm)',
    color: '#38bdf8',
    positionY: 'Top Surface',
    hardware: 'Asphalt Highway + Lane Markings (Zero Excavation Needed)',
    detail:
      'Vehicles and citizens travel normally above. AQUA SAVIOUR pinpoints underground pipe leaks to the exact centimeter so crews never have to blindly tear up the street.'
  },
  {
    id: 'surface-gateway',
    layerNumber: '02',
    name: 'Surface Infrastructure: Smart Gateway Pillar',
    shortLabel: 'ESP32 + NEO-6M GPS Solar Pillar',
    color: '#a855f7',
    positionY: 'Roadside Surface Pillar',
    hardware: 'ESP32 Dual-Core + NEO-6M GPS (1Hz PPS) + 18650 Li-ion + Solar Panel',
    detail:
      'Housed on the surface so the NEO-6M GPS module has clear sky visibility for microsecond Pulse-Per-Second (PPS) synchronization and Wi-Fi / LoRaWAN MQTT transmission.'
  },
  {
    id: 'workstation-gis',
    layerNumber: '03',
    name: 'Server / Workstation (Top Layer): Cloud & GIS Dashboard',
    shortLabel: 'AI/ML Cross-Correlation & GIS Laptop',
    color: '#10b981',
    positionY: 'Surface Command Interface',
    hardware: 'Cloud MQTT Broker + Cross-Correlation Math Engine + Live GIS Map',
    detail:
      'Aligns 256-sample DMA waveforms from Node A & Node B to compute Δt and exact leak distance: Distance = [L - (v × Δt)] / 2.'
  },
  {
    id: 'subsurface-soil',
    layerNumber: '04',
    name: 'Sub-Surface Layer (15 cm): Compacted Soil, Gravel & Sand',
    shortLabel: 'Compacted Soil & Gravel (15 cm)',
    color: '#f59e0b',
    positionY: 'Middle Overburden (-5 cm to -20 cm)',
    hardware: 'Multi-strata Soil, Gravel & Bedding Sand',
    detail:
      'Pressurized leaks erode surrounding soil and cause road sinkholes if left undetected. Acoustic waves travel through the pipe wall & water column at 1,480 m/s.'
  },
  {
    id: 'pipeline-pvc',
    layerNumber: '05',
    name: 'Pipeline Layer (Bottom 10 cm): 1-Inch Blue PVC Water Pipe',
    shortLabel: '1" Blue PVC Water Pipeline (Bottom 10 cm)',
    color: '#0284c7',
    positionY: 'Deep Underground (-20 cm to -30 cm)',
    hardware: 'Pressurized Municipal PVC / Ductile Water Main',
    detail:
      'Carries treated municipal water. When a micro-crack or rupture forms, escaping water generates a continuous high-frequency acoustic hiss (1.2 kHz – 2.8 kHz).'
  },
  {
    id: 'sensor-node',
    layerNumber: '06',
    name: 'Underground Sensor Node: Clamped INMP441 Microphone',
    shortLabel: 'Clamped INMP441 I2S Sensor Node',
    color: '#f97316',
    positionY: 'Clamped Directly on Blue PVC Pipe',
    hardware:
      'INMP441 I2S Digital Omnidirectional Mic + Rubber Acoustic Isolator + Shielded Dupont Cable',
    detail:
      'Securely clamped around the underground PVC pipe with rubber acoustic isolation padding to block surface traffic noise and capture pure pipe-wall vibrations.'
  },
  {
    id: 'leak-rupture',
    layerNumber: '07',
    name: 'The Leak: Pressurized Rupture & Bi-Directional Acoustic Waves',
    shortLabel: 'Active Pipe Crack & Acoustic Wavefront',
    color: '#ef4444',
    positionY: 'Between Node A & Node B (32.5 m from Node A)',
    hardware: 'High-Frequency Acoustic Signature + AI/ML Anomaly Classifier',
    detail:
      'Pressurized jet sprays into soil while acoustic waves propagate left & right at 1,480 m/s. Dual GPS-synced nodes capture the arrival time difference (Δt = 23.65 ms) to pinpoint the exact crack location.'
  }
];

// Detailed study synthesis of the 4 uploaded pages
export const FOUR_PAGES_STUDY = [
  {
    pageNumber: 1,
    image: '/study/page1-webchart.png',
    badge: 'SMART INFRASTRUCTURE / WEBCHART',
    title: 'From Hidden Leak to Actionable Alert',
    subtitle: 'A clear sensing pathway for protecting underground water infrastructure.',
    problemStatement:
      'Underground leaks are hard to see, slow to locate, and costly to ignore. Treated water can be lost before it reaches citizens. Manual acoustic inspection relies on field teams, while pressurized leaks can weaken surrounding soil and damage roads.',
    pathwaySteps: [
      { step: '01', name: 'HIDDEN LEAK', desc: 'A rupture creates an acoustic signature underground.' },
      { step: '02', name: 'ACOUSTIC SENSING', desc: 'Dual nodes listen for pipe vibrations via INMP441.' },
      { step: '03', name: 'GPS SYNC', desc: 'The gateway aligns both recordings in microsecond time.' },
      { step: '04', name: 'CROSS-CORRELATION', desc: 'Cloud analysis compares the 256-sample DMA signals.' },
      { step: '05', name: 'GIS ALERT', desc: 'The exact leak location between nodes becomes visible on the map.' }
    ],
    pillars: [
      {
        tag: 'ACOUSTIC INPUT',
        title: 'Underground Node',
        body: 'INMP441 microphone captures pipe vibration directly from the buried PVC wall.'
      },
      {
        tag: 'SYNCHRONIZED DATA',
        title: 'Surface Gateway',
        body: 'ESP32 receives audio via DMA and stamps it with NEO-6M GPS Pulse-Per-Second time.'
      },
      {
        tag: 'ACTIONABLE OUTPUT',
        title: 'Remote Analytics',
        body: 'Cross-correlation estimates exact meter distance and triggers a real-time GIS alert.'
      }
    ],
    impacts: [
      'Water conservation',
      'Faster municipal response',
      'Infrastructure protection',
      'Lower labour cost',
      'Reduced energy & carbon impact'
    ]
  },
  {
    pageNumber: 2,
    image: '/study/page2-scalability.png',
    badge: 'SCALABILITY / IMPACT / ROADMAP',
    title: 'Designed to Scale Beyond the Prototype',
    subtitle: 'A modular path from a 10 m prototype pipe to a 100 km city grid.',
    problemStatement:
      'Target users include municipal water authorities, Smart City planners, and industrial plants. Automated monitoring reduces dependence on manual inspection and recovers non-revenue water (NRW).',
    pathwaySteps: [
      {
        step: '01',
        name: 'SCALABILITY',
        desc: 'LoRaWAN extends network beyond prototype Wi-Fi; cloud processes parallel audio arrays.'
      },
      {
        step: '02',
        name: 'COMMERCIAL VIABILITY',
        desc: 'Built for Municipal Water Authorities, Smart Cities & Industrial Plants.'
      },
      {
        step: '03',
        name: 'SUSTAINABILITY',
        desc: 'Protects soil and roads from sinkholes and reduces water treatment energy footprint.'
      },
      {
        step: '04',
        name: 'AI ROADMAP',
        desc: 'Edge AI filters traffic/construction noise locally; in-pipe hydro energy harvesting.'
      }
    ],
    pillars: [
      {
        tag: '10 m → 1 km → 100 km',
        title: 'Network Expansion',
        body: 'LoRaWAN extends the prototype beyond Wi-Fi, supporting long-range sensor coverage across municipal zones.'
      },
      {
        tag: 'AWS IoT / AZURE',
        title: 'Cloud Computing',
        body: 'AWS IoT Core or Microsoft Azure hosts cross-correlation workflows and scales processing as demand changes.'
      },
      {
        tag: 'LOW-COST COTS',
        title: 'COTS + Plug-In',
        body: 'ESP32, INMP441 and NEO-6M off-the-shelf components support low-cost manufacturing without specialized training.'
      }
    ],
    impacts: [
      '10 m Prototype Pipe',
      '1 km Pilot Zone',
      '100 km Smart City Grid',
      'Edge AI Noise Filtering',
      'Predictive Pipe Maintenance'
    ]
  },
  {
    pageNumber: 3,
    image: '/study/page3-how-it-works.jpg',
    badge: '5-PHASE ARCHITECTURE & MATH MODEL',
    title: 'How The System Works — Physical Rupture to GIS Alert',
    subtitle:
      'Microsecond GPS Pulse-Per-Second (PPS) Synchronization & Time-of-Flight Cross-Correlation.',
    problemStatement:
      'Sound travels bi-directionally through water and pipe walls at v = 1,480 m/s. By capturing a 256-sample DMA snapshot at the exact top of each second via GPS 1Hz PPS, the server computes the arrival time delay (Δt) between Node A and Node B.',
    pathwaySteps: [
      {
        step: 'PHASE 1',
        name: 'ACOUSTIC GENERATION',
        desc: 'Pressurized water escapes crack, creating continuous high-frequency hiss propagating both ways at 1,480 m/s.'
      },
      {
        step: 'PHASE 2',
        name: 'SYNCHRONIZED EDGE CAPTURE',
        desc: 'NEO-6M GPS 1Hz PPS triggers both ESP32s simultaneously to record a 256-sample DMA snapshot via INMP441.'
      },
      {
        step: 'PHASE 3',
        name: 'DATA PACKAGING (MQTT)',
        desc: 'Nodes avoid continuous streaming; transmit lightweight [Node ID + Timestamp + 256 Samples] packet to MQTT Broker.'
      },
      {
        step: 'PHASE 4',
        name: 'TIME-OF-FLIGHT MATCH',
        desc: 'Cross-correlation shifts Node B waveform against Node A to find peak match Δt: Distance = [L - (v × Δt)] / 2.'
      },
      {
        step: 'PHASE 5',
        name: 'GIS & AUTOMATED DISPATCH',
        desc: 'Converts meter offset (e.g., 32.5 m from Node A) to GPS coordinates on React GIS Map & sends SMS/Email to crew.'
      }
    ],
    pillars: [
      {
        tag: 'FORMULA',
        title: 'Distance = [L - (v × Δt)] / 2',
        body: 'L = Total distance between nodes (100 m), v = Speed of sound in pipe (1480 m/s), Δt = Time delay calculated by cross-correlation.'
      },
      {
        tag: 'DMA SNAPSHOT',
        title: '256-Sample Burst Capture',
        body: 'Eliminates continuous audio streaming to save 94% battery and bandwidth while preserving microsecond phase accuracy.'
      },
      {
        tag: 'ZERO DAMAGE',
        title: 'Surgical Excavation',
        body: 'Municipal crew receives exact GPS coordinate & severity, excavating only the affected spot instead of tearing up the street.'
      }
    ],
    impacts: ['RUPTURE', 'CAPTURE', 'TRANSMIT', 'CORRELATE', 'LOCATE', 'ACT']
  },
  {
    pageNumber: 4,
    image: '/study/page4-prototype.jpg',
    badge: '3D PHYSICAL PROTOTYPE SPECIFICATION',
    title: 'Acoustic Water Leak Triangulation Prototype (60 cm × 20 mm)',
    subtitle: '3D Physical Cutaway Model (PVC + Soil/Sand) | Dual-Node Time-of-Flight Demonstration.',
    problemStatement:
      'Constructed with a 5 cm Road/Asphalt surface layer, 15 cm Compacted Soil & Gravel sub-surface layer, and 10 cm bottom Pipeline Layer housing a 1-inch Blue PVC Water Pipe with clamped INMP441 sensor node and surface ESP32 + Solar Gateway Pillar.',
    pathwaySteps: [
      {
        step: 'TOP 5 cm',
        name: 'SURFACE ROAD LAYER',
        desc: 'Asphalt road surface with Smart Gateway Pillar (ESP32 + GPS + Solar) & GIS Laptop Workstation.'
      },
      {
        step: 'MID 15 cm',
        name: 'SUB-SURFACE SOIL & GRAVEL',
        desc: 'Compacted soil, gravel, and sand bedding insulating the buried pipeline.'
      },
      {
        step: 'BOT 10 cm',
        name: 'BLUE PVC PIPELINE LAYER',
        desc: '1-inch Blue PVC Water Pipe with simulated pressurized pinhole leak & clamped INMP441 mic.'
      },
      {
        step: 'ISOLATION',
        name: 'RUBBER ACOUSTIC ISOLATOR',
        desc: 'Rubber padding strap isolates INMP441 I2S mic from ambient road noise, routing shielded Dupont wires to surface.'
      }
    ],
    pillars: [
      {
        tag: 'UNDERGROUND',
        title: 'Sensor Node',
        body: 'INMP441 I2S Digital Microphone + Rubber Acoustic Isolator + Shielded Dupont wires running to surface.'
      },
      {
        tag: 'SURFACE PILLAR',
        title: 'Edge Gateway',
        body: 'ESP32 Dual-Core (Controller & Wi-Fi) + NEO-6M GPS (Microsecond Clock Sync) + 18650 Li-ion Battery & TP4056 + Solar.'
      },
      {
        tag: 'TOP LAYER',
        title: 'Server / Workstation',
        body: 'Backend + Math Model running Cross-Correlation & AI/ML classifier + Live GIS Dashboard showing exact leak on map.'
      }
    ],
    impacts: [
      'Real-Time Monitoring',
      'Low Cost & Scalable',
      'Student Prototype Ready for Pilot',
      'Made in India — Jal Jeevan Mission'
    ]
  }
];

// Placed Wireless Sensor Nodes on the Live Map Interface (matching N01, N02, N03, N04 in screenshots)
export const INITIAL_NODES = [
  {
    id: 'N01',
    legacyId: 'NODE-A',
    code: 'N01',
    name: 'Node N01 (North Trunk Upstream)',
    pairedWith: 'N02',
    segmentId: 'SEG-N01-N02',
    segmentLengthM: 100.0,
    latitude: 28.6146,
    longitude: 77.2083,
    status: 'Online',
    riskLevel: 'L0',
    riskScore: 5,
    aiConfidence: 96.4,
    leakDistanceFromSelfM: 32.5,
    timeDelayMs: 23.65,
    predictedCrackGrowthMm: 0.2,
    predictionHorizonHrs: 6,
    trend: 'Upstream Reference Node (Capturing Early Wavefront)',
    wifiSignal: -48,
    battery: 95,
    solarCharging: true,
    gpsPpsLocked: true,
    dmaSamples: 256,
    firmware: 'ESP32-AQUA-v2.4.1',
    depthCm: 25,
    soilType: 'Compacted Alluvial Gravel & Sand',
    porePressureKpa: 18.4,
    readings: {
      acousticDb: 31.2,
      pressureBar: 4.12,
      flowDeltaLpm: 2.1,
      crackDetected: false,
      soilMoisturePct: 29.4
    },
    thresholds: {
      acousticDb: 45.0,
      pressureBar: 3.5,
      flowDeltaLpm: 10.0,
      crackDetected: false,
      soilMoisturePct: 45.0
    },
    sensorStatus: {
      acoustic: false,
      pressure: false,
      flow: false,
      crack: false,
      moisture: false
    }
  },
  {
    id: 'N02',
    legacyId: 'NODE-B',
    code: 'N02',
    name: 'Node N02 (Central Trunk Rupture Zone)',
    pairedWith: 'N01',
    segmentId: 'SEG-N01-N02',
    segmentLengthM: 100.0,
    latitude: 28.6137,
    longitude: 77.2094,
    status: 'Online',
    riskLevel: 'L3',
    riskScore: 83,
    aiConfidence: 86.0,
    leakDistanceFromSelfM: 32.5,
    timeDelayMs: 23.65,
    predictedCrackGrowthMm: 27.0,
    predictionHorizonHrs: 6,
    trend: 'CRITICAL: All 5 Monitored Indicators Abnormal (32.5m Leak)',
    wifiSignal: -52,
    battery: 91,
    solarCharging: true,
    gpsPpsLocked: true,
    dmaSamples: 256,
    firmware: 'ESP32-AQUA-v2.4.1',
    depthCm: 25,
    soilType: 'Saturated Sandy Clay (High Pore-Pressure Risk)',
    porePressureKpa: 64.8,
    readings: {
      acousticDb: 84.6,
      pressureBar: 2.78,
      flowDeltaLpm: 42.4,
      crackDetected: true,
      soilMoisturePct: 78.5
    },
    thresholds: {
      acousticDb: 45.0,
      pressureBar: 3.5,
      flowDeltaLpm: 10.0,
      crackDetected: false,
      soilMoisturePct: 45.0
    },
    sensorStatus: {
      acoustic: true,
      pressure: true,
      flow: true,
      crack: true,
      moisture: true
    }
  },
  {
    id: 'N03',
    legacyId: 'NODE-C',
    code: 'N03',
    name: 'Node N03 (Station Road West Branch)',
    pairedWith: 'N02',
    segmentId: 'SEG-N02-N03',
    segmentLengthM: 100.0,
    latitude: 28.6132,
    longitude: 77.2076,
    status: 'Online',
    riskLevel: 'L0',
    riskScore: 8,
    aiConfidence: 94.2,
    leakDistanceFromSelfM: null,
    timeDelayMs: 0.0,
    predictedCrackGrowthMm: 0.3,
    predictionHorizonHrs: 12,
    trend: 'Stable Laminar Flow',
    wifiSignal: -55,
    battery: 93,
    solarCharging: true,
    gpsPpsLocked: true,
    dmaSamples: 256,
    firmware: 'ESP32-AQUA-v2.4.1',
    depthCm: 25,
    soilType: 'Dry Compacted Sub-Base Soil',
    porePressureKpa: 16.2,
    readings: {
      acousticDb: 26.8,
      pressureBar: 4.15,
      flowDeltaLpm: 1.4,
      crackDetected: false,
      soilMoisturePct: 26.8
    },
    thresholds: {
      acousticDb: 45.0,
      pressureBar: 3.5,
      flowDeltaLpm: 10.0,
      crackDetected: false,
      soilMoisturePct: 45.0
    },
    sensorStatus: {
      acoustic: false,
      pressure: false,
      flow: false,
      crack: false,
      moisture: false
    }
  },
  {
    id: 'N04',
    legacyId: 'NODE-D',
    code: 'N04',
    name: 'Node N04 (South Reservoir Feeder)',
    pairedWith: 'N03',
    segmentId: 'SEG-N03-N04',
    segmentLengthM: 100.0,
    latitude: 28.6126,
    longitude: 77.2089,
    status: 'Online',
    riskLevel: 'L1',
    riskScore: 28,
    aiConfidence: 91.5,
    leakDistanceFromSelfM: 58.2,
    timeDelayMs: -11.08,
    predictedCrackGrowthMm: 3.4,
    predictionHorizonHrs: 12,
    trend: 'Early Joint Micro-Crack Watch (Prior Safety)',
    wifiSignal: -60,
    battery: 88,
    solarCharging: true,
    gpsPpsLocked: true,
    dmaSamples: 256,
    firmware: 'ESP32-AQUA-v2.4.1',
    depthCm: 25,
    soilType: 'Moist Silty Loam',
    porePressureKpa: 31.5,
    readings: {
      acousticDb: 48.2,
      pressureBar: 3.85,
      flowDeltaLpm: 6.4,
      crackDetected: false,
      soilMoisturePct: 41.2
    },
    thresholds: {
      acousticDb: 45.0,
      pressureBar: 3.5,
      flowDeltaLpm: 10.0,
      crackDetected: false,
      soilMoisturePct: 45.0
    },
    sensorStatus: {
      acoustic: true,
      pressure: false,
      flow: false,
      crack: false,
      moisture: false
    }
  }
];

// Safe Shutoff Valves / Relay Reference Points (R-01, R-02 shown in Screenshot 3)
export const SAFE_VALVE_RELAYS = [
  {
    id: 'R-01',
    name: 'Relay & Shutoff Valve R-01 (North-East Trunk Isolation)',
    latitude: 28.6149,
    longitude: 77.2102,
    connectedNode: 'N03',
    status: 'READY'
  },
  {
    id: 'R-02',
    name: 'Relay & Shutoff Valve R-02 (South Sector Isolation)',
    latitude: 28.6124,
    longitude: 77.2091,
    connectedNode: 'N03',
    status: 'READY'
  }
];

// Detected Between-Node Leakage Pinpoints (Calculated via Distance = [L - (v * Δt)] / 2)
export const PINPOINTED_LEAKS = [
  {
    id: 'LEAK-AB-01',
    segmentId: 'SEG-N01-N02',
    nodeA: 'N01',
    nodeB: 'N02',
    totalDistanceM: 100.0,
    soundSpeedMps: 1480,
    timeDelaySec: 0.02365, // 23.65 ms
    distanceFromNodeAM: 32.5,
    distanceFromNodeBM: 67.5,
    latitude: 28.61412,
    longitude: 77.20885,
    severity: 'L3',
    status: 'ACTIVE',
    type: 'Pressurized Pipe Wall Rupture & Sub-Surface Soil Jetting',
    excavationWindow: '1.2m × 0.8m Surgical Spot (Saves 98.8% Road Surface)',
    depthCm: 25,
    pipeMaterial: '1-inch Blue PVC Municipal Trunk (Prototype) / 300mm DI Main',
    estimatedWaterLossLph: 2540,
    aiConfidence: 86.0,
    timestamp: new Date(Date.now() - 1000 * 60 * 6).toISOString()
  },
  {
    id: 'LEAK-CD-02',
    segmentId: 'SEG-N03-N04',
    nodeA: 'N03',
    nodeB: 'N04',
    totalDistanceM: 100.0,
    soundSpeedMps: 1480,
    timeDelaySec: -0.01108, // -11.08 ms
    distanceFromNodeAM: 58.2,
    distanceFromNodeBM: 41.8,
    latitude: 28.61285,
    longitude: 77.20835,
    severity: 'L1',
    status: 'WATCH',
    type: 'Incipient Joint Micro-Crack (Prior Safety Pre-Failure Alert)',
    excavationWindow: 'Preventive Clamp Collar Replacement Scheduled',
    depthCm: 25,
    pipeMaterial: 'Blue PVC Segment N03–N04',
    estimatedWaterLossLph: 180,
    aiConfidence: 91.5,
    timestamp: new Date(Date.now() - 1000 * 60 * 19).toISOString()
  }
];

// Initial Alerts for the Alerts Portal
export const INITIAL_ALERTS = [
  {
    id: 'ALT-2026-001',
    nodeId: 'N02',
    segmentId: 'SEG-N01-N02',
    severity: 'L3',
    title: 'CRITICAL LEAKAGE & PIPE RUPTURE ALERT: Node N02 has reached L3 severity',
    message:
      'All 5 monitored indicators abnormal (Acoustic 84.6 dB, Pressure drop to 2.78 bar, Flow loss 42.4 L/min, Crack signature positive, Soil moisture 78.5%). Cross-correlation pinpoints exact rupture at 32.5 m from N01 (Δt = +23.65 ms).',
    recommendedAction:
      'Dispatch surgical repair team to GPS (28.614120, 77.208850). Excavate 1.2m × 0.8m window at 32.5m mark from N01 without disturbing surrounding road.',
    status: 'Active',
    acknowledgedBy: null,
    timestamp: new Date(Date.now() - 1000 * 60 * 6).toISOString()
  },
  {
    id: 'ALT-2026-002',
    nodeId: 'N04',
    segmentId: 'SEG-N03-N04',
    severity: 'L1',
    title: 'PRIOR SAFETY MICRO-CRACK WATCH: Elevated 1.8 kHz acoustic vibration on Segment N03–N04',
    message:
      'INMP441 DMA snapshot detected early harmonic hiss (48.2 dB) at 58.2 m from N03 (Δt = -11.08 ms). Pressure remains stable at 3.85 bar.',
    recommendedAction:
      'Schedule preventive non-invasive collar inspection during off-peak hours before micro-crack propagates into full rupture.',
    status: 'Active',
    acknowledgedBy: null,
    timestamp: new Date(Date.now() - 1000 * 60 * 24).toISOString()
  }
];
