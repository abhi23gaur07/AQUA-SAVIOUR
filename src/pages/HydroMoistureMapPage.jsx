import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapContainer,
  TileLayer,
  Polygon,
  Circle,
  Marker,
  Popup,
  Polyline
} from 'react-leaflet';
import L from 'leaflet';
import {
  Droplets,
  Layers,
  Globe,
  RefreshCw,
  ArrowRight,
  Key,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';
import AppShell from '../components/AppShell';
import { useAqua } from '../context/AquaContext';
import { AQUA_CONFIG } from '../data/aquaData';
import {
  OPEN_SOURCE_MOISTURE_PROVIDERS,
  fetchLiveHydroMoistureData
} from '../services/moistureApi';

function createHydroNodePin(node) {
  const isHighMoisture = node.readings.soilMoisturePct > 50;
  const color = isHighMoisture ? '#ef4444' : '#0ea5e9';
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background:#0f172a;
        color:#ffffff;
        border:2px solid ${color};
        border-radius:8px;
        padding:3px 8px;
        font-size:11px;
        font-weight:800;
        box-shadow:0 4px 12px rgba(0,0,0,0.5);
        white-space:nowrap;
        font-family:Inter,sans-serif;
      ">
        ${node.id}: ${node.readings.soilMoisturePct}% • ${node.porePressureKpa} kPa
      </div>
    `,
    iconSize: [120, 28],
    iconAnchor: [60, 14]
  });
}

export default function HydroMoistureMapPage() {
  const navigate = useNavigate();
  const { nodes, leaks } = useAqua();

  // Exact 3 checkboxes shown in Screenshot 1
  const [moistureHeatmap, setMoistureHeatmap] = useState(true);
  const [porePressureZones, setPorePressureZones] = useState(true);
  const [hydroStratification, setHydroStratification] = useState(true);
  const [showNodePins, setShowNodePins] = useState(true);

  // Open-Source API Provider & API Key state
  const [selectedProviderId, setSelectedProviderId] = useState('open-meteo');
  const [apiKeyInput, setApiKeyInput] = useState(
    OPEN_SOURCE_MOISTURE_PROVIDERS[0].apiKey
  );
  const [copiedKey, setCopiedKey] = useState(false);
  const [showApiPanel, setShowApiPanel] = useState(true);

  const [apiState, setApiState] = useState({
    loading: true,
    live: true,
    providerName: OPEN_SOURCE_MOISTURE_PROVIDERS[0].name,
    activeApiKey: OPEN_SOURCE_MOISTURE_PROVIDERS[0].apiKey,
    endpointUrl: OPEN_SOURCE_MOISTURE_PROVIDERS[0].endpoint,
    latencyMs: 10,
    fetchedAt: 'Just now',
    elevationM: 214,
    currentWeather: {
      temperatureC: 27.7,
      humidityPct: 68,
      surfacePressureHpa: 988.5,
      precipitationMm: 0.0
    },
    stratification: {
      sm0_1cm: 0.33,
      sm1_3cm: 0.332,
      sm3_9cm: 0.336,
      sm9_27cm: 0.345,
      sm27_81cm: 0.376,
      st0cm: 27.9,
      st6cm: 28.4,
      st18cm: 29.8,
      st54cm: 29.4
    }
  });

  const handleSyncMoistureApi = async (
    provId = selectedProviderId,
    customKey = apiKeyInput
  ) => {
    setApiState((prev) => ({ ...prev, loading: true }));
    const res = await fetchLiveHydroMoistureData({
      latitude: AQUA_CONFIG.site.latitude,
      longitude: AQUA_CONFIG.site.longitude,
      providerId: provId,
      customApiKey: customKey
    });
    setApiState({ ...res, loading: false });
  };

  useEffect(() => {
    handleSyncMoistureApi('open-meteo', OPEN_SOURCE_MOISTURE_PROVIDERS[0].apiKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectProvider = (e) => {
    const newId = e.target.value;
    setSelectedProviderId(newId);
    const found =
      OPEN_SOURCE_MOISTURE_PROVIDERS.find((p) => p.id === newId) ||
      OPEN_SOURCE_MOISTURE_PROVIDERS[0];
    setApiKeyInput(found.apiKey);
    handleSyncMoistureApi(newId, found.apiKey);
  };

  const handleCopyKey = () => {
    navigator.clipboard?.writeText(apiKeyInput);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 1800);
  };

  // Outer dashed blue hydro-geological monitor polygon (matching Screenshot 1)
  const outerHydroBoundary = [
    [28.6151, 77.2073],
    [28.6157, 77.2101],
    [28.6122, 77.2114],
    [28.6119, 77.2064]
  ];

  // Inner tilted solid-border blue polygon for Hydro Stratification (0-100cm) (matching Screenshot 1)
  const innerStratificationPolygon = [
    [28.6143, 77.2082],
    [28.615, 77.2098],
    [28.6126, 77.2107],
    [28.6121, 77.2089]
  ];

  // Blue circle (Moisture Heatmap plume) & Red circle (Pore-Pressure Risk Zone) matching Screenshot 1
  const moisturePlumeCenter = [28.61445, 77.20815];
  const porePressureRiskCenter = [28.6137, 77.20855];

  const primaryLeak = leaks[0];
  const s = apiState.stratification;

  return (
    <AppShell>
      {/* Top Portal Header */}
      <div
        className="flex items-center justify-between flex-wrap gap-md"
        style={{ marginBottom: '2px' }}
      >
        <div>
          <div className="flex items-center gap-sm">
            <span
              style={{
                background: 'rgba(2, 132, 199, 0.14)',
                color: '#0284c7',
                fontSize: '0.68rem',
                fontWeight: 800,
                padding: '3px 9px',
                borderRadius: '999px',
                letterSpacing: '0.04em'
              }}
            >
              GIS ENGINEER / ANALYST DEDICATED PORTAL
            </span>
            <span
              className="badge badge-L0"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <CheckCircle2 size={11} />
              <span>
                OPEN-SOURCE API CONNECTED ({apiState.latencyMs} ms • {apiState.fetchedAt})
              </span>
            </span>
          </div>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 900, marginTop: '4px' }}>
            Open-Meteo Hydro-Geological Moisture &amp; Pore-Pressure Monitor
          </h1>
        </div>

        <div className="flex items-center gap-xs flex-wrap">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setShowApiPanel(!showApiPanel)}
          >
            <Key size={14} color="var(--primary)" />
            <span>{showApiPanel ? 'Hide API Key Config' : 'Open-Source API Keys'}</span>
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => handleSyncMoistureApi(selectedProviderId, apiKeyInput)}
          >
            <RefreshCw size={14} />
            <span>{apiState.loading ? 'Fetching Live API...' : 'Refresh Moisture API'}</span>
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => navigate('/gis-realtime')}
          >
            <Globe size={14} />
            <span>GIS Realtime</span>
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => navigate('/dashboard')}
          >
            <span>Node Live Map</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* OPEN-SOURCE MOISTURE API KEY & PROVIDER CONFIGURATION CARD */}
      {showApiPanel && (
        <div
          className="card animate-fade-in"
          style={{
            padding: '14px 18px',
            borderLeft: '4px solid #0284c7',
            background: 'var(--card)'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '12px',
              alignItems: 'end'
            }}
          >
            <div>
              <label className="form-label" style={{ fontSize: '0.72rem' }}>
                Open-Source Soil Moisture API Provider
              </label>
              <select
                className="form-select"
                style={{ width: '100%', fontWeight: 700 }}
                value={selectedProviderId}
                onChange={handleSelectProvider}
              >
                {OPEN_SOURCE_MOISTURE_PROVIDERS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label" style={{ fontSize: '0.72rem' }}>
                Active Open-Source API Key (Pre-Configured in .env)
              </label>
              <div className="flex items-center gap-xs">
                <input
                  type="text"
                  className="form-input text-mono"
                  style={{ width: '100%', fontSize: '0.78rem', fontWeight: 700 }}
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={handleCopyKey}
                  title="Copy Open-Source API Key"
                  style={{ flexShrink: 0, padding: '8px 10px' }}
                >
                  {copiedKey ? <Check size={14} color="var(--success)" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            <div style={{ minWidth: 0 }}>
              <label className="form-label" style={{ fontSize: '0.72rem' }}>
                Live Multi-Depth Soil Moisture Endpoint
              </label>
              <div
                className="text-mono truncate"
                style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  padding: '8px 10px',
                  fontSize: '0.72rem',
                  color: 'var(--primary)'
                }}
                title={apiState.endpointUrl}
              >
                {apiState.endpointUrl}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN DARK HYDRO-GEOLOGICAL MOISTURE MONITOR MAP (Exact match to Screenshot 1) */}
      <div className="hydro-map-container">
        {/* TOP-LEFT FLOATING PILL: "Open-Meteo Hydro-Geological Moisture Monitor" */}
        <div className="hydro-map-title-pill">
          <Droplets size={16} color="#0ea5e9" style={{ flexShrink: 0 }} />
          <span className="truncate">Open-Meteo Hydro-Geological Moisture Monitor</span>
        </div>

        {/* TOP-RIGHT / MOBILE-BOTTOM FLOATING CHECKBOX CARD */}
        <div className="hydro-map-controls-card">
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '9px',
              cursor: 'pointer',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: '#475569'
            }}
          >
            <input
              type="checkbox"
              checked={moistureHeatmap}
              onChange={(e) => setMoistureHeatmap(e.target.checked)}
              style={{
                width: '16px',
                height: '16px',
                accentColor: '#0284c7',
                cursor: 'pointer'
              }}
            />
            <span>Moisture Heatmap</span>
          </label>

          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '9px',
              cursor: 'pointer',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: '#475569'
            }}
          >
            <input
              type="checkbox"
              checked={porePressureZones}
              onChange={(e) => setPorePressureZones(e.target.checked)}
              style={{
                width: '16px',
                height: '16px',
                accentColor: '#ef4444',
                cursor: 'pointer'
              }}
            />
            <span>Pore-Pressure Risk Zones</span>
          </label>

          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '9px',
              cursor: 'pointer',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: '#475569'
            }}
          >
            <input
              type="checkbox"
              checked={hydroStratification}
              onChange={(e) => setHydroStratification(e.target.checked)}
              style={{
                width: '16px',
                height: '16px',
                accentColor: '#0284c7',
                cursor: 'pointer'
              }}
            />
            <span>Hydro Stratification (0-100cm)</span>
          </label>

          <div
            style={{
              borderTop: '1px solid #e2e8f0',
              paddingTop: '6px',
              marginTop: '2px'
            }}
          >
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '9px',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#64748b'
              }}
            >
              <input
                type="checkbox"
                checked={showNodePins}
                onChange={(e) => setShowNodePins(e.target.checked)}
                style={{
                  width: '14px',
                  height: '14px',
                  accentColor: '#0f172a',
                  cursor: 'pointer'
                }}
              />
              <span>Show Node Soil Probes (N01–N04)</span>
            </label>
          </div>
        </div>

        {/* LEAFLET DARK MATTER HYDRO-GEOLOGICAL MAP */}
        <MapContainer
          center={[28.6138, 77.2088]}
          zoom={16}
          zoomControl={false}
          scrollWheelZoom={true}
          style={{ width: '100%', height: '100%', background: '#18181b' }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap &copy; CARTO"
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            maxZoom={19}
          />

          {/* 1. Outer Dashed Blue Hydro-Geological Perimeter (matching Screenshot 1) */}
          {moistureHeatmap && (
            <Polygon
              positions={outerHydroBoundary}
              pathOptions={{
                color: '#0284c7',
                weight: 2.5,
                dashArray: '8, 8',
                fillColor: '#0284c7',
                fillOpacity: 0.16
              }}
            />
          )}

          {/* 2. Inner Tilted Solid-Border Blue Polygon: Hydro Stratification (0-100cm) (matching Screenshot 1) */}
          {hydroStratification && (
            <Polygon
              positions={innerStratificationPolygon}
              pathOptions={{
                color: '#38bdf8',
                weight: 3,
                fillColor: '#0ea5e9',
                fillOpacity: 0.32
              }}
            />
          )}

          {/* 3. Blue Circle: Sub-Surface Moisture Plume (matching Screenshot 1) */}
          {moistureHeatmap && (
            <Circle
              center={moisturePlumeCenter}
              radius={36}
              pathOptions={{
                color: '#0ea5e9',
                weight: 2.5,
                fillColor: '#0ea5e9',
                fillOpacity: 0.65
              }}
            >
              <Popup>
                <div style={{ padding: '10px' }}>
                  <strong>Sub-Surface Moisture Plume (N01 Upstream)</strong>
                  <div style={{ fontSize: '0.75rem', marginTop: '4px' }}>
                    Open-Meteo 9–27cm Baseline: <strong>{(s.sm9_27cm * 100).toFixed(1)}%</strong>
                  </div>
                </div>
              </Popup>
            </Circle>
          )}

          {/* 4. Red Circle: Pore-Pressure Risk Zone around Pipe Rupture (matching Screenshot 1) */}
          {porePressureZones && (
            <Circle
              center={porePressureRiskCenter}
              radius={46}
              pathOptions={{
                color: '#ef4444',
                weight: 3,
                fillColor: '#ef4444',
                fillOpacity: 0.62
              }}
            >
              <Popup>
                <div style={{ padding: '10px' }}>
                  <strong style={{ color: '#dc2626' }}>
                    CRITICAL Pore-Pressure Risk Zone (Leak @ 32.5m)
                  </strong>
                  <div style={{ fontSize: '0.75rem', marginTop: '4px' }}>
                    Pore Pressure: <strong>64.8 kPa</strong> • Trench Moisture: <strong>78.5%</strong>
                  </div>
                </div>
              </Popup>
            </Circle>
          )}

          {/* Underground Pipeline Vector & Node Probes */}
          {showNodePins && (
            <>
              <Polyline
                positions={nodes.map((n) => [n.latitude, n.longitude])}
                pathOptions={{
                  color: '#38bdf8',
                  weight: 2.5,
                  dashArray: '5, 5',
                  opacity: 0.7
                }}
              />
              {nodes.map((node) => (
                <Marker
                  key={node.id}
                  position={[node.latitude, node.longitude]}
                  icon={createHydroNodePin(node)}
                >
                  <Popup>
                    <div style={{ padding: '10px' }}>
                      <strong>{node.name}</strong>
                      <div style={{ fontSize: '0.76rem', marginTop: '4px' }}>
                        <div>
                          Soil Moisture: <strong>{node.readings.soilMoisturePct}%</strong>
                        </div>
                        <div>
                          Pore Pressure: <strong>{node.porePressureKpa} kPa</strong>
                        </div>
                        <div>Soil Strata: {node.soilType}</div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        style={{ width: '100%', marginTop: '8px', justifyContent: 'center' }}
                        onClick={() => navigate(`/detail/${node.id}`)}
                      >
                        View {node.id} Detail →
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </>
          )}
        </MapContainer>
      </div>

      {/* LIVE 5-LAYER OPEN-METEO SOIL MOISTURE STRATIFICATION CARDS (0-100cm) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(195px, 1fr))',
          gap: '12px'
        }}
      >
        <div className="card" style={{ borderLeft: '4px solid #38bdf8' }}>
          <div className="metric-label">0–1 cm &amp; 1–3 cm TOP SURFACE</div>
          <div className="metric-value" style={{ color: '#0284c7', marginTop: '4px' }}>
            {(s.sm0_1cm * 100).toFixed(1)}% VWC
          </div>
          <div className="text-xs text-muted" style={{ marginTop: '4px' }}>
            1–3cm: {(s.sm1_3cm * 100).toFixed(1)}% • Surface Temp: {s.st0cm}°C
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #0ea5e9' }}>
          <div className="metric-label">3–9 cm ROAD SUB-BASE STRATA</div>
          <div className="metric-value" style={{ color: '#0ea5e9', marginTop: '4px' }}>
            {(s.sm3_9cm * 100).toFixed(1)}% VWC
          </div>
          <div className="text-xs text-muted" style={{ marginTop: '4px' }}>
            6cm Soil Temp: {s.st6cm}°C • Surface Pressure:{' '}
            {apiState.currentWeather.surfacePressureHpa} hPa
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #ef4444' }}>
          <div className="metric-label">9–27 cm PIPE TRENCH (25cm DEPTH)</div>
          <div className="metric-value" style={{ color: '#ef4444', marginTop: '4px' }}>
            78.5% (Leak)
          </div>
          <div className="text-xs text-muted" style={{ marginTop: '4px' }}>
            Open-Meteo Baseline: {(s.sm9_27cm * 100).toFixed(1)}% (+44.0% Anomaly @ N02)
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #3b82f6' }}>
          <div className="metric-label">27–81 cm DEEP BEDDING STRATA</div>
          <div className="metric-value" style={{ color: '#3b82f6', marginTop: '4px' }}>
            {(s.sm27_81cm * 100).toFixed(1)}% VWC
          </div>
          <div className="text-xs text-muted" style={{ marginTop: '4px' }}>
            54cm Deep Temp: {s.st54cm}°C • Elevation: {apiState.elevationM}m
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #f97316' }}>
          <div className="metric-label">MAX PORE-PRESSURE RISK ZONE</div>
          <div className="metric-value" style={{ color: '#f97316', marginTop: '4px' }}>
            64.8 kPa
          </div>
          <div className="text-xs text-muted" style={{ marginTop: '4px' }}>
            At {primaryLeak.distanceFromNodeAM}m from N01 (Threshold: 35.0 kPa)
          </div>
        </div>
      </div>

      {/* NODE-BY-NODE HYDRO-GEOLOGICAL & MOISTURE TABLE */}
      <div className="card">
        <div className="card-header">
          <div className="card-title flex items-center gap-xs">
            <Layers size={16} color="var(--primary)" />
            <span>
              Node-Level Soil Moisture Fusion (Open-Meteo Baseline vs ESP32 Trench Probe)
            </span>
          </div>
          <span className="badge badge-info">API KEY: {apiState.activeApiKey}</span>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Node ID</th>
                <th>Geological Soil Strata</th>
                <th>Open-Meteo Baseline (9–27cm)</th>
                <th>ESP32 Trench Probe (%)</th>
                <th>Leak Saturation Delta</th>
                <th>Pore Pressure (kPa)</th>
                <th>Hydro Risk</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {nodes.map((node) => {
                const baselinePct = Number((s.sm9_27cm * 100).toFixed(1));
                const deltaPct = (node.readings.soilMoisturePct - baselinePct).toFixed(1);
                return (
                  <tr key={node.id}>
                    <td style={{ fontWeight: 800 }}>{node.id}</td>
                    <td>{node.soilType}</td>
                    <td className="text-mono">{baselinePct}%</td>
                    <td
                      style={{
                        fontWeight: 800,
                        color:
                          node.readings.soilMoisturePct > 45
                            ? 'var(--critical)'
                            : 'var(--success)'
                      }}
                    >
                      {node.readings.soilMoisturePct}%
                    </td>
                    <td
                      className="text-mono"
                      style={{
                        fontWeight: 700,
                        color: Number(deltaPct) > 10 ? 'var(--critical)' : 'var(--text-muted)'
                      }}
                    >
                      {Number(deltaPct) > 0 ? `+${deltaPct}%` : `${deltaPct}%`}
                    </td>
                    <td
                      style={{
                        fontWeight: 700,
                        color:
                          node.porePressureKpa > 35
                            ? 'var(--critical)'
                            : 'var(--text-primary)'
                      }}
                    >
                      {node.porePressureKpa} kPa
                    </td>
                    <td>
                      <span className={`badge badge-${node.riskLevel}`}>
                        {node.riskLevel}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => navigate(`/detail/${node.id}`)}
                      >
                        Node Detail →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
