import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Radio,
  Cpu,
  Wifi,
  BatteryCharging,
  Activity,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import AppShell from '../components/AppShell';
import { useAqua } from '../context/AquaContext';

export default function NodesDataPage() {
  const navigate = useNavigate();
  const { nodes } = useAqua();

  return (
    <AppShell>
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-md">
        <div>
          <div className="flex items-center gap-sm">
            <span className="badge badge-info">ESP32 WIRELESS SENSOR FLEET</span>
            <span className="text-xs text-muted">
              INMP441 I2S Acoustic • NEO-6M GPS 1Hz PPS • 5-Indicator Multi-Detector
            </span>
          </div>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 900, marginTop: '4px' }}>
            Underground Pipeline Sensor Nodes Directory &amp; Live Telemetry
          </h1>
        </div>
      </div>

      {/* 4 NODE DETAIL CARDS GRID (Click any card to open its dedicated /detail/:nodeId portal) */}
      <div className="nodes-cards-grid">
        {nodes.map((node) => {
          const isCritical = node.riskLevel === 'L3';
          return (
            <div
              key={node.id}
              onClick={() => navigate(`/detail/${node.id}`)}
              className="card"
              style={{
                borderTop: `4px solid ${
                  isCritical
                    ? 'var(--critical)'
                    : node.riskLevel === 'L1'
                    ? 'var(--warning)'
                    : 'var(--success)'
                }`,
                cursor: 'pointer',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease'
              }}
            >
              <div
                className="flex items-center justify-between"
                style={{ marginBottom: '10px' }}
              >
                <div>
                  <div className="flex items-center gap-xs flex-wrap">
                    <span style={{ fontSize: '1.1rem', fontWeight: 900 }}>
                      {node.id}
                    </span>
                    <span className="text-xs text-muted">
                      ({node.legacyId} • Paired with {node.pairedWith})
                    </span>
                  </div>
                  <div className="text-xs text-secondary" style={{ marginTop: '2px' }}>
                    {node.name}
                  </div>
                </div>
                <span className={`badge badge-${node.riskLevel}`}>
                  {node.riskLevel}
                </span>
              </div>

              {/* AI Risk & Leak Distance Strip */}
              <div
                className="flex items-center justify-between flex-wrap gap-xs"
                style={{
                  background: 'var(--bg)',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '0.76rem',
                  marginBottom: '12px'
                }}
              >
                <span
                  className="flex items-center gap-xs"
                  style={{ fontWeight: 800, color: '#7c3aed' }}
                >
                  <Sparkles size={13} />
                  <span>
                    AI Risk: {node.riskScore}% ({node.aiConfidence}% conf)
                  </span>
                </span>
                <span style={{ fontWeight: 800, color: 'var(--critical)' }}>
                  {node.leakDistanceFromSelfM
                    ? `Leak @ ${node.leakDistanceFromSelfM}m`
                    : 'No Leak'}
                </span>
              </div>

              {/* 5 Monitored Indicators Mini Grid */}
              <div className="five-indicators-mini-grid">
                {[
                  {
                    label: 'Acoustic',
                    val: `${node.readings.acousticDb}dB`,
                    bad: node.sensorStatus.acoustic
                  },
                  {
                    label: 'Pressure',
                    val: `${node.readings.pressureBar}b`,
                    bad: node.sensorStatus.pressure
                  },
                  {
                    label: 'Flow Δ',
                    val: `${node.readings.flowDeltaLpm}L`,
                    bad: node.sensorStatus.flow
                  },
                  {
                    label: 'Crack AI',
                    val: node.readings.crackDetected ? 'YES' : 'NO',
                    bad: node.sensorStatus.crack
                  },
                  {
                    label: 'Moisture',
                    val: `${node.readings.soilMoisturePct}%`,
                    bad: node.sensorStatus.moisture
                  }
                ].map((m) => (
                  <div
                    key={m.label}
                    style={{
                      background: m.bad
                        ? 'rgba(220, 38, 38, 0.12)'
                        : 'rgba(22, 163, 74, 0.1)',
                      border: `1px solid ${
                        m.bad ? 'rgba(220,38,38,0.35)' : 'rgba(22,163,74,0.28)'
                      }`,
                      borderRadius: '6px',
                      padding: '5px 4px',
                      textAlign: 'center'
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.6rem',
                        color: 'var(--text-muted)',
                        fontWeight: 700
                      }}
                    >
                      {m.label}
                    </div>
                    <div
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        color: m.bad ? '#dc2626' : '#16a34a'
                      }}
                    >
                      {m.val}
                    </div>
                  </div>
                ))}
              </div>

              {/* Hardware Footer */}
              <div
                className="flex items-center justify-between"
                style={{
                  paddingTop: '10px',
                  borderTop: '1px solid var(--border)',
                  fontSize: '0.75rem'
                }}
              >
                <div className="flex items-center gap-md text-muted">
                  <span className="flex items-center gap-xs">
                    <Wifi size={13} /> {node.wifiSignal} dBm
                  </span>
                  <span className="flex items-center gap-xs">
                    <BatteryCharging size={13} color="var(--success)" /> {node.battery}%
                  </span>
                  <span className="flex items-center gap-xs">
                    <Radio size={13} color="var(--primary)" /> 1Hz PPS
                  </span>
                </div>

                <span
                  className="flex items-center gap-xs"
                  style={{ color: 'var(--primary)', fontWeight: 800 }}
                >
                  <span>Open Node Detail</span>
                  <ChevronRight size={15} />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* FULL COMPARATIVE TELEMETRY TABLE */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            Complete 5-Indicator Sensor Matrix Across All Placed ESP32 Nodes
          </div>
          <span className="badge badge-ai">256-SAMPLE DMA SYNCED</span>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Node</th>
                <th>Location &amp; Segment</th>
                <th>Acoustic (INMP441)</th>
                <th>Pressure (Bar)</th>
                <th>Flow Loss (L/m)</th>
                <th>Pipe Crack AI</th>
                <th>Soil Moisture</th>
                <th>Time Delay (Δt)</th>
                <th>Status</th>
                <th>Portal</th>
              </tr>
            </thead>
            <tbody>
              {nodes.map((n) => (
                <tr key={n.id}>
                  <td style={{ fontWeight: 900 }}>{n.id}</td>
                  <td>{n.name}</td>
                  <td
                    style={{
                      fontWeight: 700,
                      color: n.sensorStatus.acoustic ? 'var(--critical)' : 'inherit'
                    }}
                  >
                    {n.readings.acousticDb} dB
                  </td>
                  <td
                    style={{
                      fontWeight: 700,
                      color: n.sensorStatus.pressure ? 'var(--critical)' : 'inherit'
                    }}
                  >
                    {n.readings.pressureBar} bar
                  </td>
                  <td
                    style={{
                      fontWeight: 700,
                      color: n.sensorStatus.flow ? 'var(--critical)' : 'inherit'
                    }}
                  >
                    {n.readings.flowDeltaLpm} L/min
                  </td>
                  <td
                    style={{
                      fontWeight: 800,
                      color: n.sensorStatus.crack ? 'var(--critical)' : 'var(--success)'
                    }}
                  >
                    {n.readings.crackDetected ? 'DETECTED' : 'Clear'}
                  </td>
                  <td
                    style={{
                      fontWeight: 700,
                      color: n.sensorStatus.moisture ? 'var(--critical)' : 'inherit'
                    }}
                  >
                    {n.readings.soilMoisturePct}%
                  </td>
                  <td className="text-mono">{n.timeDelayMs} ms</td>
                  <td>
                    <span className={`badge badge-${n.riskLevel}`}>{n.riskLevel}</span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => navigate(`/detail/${n.id}`)}
                    >
                      Detail &gt;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}

