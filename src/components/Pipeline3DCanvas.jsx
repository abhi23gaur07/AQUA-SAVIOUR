import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Pipeline3DCanvas({ onModelClick }) {
  const mountRef = useRef(null);
  const isDraggingRef = useRef(false);
  const pointerDownPosRef = useRef({ x: 0, y: 0 });
  const prevPointerRef = useRef({ x: 0, y: 0 });

  // Spherical camera coordinates (modeled after nexus-nurture-lake.vercel.app)
  const currentSpherical = useRef({ theta: 0.42, phi: 1.18, radius: 11.2 });
  const targetSpherical = useRef({ theta: 0.42, phi: 1.18, radius: 11.2 });
  const cameraTarget = useRef(new THREE.Vector3(0, -0.15, 0));

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const initialRadius =
      width < height
        ? Math.min(18.5, 11.2 * (height / Math.max(width, 280)) * 0.62)
        : 11.2;
    currentSpherical.current.radius = initialRadius;
    targetSpherical.current.radius = initialRadius;

    // Scene setup with deep slate atmosphere (matching nexus-nurture-lake.vercel.app)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0f172a');
    scene.fog = new THREE.FogExp2('#0f172a', 0.018);

    // Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);

    // High-performance WebGLRenderer with ACESFilmicToneMapping & Soft Shadows
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.55;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Studio Lighting (Nexus Nurture style)
    const ambientLight = new THREE.AmbientLight('#cbd5e1', 1.45);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight('#bae6fd', '#1e293b', 1.25);
    scene.add(hemiLight);

    const mainDirLight = new THREE.DirectionalLight('#ffffff', 2.4);
    mainDirLight.position.set(10, 14, 10);
    mainDirLight.castShadow = true;
    mainDirLight.shadow.mapSize.width = 2048;
    mainDirLight.shadow.mapSize.height = 2048;
    mainDirLight.shadow.camera.near = 0.5;
    mainDirLight.shadow.camera.far = 35;
    mainDirLight.shadow.camera.left = -8;
    mainDirLight.shadow.camera.right = 8;
    mainDirLight.shadow.camera.top = 8;
    mainDirLight.shadow.camera.bottom = -8;
    mainDirLight.shadow.bias = -0.0005;
    scene.add(mainDirLight);

    const fillDirLight = new THREE.DirectionalLight('#38bdf8', 1.15);
    fillDirLight.position.set(-8, 8, -8);
    scene.add(fillDirLight);

    // Dynamic Point Lights for Underground Leak & Acoustic Waves
    const leakOrangeLight = new THREE.PointLight('#f97316', 3.4, 8);
    leakOrangeLight.position.set(0.35, -1.25, 0.85);
    scene.add(leakOrangeLight);

    const waterCyanLight = new THREE.PointLight('#06b6d4', 2.8, 7);
    waterCyanLight.position.set(0.35, -0.75, 0.65);
    scene.add(waterCyanLight);

    const gatewaySpotLight = new THREE.SpotLight('#10b981', 2.6, 15, Math.PI / 3, 0.45);
    gatewaySpotLight.position.set(1.65, 4.2, 1.5);
    gatewaySpotLight.target.position.set(1.65, 1.2, 0);
    scene.add(gatewaySpotLight);
    scene.add(gatewaySpotLight.target);

    // Master 3D Cutaway Diorama Group
    const diorama = new THREE.Group();
    scene.add(diorama);

    const boxW = 6.8; // 60 cm physical length representation
    const boxD = 2.25; // Cutaway cross-section width

    // Procedural texture helper for realistic asphalt, soil, gravel, and sand
    const createGranularTexture = (baseHex, speckHex1, speckHex2, density = 4200) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = baseHex;
      ctx.fillRect(0, 0, 512, 512);
      for (let i = 0; i < density; i++) {
        ctx.fillStyle = i % 2 === 0 ? speckHex1 : speckHex2;
        const r = Math.random() * 5 + 1.2;
        ctx.fillRect(Math.random() * 512, Math.random() * 512, r, r);
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(3, 1);
      return tex;
    };

    const gravelTex = createGranularTexture('#3b2c20', '#5c4633', '#1c130d', 5500);
    const sandTex = createGranularTexture('#b49469', '#d2b48c', '#856843', 5000);
    const asphaltTex = createGranularTexture('#1e242b', '#2d3540', '#11151a', 4800);

    // 0. ARCHITECTURAL PEDESTAL BASE UNDER DIORAMA
    const pedestalMesh = new THREE.Mesh(
      new THREE.BoxGeometry(boxW + 0.36, 0.22, boxD + 0.36),
      new THREE.MeshStandardMaterial({
        color: '#090d16',
        roughness: 0.35,
        metalness: 0.45
      })
    );
    pedestalMesh.position.set(0, -2.32, 0);
    pedestalMesh.receiveShadow = true;
    diorama.add(pedestalMesh);

    // 1. BOTTOM SAND BEDDING LAYER (10 cm Pipe Trench Base)
    const bottomSandMat = new THREE.MeshStandardMaterial({
      map: sandTex,
      roughness: 0.9
    });
    const bottomSand = new THREE.Mesh(
      new THREE.BoxGeometry(boxW, 0.46, boxD),
      bottomSandMat
    );
    bottomSand.position.set(0, -1.96, 0);
    bottomSand.receiveShadow = true;
    diorama.add(bottomSand);

    // 2. INTERNAL UNDERGROUND PIPELINE LAYER (1-inch Blue PVC Water Pipe + Cutaway Flow)
    const pipeGroup = new THREE.Group();

    // Outer Blue PVC Pipe (Left & Right segments with central cutaway window)
    const pvcMat = new THREE.MeshStandardMaterial({
      color: '#1868c7',
      roughness: 0.22,
      metalness: 0.18
    });
    const mainPipe = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.35, boxW - 0.08, 40).rotateZ(Math.PI / 2),
      pvcMat
    );
    mainPipe.position.set(0, -1.42, 0.22);
    mainPipe.castShadow = true;
    mainPipe.receiveShadow = true;
    pipeGroup.add(mainPipe);

    // Pipe Coupling Rings along the PVC pipeline
    const collarMat = new THREE.MeshStandardMaterial({
      color: '#1d4ed8',
      roughness: 0.3,
      metalness: 0.25
    });
    [-2.35, 2.35].forEach((cx) => {
      const collar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.385, 0.385, 0.24, 32).rotateZ(Math.PI / 2),
        collarMat
      );
      collar.position.set(cx, -1.42, 0.22);
      pipeGroup.add(collar);
    });

    // Open Pipe End Rings on Left & Right Cutaway Faces
    const pipeInsideMat = new THREE.MeshStandardMaterial({
      color: '#082f49',
      roughness: 0.4
    });
    [-boxW / 2 + 0.02, boxW / 2 - 0.02].forEach((endX) => {
      const endCore = new THREE.Mesh(
        new THREE.CylinderGeometry(0.28, 0.28, 0.08, 32).rotateZ(Math.PI / 2),
        pipeInsideMat
      );
      endCore.position.set(endX, -1.42, 0.22);
      pipeGroup.add(endCore);
    });

    // Secondary Parallel Blue Pipes in Background of Cutaway (matching Image 5)
    const backPipeMat = new THREE.MeshStandardMaterial({
      color: '#1352a0',
      roughness: 0.32
    });
    const backPipe1 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.29, 0.29, boxW - 0.12, 28).rotateZ(Math.PI / 2),
      backPipeMat
    );
    backPipe1.position.set(0, -1.42, -0.38);
    pipeGroup.add(backPipe1);

    const backPipe2 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.24, boxW - 0.12, 24).rotateZ(Math.PI / 2),
      backPipeMat
    );
    backPipe2.position.set(0, -1.45, -0.82);
    pipeGroup.add(backPipe2);

    diorama.add(pipeGroup);

    // 3. UPPER SAND BEDDING LAYER (Above Pipe)
    const midSand = new THREE.Mesh(
      new THREE.BoxGeometry(boxW, 0.38, boxD),
      bottomSandMat
    );
    midSand.position.set(0, -0.92, 0);
    midSand.receiveShadow = true;
    diorama.add(midSand);

    // 4. SUB-SURFACE COMPACTED SOIL & GRAVEL LAYER (15 cm)
    const gravelMat = new THREE.MeshStandardMaterial({
      map: gravelTex,
      roughness: 0.94
    });
    const gravelLayer = new THREE.Mesh(
      new THREE.BoxGeometry(boxW, 1.38, boxD),
      gravelMat
    );
    gravelLayer.position.set(0, -0.04, 0);
    gravelLayer.receiveShadow = true;
    diorama.add(gravelLayer);

    // Embedded rocks/pebbles on the front cutaway soil face for 3D depth
    const pebbleMat1 = new THREE.MeshStandardMaterial({ color: '#64748b', roughness: 0.85 });
    const pebbleMat2 = new THREE.MeshStandardMaterial({ color: '#78716c', roughness: 0.9 });
    for (let i = 0; i < 38; i++) {
      const pebble = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.04 + Math.random() * 0.055, 0),
        i % 2 === 0 ? pebbleMat1 : pebbleMat2
      );
      pebble.position.set(
        (Math.random() - 0.5) * (boxW - 0.5),
        -0.55 + Math.random() * 1.05,
        boxD / 2 + 0.01
      );
      pebble.rotation.set(Math.random() * 3, Math.random() * 3, 0);
      diorama.add(pebble);
    }

    // 5. TOP ROAD / ASPHALT SURFACE LAYER (5 cm)
    const roadMat = new THREE.MeshStandardMaterial({
      map: asphaltTex,
      roughness: 0.82
    });
    const roadMesh = new THREE.Mesh(
      new THREE.BoxGeometry(boxW, 0.34, boxD),
      roadMat
    );
    roadMesh.position.set(0, 0.82, 0);
    roadMesh.receiveShadow = true;
    diorama.add(roadMesh);

    // White Dashed Highway Center Markings
    const stripeMat = new THREE.MeshBasicMaterial({ color: '#f8fafc' });
    for (let x = -2.7; x <= 2.7; x += 0.78) {
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.02, 0.095), stripeMat);
      stripe.position.set(x, 0.995, 0.16);
      diorama.add(stripe);
    }

    // Concrete Road Edge Curbs
    const curbMat = new THREE.MeshStandardMaterial({ color: '#64748b', roughness: 0.7 });
    const frontCurb = new THREE.Mesh(new THREE.BoxGeometry(boxW, 0.08, 0.08), curbMat);
    frontCurb.position.set(0, 1.01, boxD / 2 - 0.04);
    diorama.add(frontCurb);

    const backCurb = new THREE.Mesh(new THREE.BoxGeometry(boxW, 0.08, 0.08), curbMat);
    backCurb.position.set(0, 1.01, -boxD / 2 + 0.04);
    diorama.add(backCurb);

    // 6. CLAMPED UNDERGROUND SENSOR NODES (INMP441 I2S Acoustic Mics + Rubber Straps)
    const createSensorNode = (posX) => {
      const sGroup = new THREE.Group();
      sGroup.position.set(posX, -1.42, 0.22);

      // Black Rubber Isolator Clamp Strap
      const clampMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.39, 0.39, 0.38, 32).rotateZ(Math.PI / 2),
        new THREE.MeshStandardMaterial({ color: '#111827', roughness: 0.55, metalness: 0.35 })
      );
      sGroup.add(clampMesh);

      // Green INMP441 MEMS PCB Module
      const pcbMesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.32, 0.08, 0.26),
        new THREE.MeshStandardMaterial({ color: '#16a34a', metalness: 0.45, roughness: 0.3 })
      );
      pcbMesh.position.set(0, 0.39, 0.04);
      sGroup.add(pcbMesh);

      // Gold I2S Header Pins
      const goldPins = new THREE.Mesh(
        new THREE.BoxGeometry(0.18, 0.06, 0.14),
        new THREE.MeshStandardMaterial({ color: '#fbbf24', metalness: 0.85, roughness: 0.2 })
      );
      goldPins.position.set(0, 0.44, 0.04);
      sGroup.add(goldPins);

      // Armored Signal Conduit Cable rising toward surface
      const conduit = new THREE.Mesh(
        new THREE.CylinderGeometry(0.025, 0.025, 2.2, 12),
        new THREE.MeshStandardMaterial({ color: '#38bdf8', emissive: '#0284c7', emissiveIntensity: 0.35 })
      );
      conduit.position.set(0, 1.15, -0.05);
      sGroup.add(conduit);

      return sGroup;
    };

    // Primary Sensor Node A (Left of Leak) & Sensor Node B (Right of Leak)
    diorama.add(createSensorNode(-1.15));
    diorama.add(createSensorNode(1.75));

    // 7. ACOUSTIC VIBRATION RINGS (Orange concentric wave arcs propagating along pipe)
    const leakX = 0.32;
    const leakY = -1.42;
    const leakZ = 0.22;

    const waveRings = [];
    const ringMatBase = new THREE.MeshBasicMaterial({
      color: '#f97316',
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide
    });

    for (let i = 0; i < 8; i++) {
      const ringGeo = new THREE.RingGeometry(0.38, 0.44, 36);
      ringGeo.rotateY(Math.PI / 2);
      const mat = ringMatBase.clone();
      const mesh = new THREE.Mesh(ringGeo, mat);
      mesh.position.set(leakX, leakY, leakZ);
      diorama.add(mesh);
      waveRings.push({
        mesh,
        dir: i % 2 === 0 ? -1 : 1,
        phase: (i / 8) * Math.PI * 2
      });
    }

    // 8. PIPE CRACK & HIGH-PRESSURE WATER LEAK JET SPRAY
    const leakCollar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.375, 0.375, 0.16, 28).rotateZ(Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: '#7dd3fc', transparent: true, opacity: 0.9 })
    );
    leakCollar.position.set(leakX, leakY, leakZ);
    diorama.add(leakCollar);

    // Water cavity mist glow around leak in soil
    const cavityGlow = new THREE.Mesh(
      new THREE.SphereGeometry(0.45, 24, 24),
      new THREE.MeshBasicMaterial({
        color: '#38bdf8',
        transparent: true,
        opacity: 0.22
      })
    );
    cavityGlow.position.set(leakX, leakY + 0.38, leakZ + 0.15);
    diorama.add(cavityGlow);

    // Animated Water Spray Particles shooting upward from crack
    const particleCount = 180;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = [];
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = leakX;
      particlePositions[i * 3 + 1] = leakY + 0.25;
      particlePositions[i * 3 + 2] = leakZ + 0.22;
      particleVelocities.push({
        vx: (Math.random() - 0.5) * 0.022,
        vy: 0.028 + Math.random() * 0.04,
        vz: (Math.random() - 0.5) * 0.016,
        life: Math.random()
      });
    }
    const sprayGeo = new THREE.BufferGeometry();
    sprayGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const sprayMat = new THREE.PointsMaterial({
      color: '#e0f2fe',
      size: 0.095,
      transparent: true,
      opacity: 0.92
    });
    const sprayPoints = new THREE.Points(sprayGeo, sprayMat);
    diorama.add(sprayPoints);

    // 9. SURFACE SMART EDGE GATEWAY PILLAR + SOLAR PANEL + ESP32 + 18650 BATTERY (Right)
    const gatewayGroup = new THREE.Group();
    gatewayGroup.position.set(1.65, 1.92, -0.05);

    const pillarBox = new THREE.Mesh(
      new THREE.BoxGeometry(1.24, 1.85, 0.96),
      new THREE.MeshStandardMaterial({ color: '#f8fafc', roughness: 0.28 })
    );
    pillarBox.castShadow = true;
    pillarBox.receiveShadow = true;
    gatewayGroup.add(pillarBox);

    // Dark recessed interior bay showing ESP32 + NEO-6M GPS + 18650 Battery
    const recessBox = new THREE.Mesh(
      new THREE.BoxGeometry(0.92, 1.46, 0.14),
      new THREE.MeshStandardMaterial({ color: '#0f172a', roughness: 0.7 })
    );
    recessBox.position.set(0, 0.02, 0.43);
    gatewayGroup.add(recessBox);

    // ESP32 Microcontroller Board
    const espBoard = new THREE.Mesh(
      new THREE.BoxGeometry(0.58, 0.76, 0.08),
      new THREE.MeshStandardMaterial({ color: '#065f46', metalness: 0.5, roughness: 0.35 })
    );
    espBoard.position.set(-0.06, 0.2, 0.48);
    gatewayGroup.add(espBoard);

    // Blinking Status LEDs
    const statusLed = new THREE.Mesh(
      new THREE.SphereGeometry(0.055, 14, 14),
      new THREE.MeshBasicMaterial({ color: '#22c55e' })
    );
    statusLed.position.set(0.14, 0.38, 0.54);
    gatewayGroup.add(statusLed);

    // Purple 18650 Li-ion Battery Cell at bottom of recess
    const batteryMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.115, 0.115, 0.72, 24).rotateZ(Math.PI / 2),
      new THREE.MeshStandardMaterial({ color: '#9333ea', metalness: 0.55, roughness: 0.28 })
    );
    batteryMesh.position.set(0, -0.5, 0.5);
    gatewayGroup.add(batteryMesh);

    // Tilted Photovoltaic Solar Panel on top of Pillar
    const solarGroup = new THREE.Group();
    solarGroup.position.set(0, 1.12, 0);
    solarGroup.rotation.x = 0.38;
    solarGroup.rotation.z = -0.08;

    const solarFrame = new THREE.Mesh(
      new THREE.BoxGeometry(1.25, 0.07, 1.02),
      new THREE.MeshStandardMaterial({ color: '#e2e8f0', roughness: 0.3 })
    );
    solarFrame.castShadow = true;
    solarGroup.add(solarFrame);

    const solarCells = new THREE.Mesh(
      new THREE.BoxGeometry(1.12, 0.08, 0.88),
      new THREE.MeshStandardMaterial({
        color: '#1e3a8a',
        metalness: 0.68,
        roughness: 0.18
      })
    );
    solarGroup.add(solarCells);
    gatewayGroup.add(solarGroup);

    // Black LoRa / Wi-Fi Whip Antenna
    const antenna = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.048, 1.25, 16),
      new THREE.MeshStandardMaterial({ color: '#090d16', roughness: 0.4 })
    );
    antenna.position.set(0.62, 0.96, 0.34);
    gatewayGroup.add(antenna);

    // Pulsing GPS PPS Ring above gateway
    const gpsPulseRing = new THREE.Mesh(
      new THREE.RingGeometry(0.28, 0.33, 32).rotateX(Math.PI / 2),
      new THREE.MeshBasicMaterial({
        color: '#10b981',
        transparent: true,
        opacity: 0.65,
        side: THREE.DoubleSide
      })
    );
    gpsPulseRing.position.set(0, 1.55, 0);
    gatewayGroup.add(gpsPulseRing);

    diorama.add(gatewayGroup);

    // 10. SURFACE GIS LAPTOP WORKSTATION ON ROAD (Left)
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(-1.85, 1.02, 0.06);
    laptopGroup.rotation.y = 0.24;

    const laptopBase = new THREE.Mesh(
      new THREE.BoxGeometry(1.52, 0.07, 1.06),
      new THREE.MeshStandardMaterial({ color: '#94a3b8', metalness: 0.72, roughness: 0.28 })
    );
    laptopBase.castShadow = true;
    laptopGroup.add(laptopBase);

    const keyboardArea = new THREE.Mesh(
      new THREE.BoxGeometry(1.3, 0.08, 0.62),
      new THREE.MeshStandardMaterial({ color: '#0f172a', roughness: 0.8 })
    );
    keyboardArea.position.set(0, 0.01, -0.08);
    laptopGroup.add(keyboardArea);

    // Laptop Screen Texture showing Live GIS Pipeline Map
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 512;
    screenCanvas.height = 320;
    const sctx = screenCanvas.getContext('2d');
    sctx.fillStyle = '#091526';
    sctx.fillRect(0, 0, 512, 320);
    sctx.strokeStyle = '#1e293b';
    sctx.lineWidth = 2;
    for (let x = 0; x < 512; x += 36) {
      sctx.beginPath();
      sctx.moveTo(x, 0);
      sctx.lineTo(x, 320);
      sctx.stroke();
    }
    for (let y = 0; y < 320; y += 36) {
      sctx.beginPath();
      sctx.moveTo(0, y);
      sctx.lineTo(512, y);
      sctx.stroke();
    }
    // Blue pipeline vector on laptop screen
    sctx.strokeStyle = '#38bdf8';
    sctx.lineWidth = 8;
    sctx.beginPath();
    sctx.moveTo(40, 180);
    sctx.lineTo(470, 135);
    sctx.stroke();
    // Red target radar on laptop screen
    sctx.strokeStyle = '#ef4444';
    sctx.lineWidth = 5;
    sctx.beginPath();
    sctx.arc(235, 160, 44, 0, Math.PI * 2);
    sctx.stroke();
    sctx.fillStyle = '#ef4444';
    sctx.beginPath();
    sctx.arc(235, 160, 11, 0, Math.PI * 2);
    sctx.fill();

    const screenTex = new THREE.CanvasTexture(screenCanvas);
    const screenGroup = new THREE.Group();
    screenGroup.position.set(0, 0.04, -0.5);
    screenGroup.rotation.x = -0.22;

    const screenBack = new THREE.Mesh(
      new THREE.BoxGeometry(1.52, 1.0, 0.06),
      new THREE.MeshStandardMaterial({ color: '#1e293b', metalness: 0.5, roughness: 0.4 })
    );
    screenBack.position.set(0, 0.5, 0);
    screenBack.castShadow = true;
    screenGroup.add(screenBack);

    const screenDisplay = new THREE.Mesh(
      new THREE.PlaneGeometry(1.4, 0.88),
      new THREE.MeshBasicMaterial({ map: screenTex })
    );
    screenDisplay.position.set(0, 0.5, 0.035);
    screenGroup.add(screenDisplay);

    laptopGroup.add(screenGroup);
    diorama.add(laptopGroup);

    // 11. CLEAR ACRYLIC VIEWING ENCLOSURE + 4 BRUSHED STEEL CORNER BOLTS
    const acrylicGeo = new THREE.BoxGeometry(boxW + 0.06, 3.24, boxD + 0.08);
    const acrylicEdges = new THREE.EdgesGeometry(acrylicGeo);
    const acrylicWire = new THREE.LineSegments(
      acrylicEdges,
      new THREE.LineBasicMaterial({ color: '#38bdf8', transparent: true, opacity: 0.55 })
    );
    acrylicWire.position.set(0, -0.58, 0);
    diorama.add(acrylicWire);

    const boltGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.14, 20).rotateX(Math.PI / 2);
    const boltMat = new THREE.MeshStandardMaterial({
      color: '#e2e8f0',
      metalness: 0.88,
      roughness: 0.18
    });
    [
      [-boxW / 2 + 0.24, 0.74, boxD / 2 + 0.05],
      [boxW / 2 - 0.24, 0.74, boxD / 2 + 0.05],
      [-boxW / 2 + 0.24, -1.94, boxD / 2 + 0.05],
      [boxW / 2 - 0.24, -1.94, boxD / 2 + 0.05]
    ].forEach(([bx, by, bz]) => {
      const bolt = new THREE.Mesh(boltGeo, boltMat);
      bolt.position.set(bx, by, bz);
      diorama.add(bolt);
    });

    // 12. 3D EMBOSSED "AQUA SAVIOUR" PLATE MOUNTED DIRECTLY ON THE 3D MODEL FRONT
    const badgeCanvas = document.createElement('canvas');
    badgeCanvas.width = 1024;
    badgeCanvas.height = 192;
    const bctx = badgeCanvas.getContext('2d');
    bctx.fillStyle = '#061326';
    bctx.fillRect(0, 0, 1024, 192);
    bctx.strokeStyle = '#38bdf8';
    bctx.lineWidth = 8;
    bctx.strokeRect(8, 8, 1008, 176);
    bctx.font = '900 84px Inter, sans-serif';
    bctx.textAlign = 'center';
    bctx.textBaseline = 'middle';
    bctx.fillStyle = '#ffffff';
    bctx.shadowColor = '#38bdf8';
    bctx.shadowBlur = 22;
    bctx.fillText('AQUA SAVIOUR', 512, 98);

    const badgeTex = new THREE.CanvasTexture(badgeCanvas);
    const badgePlate = new THREE.Mesh(
      new THREE.BoxGeometry(2.65, 0.48, 0.08),
      new THREE.MeshStandardMaterial({
        color: '#0f172a',
        metalness: 0.7,
        roughness: 0.25
      })
    );
    badgePlate.position.set(0, -2.28, boxD / 2 + 0.18);
    diorama.add(badgePlate);

    const badgeFace = new THREE.Mesh(
      new THREE.PlaneGeometry(2.58, 0.44),
      new THREE.MeshBasicMaterial({ map: badgeTex })
    );
    badgeFace.position.set(0, -2.28, boxD / 2 + 0.225);
    diorama.add(badgeFace);

    // Pointer / Touch / Wheel Interaction (Spherical Orbit + Click Anywhere to Enter)
    const handlePointerDown = (e) => {
      isDraggingRef.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      pointerDownPosRef.current = { x: clientX, y: clientY };
      prevPointerRef.current = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e) => {
      if (!isDraggingRef.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const dx = clientX - prevPointerRef.current.x;
      const dy = clientY - prevPointerRef.current.y;
      prevPointerRef.current = { x: clientX, y: clientY };

      targetSpherical.current.theta -= dx * 0.0055;
      targetSpherical.current.phi = Math.max(
        0.35,
        Math.min(1.48, targetSpherical.current.phi - dy * 0.0045)
      );
    };

    const handlePointerUp = (e) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      const clientX =
        'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
      const clientY =
        'changedTouches' in e ? e.changedTouches[0].clientY : e.clientY;
      const moveDist = Math.hypot(
        clientX - pointerDownPosRef.current.x,
        clientY - pointerDownPosRef.current.y
      );
      if (moveDist < 8 && onModelClick) {
        onModelClick();
      }
    };

    const handleWheel = (e) => {
      e.preventDefault();
      targetSpherical.current.radius = Math.max(
        6.5,
        Math.min(20, targetSpherical.current.radius + e.deltaY * 0.01)
      );
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    domElem.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);
    domElem.addEventListener('wheel', handleWheel, { passive: false });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop (Smooth Spherical Damping + Auto-Orbit + Acoustic Wave & Spray Physics)
    let reqId;
    let prevTime = performance.now();
    const startTime = performance.now();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const now = performance.now();
      const dt = (now - prevTime) / 1000;
      prevTime = now;
      const elapsed = (now - startTime) / 1000;

      // Gentle auto-orbit when not dragging (matching nexus-nurture-lake.vercel.app)
      if (!isDraggingRef.current) {
        targetSpherical.current.theta += dt * 0.075;
      }

      // Smooth damping interpolation
      currentSpherical.current.theta +=
        (targetSpherical.current.theta - currentSpherical.current.theta) * 0.08;
      currentSpherical.current.phi +=
        (targetSpherical.current.phi - currentSpherical.current.phi) * 0.08;
      currentSpherical.current.radius +=
        (targetSpherical.current.radius - currentSpherical.current.radius) * 0.08;

      const { theta, phi, radius } = currentSpherical.current;
      camera.position.x =
        cameraTarget.current.x + radius * Math.sin(phi) * Math.sin(theta);
      camera.position.y = cameraTarget.current.y + radius * Math.cos(phi);
      camera.position.z =
        cameraTarget.current.z + radius * Math.sin(phi) * Math.cos(theta);
      camera.lookAt(cameraTarget.current);

      // Pulse leak light & GPS ring
      leakOrangeLight.intensity = 3.2 + Math.sin(elapsed * 7) * 0.6;
      const gpsScale = 1 + ((elapsed * 0.85) % 1) * 3.2;
      gpsPulseRing.scale.set(gpsScale, gpsScale, gpsScale);
      gpsPulseRing.material.opacity = Math.max(0, 0.65 - (gpsScale - 1) * 0.2);

      // Animate bi-directional orange acoustic wave rings along the blue PVC pipe
      waveRings.forEach((item) => {
        const progress =
          ((elapsed * 1.15 + item.phase) % (Math.PI * 2)) / (Math.PI * 2);
        const offset = progress * 2.55 * item.dir;
        item.mesh.position.x = leakX + offset;
        const scale = 1 + progress * 0.85;
        item.mesh.scale.set(scale, scale, scale);
        item.mesh.material.opacity = (1 - progress) * 0.92;
      });

      // Animate pressurized water leak spray particles
      const posAttr = sprayGeo.getAttribute('position');
      for (let i = 0; i < particleCount; i++) {
        const v = particleVelocities[i];
        v.life += 0.032;
        if (v.life >= 1) {
          v.life = 0;
          posAttr.setXYZ(i, leakX, leakY + 0.22, leakZ + 0.22);
        } else {
          const curX = posAttr.getX(i) + v.vx;
          const curY = posAttr.getY(i) + v.vy * (1 - v.life * 0.45);
          const curZ = posAttr.getZ(i) + v.vz;
          posAttr.setXYZ(i, curX, curY, curZ);
        }
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      domElem.removeEventListener('mousedown', handlePointerDown);
      domElem.removeEventListener('touchstart', handlePointerDown);
      domElem.removeEventListener('wheel', handleWheel);
      if (container.contains(domElem)) {
        container.removeChild(domElem);
      }
      renderer.dispose();
    };
  }, [onModelClick]);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        zIndex: 0
      }}
    />
  );
}
