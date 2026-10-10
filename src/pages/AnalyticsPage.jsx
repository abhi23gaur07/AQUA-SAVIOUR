import React, { useState } from 'react';
import { BarChart3, Activity, Sparkles, Cpu } from 'lucide-react';
import AppShell from '../components/AppShell';
import { useAqua } from '../context/AquaContext';

export default function AnalyticsPage() {
  const { nodes } = useAqua();
  const [shiftMs, setShiftMs] = useState(23.65);

  const correlationPeak = Math.max(
    12,
    Math.round(98 * Math.exp(-Math.pow((shiftMs - 23.65) / 8, 2)))
  );

  return (
    <AppShell>
      <div className="flex items-center justify-between flex-wrap gap-md">
        <div>
          <div className="flex items-center gap-sm">
            <span className="badge badge-ai">AI / ML &amp; SIGNAL ANALYTICS PORTAL</span>
            <span className="text-xs text-muted">
              256-Sample DMA Cross-Correlation &amp; Multi-Indicator Anomaly Matrix
            </span>
          </div>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 900, marginTop: '4px' }}>
            Acoustic Cross-Correlation &amp; Predictive Pipe Crack Analytics
          </h1>
        </div>
      </div>

      {/* INTERACTIVE CROSS-CORRELATION PEAK MATCHER */}
      <div className="split-two-col">
        <div className="card" style={{ borderTop: '4px solid #7c3aed' }}>
          <div className="card-header">
            <div className="card-title flex items-center gap-xs">
              <Activity size={16} color="#7c3aed" />
              <span>Interactive Waveform Shift Cross-Correlation (R_AB(τ))</span>
            </div>
            <span className="badge badge-ai">Peak Match: {correlationPeak}%</span>
          </div>

          <p className="text-xs text-secondary" style={{ marginBottom: '12px', lineHeight: 1.5 }}>
            Slide the time delay τ (ms) below to align Node N02&apos;s 256-sample INMP441 DMA
            recording with Node N01. Maximum cross-correlation occurs at{' '}
            <strong>Δt = +23.65 ms</strong>, pinpointing the leak at{' '}
            <strong>32.5 m from N01</strong>.
          </p>

          <div
            style={{
              background: '#091326',
              padding: '16px',
              borderRadius: '10px',
              marginBottom: '12px',
              color: '#f8fafc'
            }}
          >
            <div className="flex justify-between text-xs" style={{ marginBottom: '8px' }}>
              <span>Time Shift τ: {shiftMs.toFixed(2)} ms</span>
              <span style={{ color: '#38bdf8', fontWeight: 800 }}>
                Correlation Score: {correlationPeak}%
              </span>
            </div>

            {/* Visual Correlation Bell Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '4px',
                height: '110px',
                paddingTop: '10px'
              }}
            >
              {Array.from({ length: 28 }).map((_, idx) => {
                const tau = -10 + idx * 2.5;
                const val = Math.max(
                  10,
                  Math.round(96 * Math.exp(-Math.pow((tau - 23.65) / 7.5, 2)))
                );
                const isNearSlider = Math.abs(tau - shiftMs) < 1.5;
                return (
                  <div
                    key={idx}
                    style={{
                      flex: 1,
                      height: `${val}%`,
                      background: isNearSlider
                        ? '#ef4444'
                        : val > 80
                        ? '#38bdf8'
                        : 'rgba(148,163,184,0.3)',
                      borderRadius: '3px 3px 0 0',
                      transition: 'height 0.2s'
                    }}
                  />
                );
              })}
            </div>
          </div>

          <input
            type="range"
            min="-10"
            max="55"
            step="0.05"
            value={shiftMs}
            onChange={(e) => setShiftMs(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#7c3aed' }}
          />
        </div>

        {/* AI / ML 5-INDICATOR WEIGHTS & SPECTRAL SIGNATURE */}
        <div className="card" style={{ borderTop: '4px solid #0284c7' }}>
          <div className="card-header">
            <div className="card-title flex items-center gap-xs">
              <Sparkles size={16} color="#0284c7" />
              <span>AI/ML Multi-Indicator Feature Importance &amp; Spectral Hiss</span>
            </div>
            <span className="badge badge-info">1.84 kHz PEAK</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              {
                name: 'INMP441 High-Freq Acoustic Hiss (1.2–2.8 kHz)',
                weight: 38,
                color: '#ef4444'
              },
              {
                name: 'Cross-Correlation Time-of-Flight Peak (Δt)',
                weight: 26,
                color: '#7c3aed'
              },
              {
                name: 'Internal Pipe Water Pressure Drop (Bar)',
                weight: 16,
                color: '#0284c7'
              },
              {
                name: 'Volumetric Flow Loss Delta (L/min)',
                weight: 12,
                color: '#f97316'
              },
              {
                name: 'Sub-Surface Soil Moisture & Pore Pressure',
                weight: 8,
                color: '#10b981'
              }
            ].map((item) => (
              <div key={item.name}>
                <div className="flex justify-between text-xs" style={{ marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700 }}>{item.name}</span>
                  <strong style={{ color: item.color }}>{item.weight}% Weight</strong>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${item.weight * 2.2}%`, background: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NODE AI PREDICTION HORIZON TABLE */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">Node-by-Node AI Crack Propagation &amp; Water Loss Forecast</div>
          <span className="badge badge-L3">2,720 L/hr TOTAL LOSS PREVENTABLE</span>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Node ID</th>
                <th>AI Risk Score</th>
                <th>Model Confidence</th>
                <th>Predicted Crack Growth</th>
                <th>Forecast Horizon</th>
                <th>Analytical Assessment</th>
              </tr>
            </thead>
            <tbody>
              {nodes.map((n) => (
                <tr key={n.id}>
                  <td style={{ fontWeight: 800 }}>{n.id}</td>
                  <td style={{ fontWeight: 800, color: '#7c3aed' }}>{n.riskScore}%</td>
                  <td>{n.aiConfidence}%</td>
                  <td className="text-mono">+{n.predictedCrackGrowthMm} mm</td>
                  <td>{n.predictionHorizonHrs} hours</td>
                  <td>{n.trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}

