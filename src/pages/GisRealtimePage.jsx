import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Circle
} from 'react-leaflet';
import L from 'leaflet';
import {
  Globe,
  Crosshair,
  Droplets,
  Navigation,
  Wrench,
  Calculator,
  ArrowRight
} from 'lucide-react';
import AppShell from '../components/AppShell';
import { useAqua } from '../context/AquaContext';

function createLeakTargetPin(distanceM, severity) {
  const bg = severity === 'L3' ? '#dc2626' : '#eab308';
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background:${bg};
        color:#ffffff;
        border:2px solid #ffffff;
        border-radius:999px;
        padding:4px 12px;
        font-size:11px;
        font-weight:800;
        box-shadow:0 4px 14px rgba(220,38,38,0.55);
        white-space:nowrap;
        font-family:Inter,sans-serif;
      ">
        🎯 LEAK @ ${distanceM}m from N01
      </div>
    `,
    iconSize: [150, 28],
    iconAnchor: [75, 14]
  });
}

function createGisNodePin(node) {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background:#0f172a;
        color:#38bdf8;
        border:2px solid #38bdf8;
        border-radius:8px;
        padding:3px 9px;
        font-size:11px;
        font-weight:800;
        box-shadow:0 4px 12px rgba(0,0,0,0.45);
        white-space:nowrap;
        font-family:Inter,sans-serif;
      ">
        ${node.id} (${node.latitude.toFixed(4)}, ${node.longitude.toFixed(4)})
      </div>
    `,
    iconSize: [148, 26],
    iconAnchor: [74, 13]
  });
}

