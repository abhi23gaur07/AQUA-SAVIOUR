import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Cpu,
  Radio,
  Wifi,
  BatteryCharging,
  Activity,
  Droplets,
  Globe,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import AppShell from '../components/AppShell';
import { useAqua } from '../context/AquaContext';

export default function NodeDetailPage() {
  const { nodeId } = useParams();
  const navigate = useNavigate();
  const { nodes } = useAqua();
  const canvasRef = useRef(null);

  const currentNode =
    nodes.find(
      (n) =>
        n.id.toLowerCase() === (nodeId || '').toLowerCase() ||
        (n.legacyId && n.legacyId.toLowerCase() === (nodeId || '').toLowerCase())
    ) || nodes[1];

  const pairedNode =
    nodes.find((n) => n.id === currentNode.pairedWith) || nodes[0];

  // Live 256-Sample INMP441 I2S DMA Acoustic Waveform Oscilloscope
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let phase = 0;

    const draw = () => {
      animId = requestAnimationFrame(draw);
      phase += 0.08;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Grid lines
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.16)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 24) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const isCritical = currentNode.riskLevel === 'L3';
      const amp = isCritical ? h * 0.34 : h * 0.12;

      // Primary Node 256-sample waveform
      ctx.strokeStyle = isCritical ? '#ef4444' : '#0284c7';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const t = (x / w) * 18 + phase;
        const y =
          h / 2 +
          Math.sin(t * 2.1) * amp * 0.65 +
          Math.sin(t * 6.8) * amp * 0.35;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Paired Node delayed waveform (shifted by Δt)
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.6;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const t = (x / w) * 18 + phase - 1.15;
        const y =
          h / 2 +
          Math.sin(t * 2.1) * (amp * 0.52) +
          Math.sin(t * 6.8) * (amp * 0.25);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [currentNode]);

  const fiveIndicators = [
    {
      name: '1. Acoustic Vibration (INMP441 I2S)',
      value: `${currentNode.readings.acousticDb} dB`,
      threshold: `Threshold: ${currentNode.thresholds.acousticDb} dB`,
      pct: Math.min(100, (currentNode.readings.acousticDb / 100) * 100),
      bad: currentNode.sensorStatus.acoustic,
      desc: 'Captures 1.2–2.8 kHz pressurized water hiss through rubber acoustic isolator.'
    },
    {
      name: '2. Internal Pipe Water Pressure',
      value: `${currentNode.readings.pressureBar} bar`,
      threshold: `Min Safe: ${currentNode.thresholds.pressureBar} bar`,
      pct: Math.min(100, (currentNode.readings.pressureBar / 5.0) * 100),
      bad: currentNode.sensorStatus.pressure,
      desc: 'Monitors sudden head pressure drop caused by active pipe wall rupture.'
    },
    {
      name: '3. Between-Node Flow Loss Delta',
      value: `${currentNode.readings.flowDeltaLpm} L/min`,
      threshold: `Max Delta: ${currentNode.thresholds.flowDeltaLpm} L/min`,
      pct: Math.min(100, (currentNode.readings.flowDeltaLpm / 60) * 100),
      bad: currentNode.sensorStatus.flow,
      desc: 'Compares volumetric flow rate between upstream and downstream nodes.'
    },
    {
      name: '4. Pipe Wall Crack Signature (AI)',
      value: currentNode.readings.crackDetected ? 'CRACK DETECTED' : 'INTACT (NO CRACK)',
      threshold: `AI Confidence: ${currentNode.aiConfidence}%`,
      pct: currentNode.readings.crackDetected ? 92 : 12,
      bad: currentNode.sensorStatus.crack,
      desc: 'AI/ML spectral classifier trained on PVC & ductile iron structural micro-cracks.'
    },
    {
      name: '5. Sub-Surface Soil Moisture & Pore Pressure',
      value: `${currentNode.readings.soilMoisturePct}% (${currentNode.porePressureKpa} kPa)`,
      threshold: `Threshold: ${currentNode.thresholds.soilMoisturePct}%`,
      pct: currentNode.readings.soilMoisturePct,
      bad: currentNode.sensorStatus.moisture,
      desc: 'Detects underground soil saturation & pore-pressure buildup around the pipe trench.'
    }
  ];

  return (
    <AppShell>
      {/* Top Bar: Back + Node Switcher Pills */}
      <div className="flex items-center justify-between flex-wrap gap-md">
        <div className="flex items-center gap-sm">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => navigate('/nodes')}
          >
            <ArrowLeft size={14} />
            <span>All Nodes</span>
          </button>
          <div>
            <div className="flex items-center gap-xs">
              <h1 style={{ fontSize: '1.3rem', fontWeight: 900 }}>
                {currentNode.name}
              </h1>
              <span className={`badge badge-${currentNode.riskLevel}`}>
                {currentNode.riskLevel}
              </span>
            </div>
            <div className="text-xs text-muted">
              Paired with {currentNode.pairedWith} • GPS: ({currentNode.latitude},{' '}
              {currentNode.longitude}) • Firmware: {currentNode.firmware}
            </div>
          </div>
        </div>

        {/* Quick Node Switcher */}
        <div className="flex items-center gap-xs">
          {nodes.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => navigate(`/detail/${n.id}`)}
              className={`btn btn-sm ${
                n.id === currentNode.id ? 'btn-primary' : 'btn-secondary'
              }`}
            >
              {n.id} ({n.riskLevel})
            </button>
          ))}
        </div>
      </div>

      {/* TOP HARDWARE & AI SUMMARY STRIP */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(185px, 1fr))',
          gap: '12px'
        }}
      >
        <div className="card" style={{ borderLeft: '4px solid #7c3aed' }}>
          <div className="metric-label">AI LEAK / CRACK RISK</div>
          <div className="metric-value" style={{ color: '#7c3aed', marginTop: '4px' }}>
            {currentNode.riskScore}%
          </div>
          <div className="text-xs text-muted" style={{ marginTop: '4px' }}>
            Confidence: {currentNode.aiConfidence}%
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #dc2626' }}>
          <div className="metric-label">PINPOINTED LEAK OFFSET</div>
          <div className="metric-value" style={{ color: '#dc2626', marginTop: '4px' }}>
            {currentNode.leakDistanceFromSelfM
              ? `${currentNode.leakDistanceFromSelfM} m`
              : 'Nominal'}
          </div>
          <div className="text-xs text-muted" style={{ marginTop: '4px' }}>
            Time Delay Δt: {currentNode.timeDelayMs} ms
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #0284c7' }}>
          <div className="metric-label">NEO-6M GPS PPS CLOCK</div>
          <div className="metric-value" style={{ color: '#0284c7', marginTop: '4px' }}>
            1Hz LOCKED
          </div>
          <div className="text-xs text-muted" style={{ marginTop: '4px' }}>
            256-Sample DMA Burst Active
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #16a34a' }}>
          <div className="metric-label">SOLAR + 18650 BATTERY</div>
          <div className="metric-value" style={{ color: '#16a34a', marginTop: '4px' }}>
            {currentNode.battery}%
          </div>
          <div className="text-xs text-muted" style={{ marginTop: '4px' }}>
            Wi-Fi RSSI: {currentNode.wifiSignal} dBm
          </div>
        </div>
      </div>

      {/* SPLIT: 5 MONITORED INDICATORS (LEFT) + LIVE 256-SAMPLE DMA WAVEFORM & HARDWARE (RIGHT) */}
      <div className="split-node-detail">
        {/* LEFT: 5 MULTI-INDICATOR DETECTOR GAUGES */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              5-Indicator Multi-Sensor Telemetry ({currentNode.id})
            </div>
            <span className="badge badge-ai">REAL-TIME THRESHOLD MONITOR</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {fiveIndicators.map((ind) => (
              <div
                key={ind.name}
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  background: 'var(--bg)',
                  border: `1px solid ${
                    ind.bad ? 'rgba(220,38,38,0.45)' : 'var(--border)'
                  }`
                }}
              >
                <div className="flex items-center justify-between" style={{ marginBottom: '6px' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.86rem' }}>
                    {ind.name}
                  </span>
                  <div className="flex items-center gap-sm">
                    <span
                      className="text-mono"
                      style={{
                        fontWeight: 900,
                        fontSize: '0.9rem',
                        color: ind.bad ? 'var(--critical)' : 'var(--success)'
                      }}
                    >
                      {ind.value}
                    </span>
                    <span
                      className={`badge ${
                        ind.bad ? 'badge-L3' : 'badge-L0'
                      }`}
                    >
                      {ind.bad ? 'ABNORMAL' : 'NORMAL'}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="progress-bar" style={{ marginBottom: '6px' }}>
                  <div
                    className="progress-fill"
                    style={{
                      width: `${ind.pct}%`,
                      background: ind.bad ? 'var(--critical)' : 'var(--success)'
                    }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-muted">
                  <span>{ind.desc}</span>
                  <span className="text-mono">{ind.threshold}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: 256-SAMPLE DMA WAVEFORM + HARDWARE DIAGNOSTICS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card">
            <div className="card-header">
              <div className="card-title flex items-center gap-xs">
                <Activity size={16} color="var(--primary)" />
                <span>
                  256-Sample INMP441 I2S DMA Waveform ({currentNode.id} vs {pairedNode.id})
                </span>
              </div>
              <span className="badge badge-info">Δt = {currentNode.timeDelayMs} ms</span>
            </div>

            <div
              style={{
                background: '#091326',
                borderRadius: '10px',
                padding: '12px',
                border: '1px solid rgba(56, 189, 248, 0.25)'
              }}
            >
              <canvas
                ref={canvasRef}
                width={460}
                height={180}
                style={{ width: '100%', height: '180px', display: 'block' }}
              />
              <div
                className="flex items-center justify-between text-xs"
                style={{ color: '#94a3b8', marginTop: '8px' }}
              >
                <span>Solid Line: {currentNode.id} INMP441 Mic</span>
                <span>Dashed Green: {pairedNode.id} Delayed Wavefront</span>
              </div>
            </div>
          </div>

          {/* Hardware Architecture Box */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                ESP32 Edge Node &amp; Underground Probe Architecture
              </div>
              <span className="badge badge-L0">ALL MODULES OK</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem' }}>
              <div className="flex items-center justify-between" style={{ padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                <span className="text-secondary">Microcontroller &amp; DMA</span>
                <strong>ESP32 Dual-Core (240 MHz + I2S DMA)</strong>
              </div>
              <div className="flex items-center justify-between" style={{ padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                <span className="text-secondary">Underground Acoustic Sensor</span>
                <strong>INMP441 MEMS Mic + Rubber Isolator</strong>
              </div>
              <div className="flex items-center justify-between" style={{ padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                <span className="text-secondary">Clock Synchronization</span>
                <strong>NEO-6M GPS (1Hz Pulse-Per-Second)</strong>
              </div>
              <div className="flex items-center justify-between" style={{ padding: '6px 0' }}>
                <span className="text-secondary">Power Subsystem</span>
                <strong>18650 Li-ion + TP4056 + 6V Solar Panel</strong>
              </div>
            </div>

            <div
              className="flex items-center gap-sm"
              style={{ marginTop: '14px' }}
            >
              <button
                type="button"
                className="btn btn-primary btn-sm"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => navigate('/gis-realtime')}
              >
                <Globe size={14} />
                <span>View on GIS Realtime</span>
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => navigate('/hydro-moisture')}
              >
                <Droplets size={14} />
                <span>View on Hydro Moisture Map</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

