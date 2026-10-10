import React from 'react';
import { Server, Radio, Cpu, Wifi, CheckCircle2, Activity } from 'lucide-react';
import AppShell from '../components/AppShell';
import { useAqua } from '../context/AquaContext';

export default function ServerStatusPage() {
  const { nodes } = useAqua();

  const services = [
    {
      name: 'Cloud MQTT Telemetry Broker (TLS 1.3)',
      status: 'Operational',
      latency: '14 ms',
      uptime: '99.98%',
      detail: 'Receiving 256-sample DMA burst packets from ESP32 nodes every 1.000s.'
    },
    {
      name: 'NEO-6M GPS 1Hz Pulse-Per-Second (PPS) Time Sync Engine',
      status: 'Operational',
      latency: '< 1 µs jitter',
      uptime: '100.0%',
      detail: '8 GPS satellites locked; aligning Node N01–N04 DMA buffers to microsecond accuracy.'
    },
    {
      name: 'Time-of-Flight Cross-Correlation Math Engine',
      status: 'Operational',
      latency: '8.2 ms',
      uptime: '99.99%',
      detail: 'Computing Distance = [L - (v × Δt)] / 2 across all paired pipeline segments.'
    },
    {
      name: 'Open-Meteo Hydro-Geological Moisture Fusion API',
      status: 'Operational',
      latency: '42 ms',
      uptime: '99.95%',
      detail: 'Synchronizing 0–100cm soil stratification & pore-pressure risk zones.'
    }
  ];

  return (
    <AppShell>
      <div>
        <div className="flex items-center gap-sm">
          <span className="badge badge-L0">ALL SYSTEMS OPERATIONAL</span>
          <span className="text-xs text-muted">
            Cloud MQTT Broker • 1Hz GPS PPS Clock • Edge ESP32 Gateways
          </span>
        </div>
        <h1 style={{ fontSize: '1.35rem', fontWeight: 900, marginTop: '4px' }}>
          Server Infrastructure &amp; Edge Gateway Telemetry Status
        </h1>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '14px'
        }}
      >
        {services.map((srv) => (
          <div
            key={srv.name}
            className="card"
            style={{ borderLeft: '4px solid var(--success)' }}
          >
            <div className="flex items-center justify-between" style={{ marginBottom: '6px' }}>
              <span style={{ fontWeight: 800, fontSize: '0.88rem' }}>{srv.name}</span>
              <CheckCircle2 size={16} color="var(--success)" />
            </div>
            <p className="text-xs text-secondary" style={{ marginBottom: '10px', lineHeight: 1.5 }}>
              {srv.detail}
            </p>
            <div className="flex items-center justify-between text-xs text-muted">
              <span>Latency: <strong>{srv.latency}</strong></span>
              <span>Uptime: <strong style={{ color: 'var(--success)' }}>{srv.uptime}</strong></span>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">ESP32 Edge Gateways &amp; DMA Packet Stream Health</div>
          <span className="badge badge-info">94% BANDWIDTH SAVED VIA BURST MODE</span>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Node ID</th>
                <th>Firmware</th>
                <th>1Hz GPS PPS Lock</th>
                <th>DMA Burst Size</th>
                <th>Wi-Fi RSSI</th>
                <th>18650 Battery</th>
                <th>Solar Charger (TP4056)</th>
              </tr>
            </thead>
            <tbody>
              {nodes.map((n) => (
                <tr key={n.id}>
                  <td style={{ fontWeight: 800 }}>{n.id}</td>
                  <td className="text-mono">{n.firmware}</td>
                  <td style={{ color: 'var(--success)', fontWeight: 700 }}>
                    LOCKED (1Hz PPS)
                  </td>
                  <td className="text-mono">{n.dmaSamples} samples/pkt</td>
                  <td>{n.wifiSignal} dBm</td>
                  <td style={{ fontWeight: 700 }}>{n.battery}%</td>
                  <td style={{ color: 'var(--success)', fontWeight: 700 }}>
                    Charging Active
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