export default function GisRealtimePage() {
  const navigate = useNavigate();
  const { nodes, leaks } = useAqua();

  const [baseMap, setBaseMap] = useState('satellite'); // 'satellite' | 'street' | 'topo' | 'dark'
  const [segmentLenM, setSegmentLenM] = useState(100);
  const [soundVelMps, setSoundVelMps] = useState(1480);
  const [deltaTMs, setDeltaTMs] = useState(23.65);

  // Live Time-of-Flight calculation: Distance = [L - (v * Δt)] / 2
  const deltaTSec = deltaTMs / 1000;
  const computedDistFromN01 = Math.max(
    0,
    Math.min(
      segmentLenM,
      Number(((segmentLenM - soundVelMps * deltaTSec) / 2).toFixed(2))
    )
  );
  const computedDistFromN02 = Number((segmentLenM - computedDistFromN01).toFixed(2));
  const ratio = computedDistFromN01 / (segmentLenM || 100);

  const n01 = nodes[0];
  const n02 = nodes[1];
  const interpolatedLat = Number(
    (n01.latitude + (n02.latitude - n01.latitude) * ratio).toFixed(6)
  );
  const interpolatedLng = Number(
    (n01.longitude + (n02.longitude - n01.longitude) * ratio).toFixed(6)
  );

  const tileUrls = {
    satellite:
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    street: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    topo: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
  };

  return (
    <AppShell>
      {/* Top Header */}
      <div className="flex items-center justify-between flex-wrap gap-md">
        <div>
          <div className="flex items-center gap-sm">
            <span className="badge badge-info">GIS REALTIME PORTAL</span>
            <span className="text-xs text-muted">
              Spatial Between-Node Leak Triangulation &amp; Surgical Excavation GIS
            </span>
          </div>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 900, marginTop: '4px' }}>
            GIS Details &amp; Real-Time Between-Node Pipeline Triangulation
          </h1>
        </div>

        <div className="flex items-center gap-sm">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => navigate('/hydro-moisture')}
          >
            <Droplets size={14} />
            <span>Open Hydro Moisture Map (GIS Engineer)</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* SPLIT: INTERACTIVE GIS MAP (LEFT) + TIME-OF-FLIGHT GIS CALCULATOR (RIGHT) */}
      <div className="split-gis-sidebar">
        {/* LEFT: GIS MAP WITH BASE LAYER SWITCHER */}
        <div className="card" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px', minWidth: 0 }}>
          <div className="flex items-center justify-between flex-wrap gap-sm">
            <div className="flex items-center gap-xs">
              <Globe size={16} color="var(--primary)" />
              <span style={{ fontWeight: 800, fontSize: '0.92rem' }}>
                Precision GPS Coordinate Projection ({interpolatedLat}, {interpolatedLng})
              </span>
            </div>

            <div className="flex items-center gap-xs">
              {[
                { id: 'satellite', label: 'Satellite' },
                { id: 'dark', label: 'Dark GIS' },
                { id: 'street', label: 'Street' },
                { id: 'topo', label: 'Terrain' }
              ].map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBaseMap(b.id)}
                  className={`btn btn-sm ${
                    baseMap === b.id ? 'btn-primary' : 'btn-secondary'
                  }`}
                  style={{ padding: '4px 10px', fontSize: '0.73rem' }}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              height: '440px',
              borderRadius: '10px',
              overflow: 'hidden',
              border: '1px solid var(--border)'
            }}
          >
            <MapContainer
              center={[interpolatedLat, interpolatedLng]}
              zoom={17}
              scrollWheelZoom={true}
              style={{ width: '100%', height: '100%' }}
            >
              <TileLayer url={tileUrls[baseMap]} maxZoom={19} />

              {/* Full Underground Pipeline Polyline */}
              <Polyline
                positions={nodes.map((n) => [n.latitude, n.longitude])}
                pathOptions={{
                  color: '#0284c7',
                  weight: 7,
                  opacity: 0.9
                }}
              />

              {/* Highlighted Rupture Segment N01 -> N02 */}
              <Polyline
                positions={[
                  [n01.latitude, n01.longitude],
                  [n02.latitude, n02.longitude]
                ]}
                pathOptions={{
                  color: '#ef4444',
                  weight: 4,
                  dashArray: '8, 8'
                }}
              />

              {/* Surgical Excavation Radius Circle */}
              <Circle
                center={[interpolatedLat, interpolatedLng]}
                radius={24}
                pathOptions={{
                  color: '#dc2626',
                  fillColor: '#ef4444',
                  fillOpacity: 0.35,
                  weight: 2
                }}
              />

              {/* Live Triangulated Leak Marker */}
              <Marker
                position={[interpolatedLat, interpolatedLng]}
                icon={createLeakTargetPin(computedDistFromN01, 'L3')}
              >
                <Popup>
                  <div style={{ padding: '10px' }}>
                    <strong style={{ color: '#dc2626' }}>
                      Triangulated Leak Spot (Segment N01–N02)
                    </strong>
                    <div style={{ fontSize: '0.76rem', marginTop: '4px' }}>
                      <div>Distance from N01: <strong>{computedDistFromN01} m</strong></div>
                      <div>Distance from N02: <strong>{computedDistFromN02} m</strong></div>
                      <div>GPS: {interpolatedLat}, {interpolatedLng}</div>
                      <div>Surgical Window: 1.2m × 0.8m (Zero Road Damage)</div>
                    </div>
                  </div>
                </Popup>
              </Marker>

              {/* Node Coordinate Pins */}
              {nodes.map((node) => (
                <Marker
                  key={node.id}
                  position={[node.latitude, node.longitude]}
                  icon={createGisNodePin(node)}
                >
                  <Popup>
                    <div style={{ padding: '10px' }}>
                      <strong>{node.name}</strong>
                      <div style={{ fontSize: '0.75rem', marginTop: '4px' }}>
                        GPS: {node.latitude}, {node.longitude}
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        style={{ width: '100%', marginTop: '8px', justifyContent: 'center' }}
                        onClick={() => navigate(`/detail/${node.id}`)}
                      >
                        Open {node.id} Detail →
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* RIGHT: INTERACTIVE TIME-OF-FLIGHT GIS TRIANGULATION ENGINE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="card" style={{ borderTop: '4px solid var(--primary)' }}>
            <div className="card-header">
              <div className="card-title flex items-center gap-xs">
                <Calculator size={16} color="var(--primary)" />
                <span>Between-Node GIS Triangulation</span>
              </div>
              <span className="badge badge-L3">LIVE MATH</span>
            </div>

            {/* Visual Pipe Bar */}
            <div
              style={{
                background: 'var(--bg)',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                marginBottom: '12px'
              }}
            >
              <div
                className="flex items-center justify-between"
                style={{ fontSize: '0.74rem', fontWeight: 800, marginBottom: '8px' }}
              >
                <span style={{ color: 'var(--primary)' }}>N01 (0m)</span>
                <span style={{ color: 'var(--critical)' }}>
                  LEAK @ {computedDistFromN01}m
                </span>
                <span style={{ color: 'var(--primary)' }}>N02 ({segmentLenM}m)</span>
              </div>

              <div
                style={{
                  position: 'relative',
                  height: '14px',
                  background: 'linear-gradient(90deg, #0284c7, #38bdf8)',
                  borderRadius: '999px'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: `${Math.min(98, Math.max(2, ratio * 100))}%`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: '#dc2626',
                    border: '3px solid #ffffff',
                    boxShadow: '0 0 0 4px rgba(220,38,38,0.35)'
                  }}
                />
              </div>

              <div
                className="flex items-center justify-between text-xs text-muted"
                style={{ marginTop: '8px', fontFamily: 'var(--font-mono)' }}
              >
                <span>← {computedDistFromN01} m →</span>
                <span>← {computedDistFromN02} m →</span>
              </div>
            </div>

            {/* Interactive Sliders to test GIS Triangulation */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <div className="flex justify-between text-xs" style={{ marginBottom: '4px' }}>
                  <span className="font-semibold">
                    Arrival Time Delay (Δt from GPS PPS):
                  </span>
                  <strong className="text-mono" style={{ color: 'var(--critical)' }}>
                    {deltaTMs} ms
                  </strong>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  step="0.05"
                  value={deltaTMs}
                  onChange={(e) => setDeltaTMs(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <label className="form-label" style={{ fontSize: '0.7rem' }}>
                    Segment Length L (m)
                  </label>
                  <input
                    type="number"
                    className="form-input"
                    style={{ width: '100%', padding: '6px 10px' }}
                    value={segmentLenM}
                    onChange={(e) => setSegmentLenM(Number(e.target.value) || 100)}
                  />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: '0.7rem' }}>
                    Wave Speed v (m/s)
                  </label>
                  <input
                    type="number"
                    className="form-input"
                    style={{ width: '100%', padding: '6px 10px' }}
                    value={soundVelMps}
                    onChange={(e) => setSoundVelMps(Number(e.target.value) || 1480)}
                  />
                </div>
              </div>

              <div
                className="text-mono"
                style={{
                  background: 'var(--bg)',
                  padding: '10px',
                  borderRadius: '8px',
                  fontSize: '0.73rem',
                  border: '1px solid var(--border)'
                }}
              >
                <div>Formula: D = [L - (v × Δt)] / 2</div>
                <div>
                  D = [{segmentLenM} - ({soundVelMps} × {deltaTSec.toFixed(5)})] / 2
                </div>
                <div style={{ color: 'var(--critical)', fontWeight: 800, marginTop: '3px' }}>
                  Exact Leak Offset = {computedDistFromN01} m from N01
                </div>
                <div style={{ color: 'var(--primary)', fontWeight: 700 }}>
                  Projected GPS: {interpolatedLat}, {interpolatedLng}
                </div>
              </div>
            </div>
          </div>

          {/* Surgical Pipe Replacement Card */}
          <div className="card" style={{ borderLeft: '4px solid var(--success)' }}>
            <div className="flex items-center gap-xs" style={{ fontWeight: 800, fontSize: '0.86rem', color: 'var(--success)' }}>
              <Wrench size={16} />
              <span>Zero-Infrastructure-Damage Replacement Plan</span>
            </div>
            <p className="text-xs text-secondary" style={{ marginTop: '6px', lineHeight: 1.5 }}>
              Instead of excavating the entire {segmentLenM}m road between N01 and N02, field crews
              only open a <strong>1.2m × 0.8m surgical window</strong> at{' '}
              <strong>{computedDistFromN01}m from N01</strong> (Depth: 25 cm), saving{' '}
              <strong>98.8%</strong> of road surface and cost.
            </p>
          </div>
        </div>
      </div>

      {/* GIS PIPELINE SEGMENTS TABLE */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">Underground Pipeline Segments &amp; Pinpointed Leak Registry</div>
          <span className="badge badge-ai">1Hz GPS PPS ALIGNED</span>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Leak / Segment ID</th>
                <th>Node Pair</th>
                <th>Total Span (L)</th>
                <th>Time Delay (Δt)</th>
                <th>Exact Distance from Node A</th>
                <th>Projected GPS Coordinates</th>
                <th>Surgical Excavation Window</th>
                <th>Severity</th>
              </tr>
            </thead>
            <tbody>
              {leaks.map((lk) => (
                <tr key={lk.id}>
                  <td style={{ fontWeight: 800 }}>{lk.id}</td>
                  <td>
                    {lk.nodeA} ↔ {lk.nodeB}
                  </td>
                  <td>{lk.totalDistanceM} m</td>
                  <td className="text-mono">{(lk.timeDelaySec * 1000).toFixed(2)} ms</td>
                  <td style={{ fontWeight: 800, color: 'var(--critical)' }}>
                    {lk.distanceFromNodeAM} m from {lk.nodeA}
                  </td>
                  <td className="text-mono">
                    {lk.latitude.toFixed(6)}, {lk.longitude.toFixed(6)}
                  </td>
                  <td>{lk.excavationWindow}</td>
                  <td>
                    <span className={`badge badge-${lk.severity}`}>{lk.severity}</span>
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

