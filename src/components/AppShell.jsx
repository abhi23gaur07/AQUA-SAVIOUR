import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Map,
  Globe,
  Droplets,
  BarChart3,
  FileText,
  Server,
  AlertTriangle,
  Radio,
  Sun,
  Moon,
  Bell,
  LogOut,
  Activity,
  Box,
  BookOpen,
  LayoutGrid,
  ChevronRight,
  Cpu,
  X
} from 'lucide-react';
import { useAqua } from '../context/AquaContext';
import { PORTAL_ROLES } from '../data/aquaData';

export default function AppShell({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, nodes, alerts, darkMode, toggleTheme, switchRole, logout } = useAqua();
  const [showPortalPicker, setShowPortalPicker] = useState(false);

  const activeAlertsCount = alerts.filter((a) => a.status === 'Active').length;
  const hasCritical = nodes.some((n) => n.riskLevel === 'L3');

  const navItems = [
    {
      to: '/dashboard',
      label: 'Node Live Map',
      icon: <Map size={18} />,
      desc: 'Geographical Surface Surveillance & Dual Heatmaps'
    },
    {
      to: '/gis-realtime',
      label: 'GIS Realtime',
      icon: <Globe size={18} />,
      desc: 'GIS Details, Between-Node Triangulation & Coordinates'
    },
    {
      to: '/hydro-moisture',
      label: 'Hydro Moisture Map',
      icon: <Droplets size={18} />,
      badge: 'GIS ENG',
      badgeColor: '#0284c7',
      desc: 'Open-Meteo Hydro-Geological Moisture & Pore-Pressure Monitor'
    },
    {
      to: '/analytics',
      label: 'Analytics',
      icon: <BarChart3 size={18} />,
      desc: '256-Sample DMA Cross-Correlation & AI/ML Predictions'
    },
    {
      to: '/report',
      label: 'Report',
      icon: <FileText size={18} />,
      desc: 'Regulatory Compliance & Safety Reports Builder'
    },
    {
      to: '/server',
      label: 'Server Status',
      icon: <Server size={18} />,
      desc: 'MQTT Broker, Cloud Engine & 1Hz GPS PPS Sync Health'
    },
    {
      to: '/alerts',
      label: 'Alerts',
      icon: <AlertTriangle size={18} />,
      badge: activeAlertsCount > 0 ? String(activeAlertsCount) : null,
      badgeColor: '#dc2626',
      desc: 'Emergency Leak Protocol & Surgical Crew Dispatch'
    },
    {
      to: '/nodes',
      label: 'Nodes',
      icon: <Radio size={18} />,
      desc: 'ESP32 Sensor Nodes Fleet & Individual Node Details'
    },
    {
      to: '/study',
      label: '4-Page Study',
      icon: <BookOpen size={18} />,
      desc: 'System Architecture, Scalability & Prototype Study'
    }
  ];

  return (
    <div className="app-shell">
      {/* TOP HEADER BAR (Exact visual match to reference screenshots) */}
      <header className="app-header">
        <div className="header-left">
          <div
            className="header-brand"
            onClick={() => navigate('/dashboard')}
            style={{ cursor: 'pointer' }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #0f172a 0%, #0284c7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Droplets size={18} color="#ffffff" />
            </div>
            <span
              className="header-title"
              style={{ letterSpacing: '0.03em', fontWeight: 900 }}
            >
              AQUASAFE AI
            </span>
          </div>

          <div className="header-divider" />

          {/* Button to open the Multi-Portal Option Selector */}
          <button
            type="button"
            onClick={() => setShowPortalPicker(true)}
            className="btn btn-secondary btn-sm"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 700,
              fontSize: '0.75rem',
              borderColor: 'var(--primary)',
              color: 'var(--primary)'
            }}
          >
            <LayoutGrid size={14} />
            <span>Switch Portal Option</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/model-3d')}
            className="btn btn-secondary btn-sm"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.75rem'
            }}
          >
            <Box size={14} />
            <span>3D Model</span>
          </button>
        </div>

        <div className="header-right">
          {/* CRITICAL Status Indicator */}
          <div className="header-status-item">
            <span
              className="status-dot"
              style={{
                background: hasCritical ? 'var(--critical)' : 'var(--success)'
              }}
            />
            <span
              className="text-xs"
              style={{
                color: hasCritical ? 'var(--critical)' : 'var(--success)',
                fontWeight: 800
              }}
            >
              {hasCritical ? 'CRITICAL' : 'NORMAL'}
            </span>
          </div>

          <div className="header-divider" />

          {/* Last Synced Time */}
          <div className="header-status-item text-muted">
            <Activity size={14} />
            <span>6 minutes ago</span>
          </div>

          <div className="header-divider" />

          {/* Active Alerts Count */}
          <div
            className="header-status-item text-muted"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/alerts')}
          >
            <AlertTriangle
              size={14}
              color={activeAlertsCount > 0 ? 'var(--warning)' : 'currentColor'}
            />
            <span>{activeAlertsCount} alerts</span>
          </div>

          <div className="header-divider" />

          {/* Theme Toggle */}
          <button
            type="button"
            className="btn-icon"
            onClick={toggleTheme}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? (
              <Sun size={17} color="var(--text-secondary)" />
            ) : (
              <Moon size={17} color="var(--text-secondary)" />
            )}
          </button>

          {/* Notification Bell */}
          <button
            type="button"
            className="btn-icon"
            onClick={() => navigate('/alerts')}
            title="View Alerts Portal"
            style={{ position: 'relative' }}
          >
            <Bell size={17} color="var(--text-secondary)" />
            {activeAlertsCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: 'var(--critical)'
                }}
              />
            )}
          </button>

          <div className="header-divider" />

          {/* Role Switcher Dropdown + Logout */}
          <div className="flex items-center gap-sm">
            <select
              value={user?.roleId || 'GIS_ANALYST'}
              onChange={(e) => switchRole(e.target.value)}
              className="form-select"
              style={{
                padding: '4px 26px 4px 10px',
                fontSize: '0.76rem',
                fontWeight: 700,
                borderRadius: '6px',
                background: 'var(--card)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border)'
              }}
              title="Switch Active Official Role"
            >
              {PORTAL_ROLES.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.role}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="btn-icon"
              onClick={() => {
                logout();
                navigate('/login');
              }}
              title="Sign Out to Login Portal"
            >
              <LogOut size={16} color="var(--text-secondary)" />
            </button>
          </div>
        </div>
      </header>

      {/* BODY: SIDEBAR + DEDICATED PORTAL VIEW */}
      <div className="app-body">
        <aside className="app-sidebar">
          <nav className="sidebar-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
                style={{ justifyContent: 'space-between' }}
              >
                <span className="flex items-center gap-sm">
                  {item.icon}
                  <span>{item.label}</span>
                </span>
                {item.badge && (
                  <span
                    style={{
                      fontSize: '0.6rem',
                      fontWeight: 800,
                      padding: '1px 6px',
                      borderRadius: '999px',
                      background: item.badgeColor || 'var(--primary)',
                      color: '#ffffff'
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}

            {/* Quick Individual Node Details Sub-Links */}
            <div
              style={{
                marginTop: '12px',
                paddingTop: '10px',
                borderTop: '1px solid var(--border)'
              }}
            >
              <div
                style={{
                  padding: '4px 14px',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                Direct Node Details
              </div>
              {nodes.map((n) => {
                const isNodeActive = location.pathname === `/detail/${n.id}`;
                return (
                  <div
                    key={n.id}
                    onClick={() => navigate(`/detail/${n.id}`)}
                    className={`nav-link ${isNodeActive ? 'active' : ''}`}
                    style={{
                      padding: '7px 14px',
                      fontSize: '0.78rem',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span className="flex items-center gap-xs">
                      <Cpu size={14} />
                      <span>Node {n.id} Detail</span>
                    </span>
                    <span
                      className={`badge badge-${n.riskLevel}`}
                      style={{ fontSize: '0.6rem', padding: '1px 6px' }}
                    >
                      {n.riskLevel}
                    </span>
                  </div>
                );
              })}
            </div>
          </nav>
        </aside>

        {/* Dedicated Page Content */}
        <main className="app-main">{children}</main>
      </div>

      {/* PORTAL OPTIONS LAUNCHER MODAL (Click on different options to jump to dedicated portals) */}
      {showPortalPicker && (
        <div
          onClick={() => setShowPortalPicker(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="card animate-fade-in"
            style={{
              width: '100%',
              maxWidth: '880px',
              padding: '24px',
              borderRadius: '16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45)'
            }}
          >
            <div
              className="flex items-center justify-between"
              style={{
                paddingBottom: '14px',
                marginBottom: '18px',
                borderBottom: '1px solid var(--border)'
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    color: 'var(--primary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em'
                  }}
                >
                  AQUA SAVIOUR • MULTI-PORTAL NAVIGATION HUB
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 900 }}>
                  Select a Dedicated Portal Interface
                </h2>
              </div>
              <button
                type="button"
                className="btn-icon"
                onClick={() => setShowPortalPicker(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '12px'
              }}
            >
              {navItems.map((item) => (
                <div
                  key={item.to}
                  onClick={() => {
                    setShowPortalPicker(false);
                    navigate(item.to);
                  }}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '10px',
                    border:
                      location.pathname === item.to
                        ? '2px solid var(--primary)'
                        : '1px solid var(--border)',
                    background:
                      location.pathname === item.to
                        ? 'var(--primary-light)'
                        : 'var(--bg)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '8px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="flex items-center gap-sm"
                      style={{ fontWeight: 800, color: 'var(--text-primary)' }}
                    >
                      <span style={{ color: 'var(--primary)' }}>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight size={16} color="var(--text-muted)" />
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

