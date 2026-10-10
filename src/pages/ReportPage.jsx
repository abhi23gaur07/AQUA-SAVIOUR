import React, { useState } from 'react';
import { FileText, Printer, CheckCircle2 } from 'lucide-react';
import AppShell from '../components/AppShell';
import { useAqua } from '../context/AquaContext';

export default function ReportPage() {
  const { nodes, leaks, user } = useAqua();

  const [siteName, setSiteName] = useState('Prototype Pipeline — Jharkhand / Delhi, India');
  const [regionName, setRegionName] = useState('Central Block Trench #4');
  const [period, setPeriod] = useState('Last 7 Days (Standard)');
  const [nodeScope, setNodeScope] = useState('All Prototype Nodes (N01, N02, N03, N04)');
  const [showPreview, setShowPreview] = useState(false);

  const [sections, setSections] = useState({
    executiveSummary: true,
    riskOverview: true,
    affectedZones: true,
    sensorStatistics: true,
    majorAlerts: true,
    aiPredictions: true,
    nodeHealth: true,
    trendAnalysis: true,
    recommendedActions: true
  });

  const toggleSection = (key) => {
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const sectionList = [
    { key: 'executiveSummary', label: 'Executive Summary' },
    { key: 'riskOverview', label: 'Risk Overview' },
    { key: 'affectedZones', label: 'Affected Zones' },
    { key: 'sensorStatistics', label: 'Sensor Statistics' },
    { key: 'majorAlerts', label: 'Major Alerts' },
    { key: 'aiPredictions', label: 'AI Predictions' },
    { key: 'nodeHealth', label: 'Node Health' },
    { key: 'trendAnalysis', label: 'Trend Analysis' },
    { key: 'recommendedActions', label: 'Recommended Actions' }
  ];

  const primaryLeak = leaks[0];

  return (
    <AppShell>
      {/* Page Title & Subtitle (Exact match to Screenshot 2) */}
      <div>
        <h1 style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--text-primary)' }}>
          Regulatory Compliance &amp; Safety Reports
        </h1>
        <p className="text-xs text-muted" style={{ marginTop: '4px' }}>
          Formal technical reporting for Water Authority Management, Hydro-Geotechnical Authorities,
          and Jal Jeevan Regulators
        </p>
      </div>

      {/* REPORT CONFIGURATION & BUILDER CARD (Exact match to Screenshot 2) */}
      <div className="card" style={{ padding: '24px' }}>
        <div
          className="flex items-center gap-xs"
          style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '18px'
          }}
        >
          <FileText size={15} color="var(--primary)" />
          <span>REPORT CONFIGURATION &amp; BUILDER</span>
        </div>

        {/* 4 Input Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '16px',
            marginBottom: '20px'
          }}
        >
          <div className="form-group">
            <label className="form-label">Pipeline / Site Name</label>
            <input
              type="text"
              className="form-input"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Geological Monitoring Region</label>
            <input
              type="text"
              className="form-input"
              value={regionName}
              onChange={(e) => setRegionName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Reporting Period</label>
            <select
              className="form-select"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option>Last 7 Days (Standard)</option>
              <option>Last 24 Hours (Emergency L3 Incident)</option>
              <option>Last 30 Days (Monthly Regulatory Audit)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Node Scope</label>
            <select
              className="form-select"
              value={nodeScope}
              onChange={(e) => setNodeScope(e.target.value)}
            >
              <option>All Prototype Nodes (N01, N02, N03, N04)</option>
              <option>Critical Rupture Segment (N01, N02)</option>
              <option>Node N02 (L3 Critical) Only</option>
            </select>
          </div>
        </div>

        {/* Report Content Sections Checkboxes (Exact match to Screenshot 2) */}
        <div style={{ marginBottom: '20px' }}>
          <div
            className="form-label"
            style={{ marginBottom: '10px', fontWeight: 700 }}
          >
            Report Content Sections
          </div>

          <div
            style={{
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '16px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
              gap: '12px'
            }}
          >
            {sectionList.map((sec) => (
              <label key={sec.key} className="form-checkbox">
                <input
                  type="checkbox"
                  checked={sections[sec.key]}
                  onChange={() => toggleSection(sec.key)}
                />
                <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                  {sec.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-sm">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowPreview(true)}
            style={{ fontWeight: 700 }}
          >
            <FileText size={15} />
            <span>Generate Report Preview</span>
          </button>

          {showPreview && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => window.print()}
            >
              <Printer size={15} />
              <span>Print / Export Official PDF</span>
            </button>
          )}
        </div>
      </div>

      {/* GENERATED REPORT PREVIEW */}
      {showPreview && (
        <div
          className="card animate-fade-in"
          style={{
            padding: '28px',
            borderTop: '4px solid var(--primary)'
          }}
        >
          <div
            className="flex items-center justify-between flex-wrap gap-md"
            style={{
              borderBottom: '2px solid var(--border)',
              paddingBottom: '16px',
              marginBottom: '20px'
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  color: 'var(--primary)',
                  textTransform: 'uppercase'
                }}
              >
                AQUA SAVIOUR (AQUASAFE AI) • OFFICIAL TECHNICAL COMPLIANCE DOSSIER
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 900, marginTop: '4px' }}>
                {siteName} — {regionName}
              </h2>
              <div className="text-xs text-muted" style={{ marginTop: '2px' }}>
                Period: {period} • Scope: {nodeScope} • Prepared by:{' '}
                {user?.name || 'Authorized Engineer'} ({user?.role || 'GIS Analyst'})
              </div>
            </div>
            <span className="badge badge-L3">OVERALL STATUS: L3 CRITICAL</span>
          </div>

          {sections.executiveSummary && (
            <div style={{ marginBottom: '18px' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '6px' }}>
                1. Executive Summary &amp; Between-Node Leak Pinpointing
              </h3>
              <p className="text-sm text-secondary" style={{ lineHeight: 1.6 }}>
                Using NEO-6M 1Hz GPS Pulse-Per-Second (PPS) synchronization and 256-sample INMP441
                I2S DMA waveform cross-correlation, AQUASAFE AI has pinpointed an active L3
                underground pipe rupture at <strong>{primaryLeak.distanceFromNodeAM} m from N01</strong>{' '}
                (67.5 m from N02, time delay Δt = +23.65 ms). Surgical excavation of a{' '}
                <strong>1.2m × 0.8m window</strong> is approved for zero-infrastructure-damage pipe
                replacement.
              </p>
            </div>
          )}

          {sections.sensorStatistics && (
            <div style={{ marginBottom: '18px' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '8px' }}>
                2. Sensor Node Telemetry Summary
              </h3>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Node ID</th>
                      <th>Risk Level</th>
                      <th>AI Risk</th>
                      <th>Acoustic (dB)</th>
                      <th>Pressure (bar)</th>
                      <th>Soil Moisture (%)</th>
                      <th>Pore Pressure (kPa)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nodes.map((n) => (
                      <tr key={n.id}>
                        <td style={{ fontWeight: 800 }}>{n.id}</td>
                        <td>
                          <span className={`badge badge-${n.riskLevel}`}>
                            {n.riskLevel}
                          </span>
                        </td>
                        <td>{n.riskScore}%</td>
                        <td>{n.readings.acousticDb} dB</td>
                        <td>{n.readings.pressureBar} bar</td>
                        <td>{n.readings.soilMoisturePct}%</td>
                        <td>{n.porePressureKpa} kPa</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {sections.recommendedActions && (
            <div
              style={{
                background: 'var(--bg)',
                padding: '14px',
                borderRadius: '8px',
                borderLeft: '4px solid var(--success)'
              }}
            >
              <div className="flex items-center gap-xs" style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--success)' }}>
                <CheckCircle2 size={16} />
                <span>Recommended Zero-Damage Action Protocol</span>
              </div>
              <p className="text-xs text-secondary" style={{ marginTop: '4px', lineHeight: 1.5 }}>
                Isolate Relay Valve R-01, dispatch repair crew to GPS ({primaryLeak.latitude},{' '}
                {primaryLeak.longitude}), and perform surgical collar replacement at{' '}
                {primaryLeak.distanceFromNodeAM}m from Node N01 without disturbing the remaining
                98.8% of road asphalt.
              </p>
            </div>
          )}
        </div>
      )}
    </AppShell>
  );
}

