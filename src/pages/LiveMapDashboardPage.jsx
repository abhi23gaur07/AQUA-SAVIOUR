import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Circle,
  Polygon,
  useMap
} from 'react-leaflet';
import L from 'leaflet';
import {
  AlertTriangle,
  Layers,
  Crosshair,
  Wifi,
  BatteryCharging,
  Sparkles,
  ChevronRight,
  Droplets,
  Globe
} from 'lucide-react';
import AppShell from '../components/AppShell';
import { useAqua } from '../context/AquaContext';
import { AQUA_CONFIG, SAFE_VALVE_RELAYS } from '../data/aquaData';

function MapFocusController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom || 17, { duration: 0.75 });
    }
  }, [center, zoom, map]);
  return null;
}

const LEVEL_COLORS = {
  L0: '#16a34a',
  L1: '#eab308',
  L2: '#f97316',
  L3: '#dc2626'
};

// Rectangular rounded node badge marker matching Screenshot 3 (N01 L0, N02 L3, N03 L0)
function createNodeBadgeIcon(node, isSelected) {
  const bg = LEVEL_COLORS[node.riskLevel] || '#16a34a';
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;transform:${
        isSelected ? 'scale(1.1)' : 'scale(1)'
      };transition:transform 0.2s;">
        <div style="
          background:${bg};
          color:#ffffff;
          border:2px solid #ffffff;
          border-radius:8px;
          padding:4px 12px;
          box-shadow:0 4px 14px rgba(0,0,0,0.45);
          text-align:center;
          min-width:58px;
          font-family:Inter,sans-serif;
        ">
          <div style="font-size:13px;font-weight:900;line-height:1.1;letter-spacing:0.02em;">${node.id}</div>
          <div style="font-size:10px;font-weight:800;opacity:0.95;">${node.riskLevel}</div>
        </div>
        <div style="
          width:0;height:0;
          border-left:6px solid transparent;
          border-right:6px solid transparent;
          border-top:7px solid ${bg};
          margin-top:-1px;
        "></div>
        <div style="
          width:18px;height:18px;border-radius:50%;
          background:${bg}55;border:1.5px solid ${bg};
          margin-top:1px;
        "></div>
      </div>
    `,
    iconSize: [68, 64],
    iconAnchor: [34, 48],
    popupAnchor: [0, -44]
  });
}

// Green Shield Valve / Relay icon matching R-01 & R-02 in Screenshot 3
function createRelayShieldIcon(relay) {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;font-family:Inter,sans-serif;">
        <div style="
          width:32px;height:32px;border-radius:50%;
          background:#10b981;border:2.5px solid #ffffff;
          display:flex;align-items:center;justify-content:center;
          box-shadow:0 4px 12px rgba(0,0,0,0.45);
          color:#ffffff;font-size:14px;font-weight:900;
        ">🛡️</div>
        <div style="
          margin-top:3px;
          background:#0f172a;color:#ffffff;
          font-size:10px;font-weight:800;
          padding:2px 7px;border-radius:5px;
          border:1px solid rgba(255,255,255,0.25);
          letter-spacing:0.04em;
        ">${relay.id}</div>
      </div>
    `,
    iconSize: [48, 54],
    iconAnchor: [24, 27]
  });
}

