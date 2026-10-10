import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  CheckCircle2,
  Wrench,
  MapPin,
  ShieldAlert
} from 'lucide-react';
import AppShell from '../components/AppShell';
import { useAqua } from '../context/AquaContext';

export default function AlertsPage() {
  const navigate = useNavigate();
  const { alerts, acknowledgeAlert, resolveAlert } = useAqua();

  return (
    <AppShell>
      <div className="flex items-center justify-between flex-wrap gap-md">
        <div>
          <div className="flex items-center gap-sm">
            <span className="badge badge-L3">EMERGENCY DISPATCH &amp; ALERTS PORTAL</span>
            <span className="text-xs text-muted">
              Zero-Damage Surgical Pipe Replacement &amp; Valve Isolation Protocol
            </span>
          </div>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 900, marginTop: '4px' }}>
            Real-Time Underground Leakage Alerts &amp; Crew Dispatch
          </h1>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {alerts.map((alert) => {
          const isCrit = alert.severity === 'L3';
          return (
            <div
              key={alert.id}
              className="card"
              style={{
                borderLeft: `5px solid ${
                  isCrit ? 'var(--critical)' : 'var(--warning)'
                }`
              }}
            >
              <div
                className="flex items-center justify-between flex-wrap gap-sm"
                style={{ marginBottom: '10px' }}
              >
                <div className="flex items-center gap-sm">
                  <span className={`badge badge-${alert.severity}`}>
                    {alert.severity}
                  </span>
                  <strong style={{ fontSize: '1rem' }}>{alert.title}</strong>
                </div>
                <span className="text-xs text-muted">
                  Status: <strong>{alert.status}</strong>
                  {alert.acknowledgedBy ? ` (By ${alert.acknowledgedBy})` : ''}
                </span>
              </div>

              <p className="text-sm text-secondary" style={{ lineHeight: 1.6, marginBottom: '12px' }}>
                {alert.message}
              </p>

              <div
                style={{
                  background: 'var(--bg)',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Wrench size={15} color="var(--primary)" />
                <span>
                  <strong>Recommended Zero-Damage Action:</strong> {alert.recommendedAction}
                </span>
              </div>

              <div className="flex items-center gap-sm flex-wrap">
                {alert.status === 'Active' && (
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => acknowledgeAlert(alert.id)}
                  >
                    <CheckCircle2 size={14} />
                    <span>Acknowledge &amp; Dispatch Surgical Crew</span>
                  </button>
                )}
                {alert.status !== 'Resolved' && (
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => resolveAlert(alert.id)}
                  >
                    Mark Resolved
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => navigate(`/detail/${alert.nodeId}`)}
                >
                  View {alert.nodeId} Telemetry →
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => navigate('/gis-realtime')}
                >
                  <MapPin size={14} />
                  <span>Open on GIS Realtime</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}