export default function LiveMapDashboardPage() {
  const navigate = useNavigate();
  const { nodes, leaks, alerts } = useAqua();

  const [selectedNodeId, setSelectedNodeId] = useState('N02');
  const [focusCoord, setFocusCoord] = useState([
    AQUA_CONFIG.site.latitude,
    AQUA_CONFIG.site.longitude
  ]);
  const [focusZoom, setFocusZoom] = useState(17);
  const [showLayerMenu, setShowLayerMenu] = useState(false);
  const [layers, setLayers] = useState({
    satellite: true,
    dualHeatmaps: true,
    boundaryBox: true,
    relayLinks: true,
    pipelineLine: true
  });

  const activeAlertsCount = alerts.filter((a) => a.status === 'Active').length;
  const criticalNode = nodes.find((n) => n.riskLevel === 'L3') || nodes[1];
  const primaryLeak = leaks[0];

  const handleSelectNode = (node) => {
    setSelectedNodeId(node.id);
    setFocusCoord([node.latitude, node.longitude]);
    setFocusZoom(18);
  };

  // Dashed blue perimeter rectangle matching Screenshot 3
  const sectorBoundaryCoords = [
    [28.6152, 77.2068],
    [28.6152, 77.2108],
    [28.6121, 77.2108],
    [28.6121, 77.2068]
  ];

  // Underground Blue PVC Pipeline path
  const pipelinePath = nodes.map((n) => [n.latitude, n.longitude]);

  return (
    <AppShell>
      {/* RED CRITICAL ALERT BANNER (Exact match to Screenshot 4) */}
      <div
        className="animate-fade-in"
        style={{
          background: '#e11d48',
          backgroundImage: 'linear-gradient(90deg, #dc2626 0%, #e11d48 100%)',
          color: '#ffffff',
          padding: '12px 20px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          boxShadow: '0 4px 14px rgba(220, 38, 38, 0.28)'
        }}
      >
        <div className="flex items-center gap-sm">
          <AlertTriangle size={20} />
          <span style={{ fontWeight: 800, fontSize: '0.92rem' }}>
            CRITICAL PIPE LEAKAGE ALERT: Node {criticalNode.id} has reached L3 severity (All 5
            monitored indicators abnormal — Exact Leak @ {primaryLeak.distanceFromNodeAM}m from N01).
          </span>
        </div>

        <button
          type="button"
          onClick={() => navigate('/alerts')}
          style={{
            background: '#ffffff',
            color: '#dc2626',
            fontWeight: 800,
            fontSize: '0.78rem',
            padding: '7px 14px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
          }}
        >
          Review Emergency Protocol
        </button>
      </div>

      {/* 7 KPI METRIC CARDS ROW (Exact visual match to Screenshot 4) */}
      <div className="kpi-grid-7">
        {/* 1. OVERALL RISK */}
        <div
          className="card"
          style={{ padding: '14px 16px', borderLeft: '4px solid #dc2626' }}
        >
          <div className="metric-label">OVERALL RISK</div>
          <div style={{ marginTop: '8px', marginBottom: '6px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(220, 38, 38, 0.12)',
                color: '#dc2626',
                fontWeight: 800,
                fontSize: '0.82rem',
                padding: '4px 10px',
                borderRadius: '6px'
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#dc2626'
                }}
              />
              CRITICAL
            </span>
          </div>
          <div className="text-xs text-muted">Site aggregate status</div>
        </div>

        {/* 2. ACTIVE ALERTS */}
        <div
          className="card"
          onClick={() => navigate('/alerts')}
          style={{
            padding: '14px 16px',
            borderLeft: '4px solid #16a34a',
            cursor: 'pointer'
          }}
        >
          <div className="metric-label">ACTIVE ALERTS</div>
          <div
            className="metric-value"
            style={{ color: '#16a34a', marginTop: '4px', fontSize: '1.6rem' }}
          >
            {activeAlertsCount}
          </div>
          <div className="text-xs text-muted" style={{ marginTop: '4px' }}>
            Click to manage protocol
          </div>
        </div>

        {/* 3. SENSOR NODES */}
        <div
          className="card"
          onClick={() => navigate('/nodes')}
          style={{
            padding: '14px 16px',
            borderLeft: '4px solid #0284c7',
            cursor: 'pointer'
          }}
        >
          <div className="metric-label">SENSOR NODES</div>
          <div style={{ marginTop: '4px' }}>
            <span
              className="metric-value"
              style={{ color: '#0284c7', fontSize: '1.6rem' }}
            >
              {nodes.length} / {nodes.length}
            </span>{' '}
            <span className="text-xs text-muted">online</span>
          </div>
          <div className="text-xs text-muted" style={{ marginTop: '4px' }}>
            Wi-Fi &amp; GPS PPS Active (100%)
          </div>
        </div>

        {/* 4. HIGHEST RISK NODE */}
        <div
          className="card"
          onClick={() => navigate(`/detail/${criticalNode.id}`)}
          style={{
            padding: '14px 16px',
            borderLeft: '4px solid #dc2626',
            cursor: 'pointer'
          }}
        >
          <div className="metric-label">HIGHEST RISK NODE</div>
          <div
            style={{
              fontSize: '1.35rem',
              fontWeight: 900,
              color: '#dc2626',
              marginTop: '5px'
            }}
          >
            Node {criticalNode.id}
          </div>
          <div className="text-xs text-muted" style={{ marginTop: '4px' }}>
            Level: {criticalNode.riskLevel} (Click for Detail)
          </div>
        </div>

        {/* 5. AI RISK SCORE */}
        <div
          className="card"
          onClick={() => navigate('/analytics')}
          style={{
            padding: '14px 16px',
            borderLeft: '4px solid #7c3aed',
            cursor: 'pointer'
          }}
        >
          <div className="metric-label">AI RISK SCORE</div>
          <div
            className="metric-value"
            style={{ color: '#7c3aed', marginTop: '4px', fontSize: '1.6rem' }}
          >
            {criticalNode.riskScore}%
          </div>
          <div className="text-xs text-muted" style={{ marginTop: '4px' }}>
            Leakage probability
          </div>
        </div>

        {/* 6. PINPOINTED LEAKAGE / DEFORMATION */}
        <div
          className="card"
          onClick={() => navigate('/gis-realtime')}
          style={{
            padding: '14px 16px',
            borderLeft: '4px solid #7c3aed',
            cursor: 'pointer'
          }}
        >
          <div className="metric-label">PINPOINTED LEAK</div>
          <div style={{ marginTop: '4px' }}>
            <span
              className="metric-value"
              style={{ color: '#7c3aed', fontSize: '1.55rem' }}
            >
              32.5
            </span>{' '}
            <span className="text-xs text-muted">m from N01</span>
          </div>
          <div className="text-xs text-muted" style={{ marginTop: '4px' }}>
            Δt: +23.65 ms (Horizon: 6h)
          </div>
        </div>

        {/* 7. AI CONFIDENCE */}
        <div
          className="card"
          style={{ padding: '14px 16px', borderLeft: '4px solid #0891b2' }}
        >
          <div className="metric-label">AI CONFIDENCE</div>
          <div
            className="metric-value"
            style={{ color: '#0891b2', marginTop: '4px', fontSize: '1.6rem' }}
          >
            {criticalNode.aiConfidence}%
          </div>
          <div className="text-xs text-muted" style={{ marginTop: '4px' }}>
            Model confidence
          </div>
        </div>
      </div>

      {/* MAIN SURVEILLANCE SPLIT: SATELLITE MAP (LEFT) + SURFACE SENSOR NODES (RIGHT) */}
      <div className="split-map-sidebar">
        {/* LEFT: GEOGRAPHICAL SURFACE SURVEILLANCE MAP */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: 0 }}>
          <div
            className="flex items-center justify-between flex-wrap gap-sm"
            style={{ padding: '2px 0' }}
          >
            <div className="flex items-center gap-sm flex-wrap">
              <h2 style={{ fontSize: '1.02rem', fontWeight: 800 }}>
                Geographical Surface Surveillance
              </h2>
              <span
                style={{
                  background: 'rgba(124, 58, 237, 0.12)',
                  color: '#7c3aed',
                  fontSize: '0.66rem',
                  fontWeight: 800,
                  padding: '3px 9px',
                  borderRadius: '6px',
                  letterSpacing: '0.04em'
                }}
              >
                DUAL INTELLIGENCE HEATMAPS ACTIVE
              </span>
            </div>

            <div className="flex items-center gap-xs flex-wrap">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => navigate('/hydro-moisture')}
                style={{ color: '#0284c7', borderColor: 'rgba(2,132,199,0.35)' }}
              >
                <Droplets size={14} />
                <span>Hydro Moisture Map</span>
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => navigate('/gis-realtime')}
              >
                <Globe size={14} />
                <span>GIS Details</span>
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setFocusCoord([
                    AQUA_CONFIG.site.latitude,
                    AQUA_CONFIG.site.longitude
                  ]);
                  setFocusZoom(17);
                }}
              >
                <Crosshair size={14} />
                <span>Recenter Grid</span>
              </button>
            </div>
          </div>

          <div style={{ flex: 1, minHeight: '420px' }}>
            <div className="mine-map-wrapper">
              {/* Top-Right Floating "Map Layers" Button (Exact match to Screenshot 4) */}
              <div className="map-layer-control">
                <button
                  type="button"
                  className="map-layer-toggle-btn"
                  onClick={() => setShowLayerMenu(!showLayerMenu)}
                >
                  <Layers size={15} />
                  <span>Map Layers</span>
                </button>

                {showLayerMenu && (
                  <div className="map-layer-panel animate-fade-in">
                    <label className="form-checkbox">
                      <input
                        type="checkbox"
                        checked={layers.satellite}
                        onChange={(e) =>
                          setLayers({ ...layers, satellite: e.target.checked })
                        }
                      />
                      <span>Satellite Imagery</span>
                    </label>
                    <label className="form-checkbox">
                      <input
                        type="checkbox"
                        checked={layers.dualHeatmaps}
                        onChange={(e) =>
                          setLayers({ ...layers, dualHeatmaps: e.target.checked })
                        }
                      />
                      <span>Dual Intelligence Heatmaps</span>
                    </label>
                    <label className="form-checkbox">
                      <input
                        type="checkbox"
                        checked={layers.boundaryBox}
                        onChange={(e) =>
                          setLayers({ ...layers, boundaryBox: e.target.checked })
                        }
                      />
                      <span>Sector Dashed Boundary</span>
                    </label>
                    <label className="form-checkbox">
                      <input
                        type="checkbox"
                        checked={layers.relayLinks}
                        onChange={(e) =>
                          setLayers({ ...layers, relayLinks: e.target.checked })
                        }
                      />
                      <span>Valve Relays (R-01 / R-02)</span>
                    </label>
                    <label className="form-checkbox">
                      <input
                        type="checkbox"
                        checked={layers.pipelineLine}
                        onChange={(e) =>
                          setLayers({ ...layers, pipelineLine: e.target.checked })
                        }
                      />
                      <span>Underground PVC Pipeline</span>
                    </label>
                  </div>
                )}
              </div>

              <MapContainer
                center={[AQUA_CONFIG.site.latitude, AQUA_CONFIG.site.longitude]}
                zoom={17}
                scrollWheelZoom={true}
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: '500px',
                  background: '#0f172a'
                }}
              >
                <MapFocusController center={focusCoord} zoom={focusZoom} />

                {layers.satellite ? (
                  <TileLayer
                    attribution="Tiles &copy; Esri"
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    maxZoom={19}
                  />
                ) : (
                  <TileLayer
                    attribution="&copy; OpenStreetMap"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maxZoom={19}
                  />
                )}

                {/* Dashed Blue Monitoring Perimeter Box (matching Screenshot 3) */}
                {layers.boundaryBox && (
                  <Polygon
                    positions={sectorBoundaryCoords}
                    pathOptions={{
                      color: '#0ea5e9',
                      weight: 2.5,
                      dashArray: '8, 8',
                      fillColor: '#0ea5e9',
                      fillOpacity: 0.03
                    }}
                  />
                )}

                {/* Underground Blue PVC Pipeline Network */}
                {layers.pipelineLine && (
                  <Polyline
                    positions={pipelinePath}
                    pathOptions={{
                      color: '#38bdf8',
                      weight: 4,
                      opacity: 0.85
                    }}
                  />
                )}

                {/* Green Dashed Relay / Safe Valve Routes & Shield Icons R-01, R-02 (matching Screenshot 3) */}
                {layers.relayLinks &&
                  SAFE_VALVE_RELAYS.map((relay) => {
                    const n03 = nodes.find((n) => n.id === 'N03') || nodes[2];
                    return (
                      <React.Fragment key={relay.id}>
                        <Polyline
                          positions={[
                            [n03.latitude, n03.longitude],
                            [relay.latitude, relay.longitude]
                          ]}
                          pathOptions={{
                            color: '#10b981',
                            weight: 3.5,
                            dashArray: '8, 8',
                            opacity: 0.95
                          }}
                        />
                        <Marker
                          position={[relay.latitude, relay.longitude]}
                          icon={createRelayShieldIcon(relay)}
                        >
                          <Popup>
                            <div style={{ padding: '10px' }}>
                              <strong style={{ fontSize: '0.85rem' }}>{relay.name}</strong>
                              <div style={{ fontSize: '0.75rem', color: '#16a34a', marginTop: '4px' }}>
                                Status: {relay.status} • Connected to {relay.connectedNode}
                              </div>
                            </div>
                          </Popup>
                        </Marker>
                      </React.Fragment>
                    );
                  })}

                {/* Dual Intelligence Concentric Purple & Red Heatmaps around Critical Node N02 (matching Screenshot 3) */}
                {layers.dualHeatmaps && (
                  <>
                    <Circle
                      center={[criticalNode.latitude, criticalNode.longitude]}
                      radius={78}
                      pathOptions={{
                        color: '#7c3aed',
                        weight: 2,
                        dashArray: '6, 6',
                        fillColor: '#9333ea',
                        fillOpacity: 0.35
                      }}
                    />
                    <Circle
                      center={[criticalNode.latitude, criticalNode.longitude]}
                      radius={34}
                      pathOptions={{
                        color: '#ef4444',
                        weight: 2,
                        fillColor: '#a855f7',
                        fillOpacity: 0.65
                      }}
                    />
                  </>
                )}

                {/* Rectangular Node Badge Markers (N01 L0, N02 L3, N03 L0, N04 L1) */}
                {nodes.map((node) => (
                  <Marker
                    key={node.id}
                    position={[node.latitude, node.longitude]}
                    icon={createNodeBadgeIcon(node, node.id === selectedNodeId)}
                    eventHandlers={{
                      click: () => handleSelectNode(node)
                    }}
                  >
                    <Popup>
                      <div style={{ padding: '12px', fontFamily: 'var(--font-sans)' }}>
                        <div
                          className="flex items-center justify-between"
                          style={{
                            borderBottom: '1px solid #e2e8f0',
                            paddingBottom: '6px',
                            marginBottom: '8px'
                          }}
                        >
                          <strong>{node.name}</strong>
                          <span className={`badge badge-${node.riskLevel}`}>
                            {node.riskLevel}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.76rem', marginBottom: '8px' }}>
                          <div>
                            <strong>AI Risk:</strong> {node.riskScore}% ({node.aiConfidence}% conf)
                          </div>
                          <div>
                            <strong>Between-Node Leak:</strong>{' '}
                            {node.leakDistanceFromSelfM
                              ? `${node.leakDistanceFromSelfM}m from N01`
                              : 'Nominal'}
                          </div>
                          <div>
                            <strong>Acoustic / Pressure:</strong> {node.readings.acousticDb} dB /{' '}
                            {node.readings.pressureBar} bar
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          style={{ width: '100%', justifyContent: 'center' }}
                          onClick={() => navigate(`/detail/${node.id}`)}
                        >
                          Open {node.id} Full Detail Portal →
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>

        {/* RIGHT: SURFACE SENSOR NODES LIST (Exact match to Screenshot 4 with clickable "Detail >") */}
        <div
          className="card"
          style={{
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <div className="flex items-center justify-between">
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              SURFACE SENSOR NODES ({nodes.length})
            </span>
            <span className="text-xs text-muted">Select to focus</span>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              overflowY: 'auto'
            }}
          >
            {nodes.map((node) => {
              const isSelected = node.id === selectedNodeId;
              const isCritical = node.riskLevel === 'L3';
              const isWatch = node.riskLevel === 'L1' || node.riskLevel === 'L2';

              const indicators = [
                { label: 'Acst', bad: node.sensorStatus.acoustic },
                { label: 'Prs', bad: node.sensorStatus.pressure },
                { label: 'Vib', bad: node.sensorStatus.flow },
                { label: 'Crk', bad: node.sensorStatus.crack },
                { label: 'Mst', bad: node.sensorStatus.moisture }
              ];

              return (
                <div
                  key={node.id}
                  onClick={() => handleSelectNode(node)}
                  style={{
                    padding: '14px',
                    borderRadius: '10px',
                    border: isCritical
                      ? '1.5px solid rgba(220, 38, 38, 0.55)'
                      : isSelected
                      ? '1.5px solid var(--primary)'
                      : '1px solid var(--border)',
                    background: isCritical
                      ? 'rgba(220, 38, 38, 0.03)'
                      : 'var(--card)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {/* Top Row: ID + Name + Status Pill */}
                  <div
                    className="flex items-center justify-between"
                    style={{ marginBottom: '8px' }}
                  >
                    <div className="flex items-center gap-xs">
                      <span
                        style={{
                          fontSize: '0.95rem',
                          fontWeight: 900,
                          color: 'var(--text-primary)'
                        }}
                      >
                        {node.id}
                      </span>
                      <span className="text-xs text-muted">Node {node.id}</span>
                    </div>

                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: '999px',
                        background: isCritical
                          ? 'rgba(220, 38, 38, 0.14)'
                          : isWatch
                          ? 'rgba(234, 179, 8, 0.15)'
                          : 'rgba(22, 163, 74, 0.14)',
                        color: isCritical
                          ? '#dc2626'
                          : isWatch
                          ? '#ca8a04'
                          : '#16a34a'
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: 'currentColor'
                        }}
                      />
                      {isCritical ? 'CRITICAL' : isWatch ? 'WATCH' : 'NORMAL'}
                    </span>
                  </div>

                  {/* AI Risk & Prediction Strip */}
                  <div
                    className="flex items-center justify-between"
                    style={{
                      background: 'var(--bg)',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      fontSize: '0.74rem',
                      marginBottom: '10px'
                    }}
                  >
                    <span
                      className="flex items-center gap-xs"
                      style={{ fontWeight: 700, color: '#7c3aed' }}
                    >
                      <Sparkles size={12} />
                      <span>AI Risk: {node.riskScore}%</span>
                    </span>
                    <span className="text-muted" style={{ fontWeight: 600 }}>
                      {node.leakDistanceFromSelfM
                        ? `Leak: ${node.leakDistanceFromSelfM} m`
                        : `Pred: +${node.predictedCrackGrowthMm} mm`}
                    </span>
                  </div>

                  {/* 5 Indicator Pills Row (matching Screenshot 4) */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(5, 1fr)',
                      gap: '5px',
                      marginBottom: '10px'
                    }}
                  >
                    {indicators.map((ind) => (
                      <div
                        key={ind.label}
                        style={{
                          textAlign: 'center',
                          padding: '3px 0',
                          borderRadius: '4px',
                          fontSize: '0.66rem',
                          fontWeight: 700,
                          background: ind.bad
                            ? 'rgba(220, 38, 38, 0.14)'
                            : 'rgba(22, 163, 74, 0.12)',
                          color: ind.bad ? '#dc2626' : '#16a34a'
                        }}
                      >
                        {ind.label}
                      </div>
                    ))}
                  </div>

                  {/* Footer: Wi-Fi + Battery + Clickable "Detail >" Link */}
                  <div
                    className="flex items-center justify-between"
                    style={{
                      paddingTop: '8px',
                      borderTop: '1px solid var(--border)',
                      fontSize: '0.73rem'
                    }}
                  >
                    <div className="flex items-center gap-sm text-muted">
                      <span className="flex items-center gap-xs">
                        <Wifi size={12} /> {node.wifiSignal} dBm
                      </span>
                      <span className="flex items-center gap-xs">
                        <BatteryCharging size={12} /> {node.battery}%
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/detail/${node.id}`);
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '2px',
                        color: 'var(--primary)',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <span>Detail</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
