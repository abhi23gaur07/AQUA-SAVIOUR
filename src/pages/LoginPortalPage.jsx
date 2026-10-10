import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Droplets,
  Cpu,
  Activity,
  MapPin,
  ShieldCheck,
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Radio,
  BadgeCheck,
  Globe,
  BarChart3,
  FileText,
  Server,
  AlertTriangle
} from 'lucide-react';
import { useAqua } from '../context/AquaContext';
import { PORTAL_ROLES, PORTAL_MODULES } from '../data/aquaData';

export default function LoginPortalPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, register } = useAqua();

  const initialRoleParam = searchParams.get('role');
  const matchedInitialRole =
    PORTAL_ROLES.find((r) => r.id === initialRoleParam) || PORTAL_ROLES[0];

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [selectedRole, setSelectedRole] = useState(matchedInitialRole);
  const [targetPortal, setTargetPortal] = useState('/dashboard');
  const [username, setUsername] = useState(matchedInitialRole.username);
  const [password, setPassword] = useState('aquasafe2026');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPass, setShowPass] = useState(false);

  // Register state
  const [fullName, setFullName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPass, setRegConfirmPass] = useState('');
  const [showRegPass, setShowRegPass] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialRoleParam) {
      const found = PORTAL_ROLES.find((r) => r.id === initialRoleParam);
      if (found) {
        setSelectedRole(found);
        setUsername(found.username);
      }
    }
  }, [initialRoleParam]);

  const handleSelectRole = (roleObj) => {
    setSelectedRole(roleObj);
    setUsername(roleObj.username);
    setErrorMsg('');
  };

  // Instant portal launch when clicking any Portal Option directly
  const handleQuickPortalLaunch = async (portalPath) => {
    setTargetPortal(portalPath);
    await login({
      username: username.trim() || selectedRole.username,
      password: password || 'aquasafe2026',
      roleId: selectedRole.id
    });
    navigate(portalPath);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    if (!username.trim()) {
      setErrorMsg('Please enter your Official ID / Username.');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your security password.');
      return;
    }
    setIsSubmitting(true);
    try {
      await login({
        username: username.trim(),
        password,
        roleId: selectedRole.id
      });
      navigate(targetPortal || '/dashboard');
    } catch {
      setErrorMsg('Authentication failed. Please verify credentials.');
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    if (!fullName.trim()) {
      setErrorMsg('Please enter your full official name & title.');
      return;
    }
    if (!regUsername.trim()) {
      setErrorMsg('Please enter a desired username / Official ID.');
      return;
    }
    if (regPassword.length < 6) {
      setErrorMsg('Security password must be at least 6 characters.');
      return;
    }
    if (regPassword !== regConfirmPass) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    setIsSubmitting(true);
    try {
      await register({
        name: fullName.trim(),
        username: regUsername.trim(),
        password: regPassword,
        roleId: selectedRole.id
      });
      setSuccessMsg(`Registered as ${selectedRole.role}! Entering Portal...`);
      setTimeout(() => {
        navigate(targetPortal || '/dashboard');
      }, 450);
    } catch {
      setErrorMsg('Registration error. Please try again.');
      setIsSubmitting(false);
    }
  };

  const portalIcons = {
    '/dashboard': <MapPin size={14} />,
    '/gis-realtime': <Globe size={14} />,
    '/hydro-moisture': <Droplets size={14} />,
    '/nodes': <Radio size={14} />,
    '/analytics': <BarChart3 size={14} />,
    '/report': <FileText size={14} />,
    '/server': <Server size={14} />,
    '/alerts': <AlertTriangle size={14} />
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexWrap: 'wrap',
        background: 'var(--bg)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-sans)'
      }}
    >
      {/* LEFT PANEL: AQUA SAVIOUR / AQUASAFE AI INTELLIGENCE BRIEFING */}
      <div
        style={{
          flex: '1 1 50%',
          minWidth: '360px',
          background: 'linear-gradient(135deg, #0f172a 0%, #082f49 55%, #020617 100%)',
          color: '#ffffff',
          padding: '40px 44px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Radial Dot Matrix Pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(56, 189, 248, 0.16) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            opacity: 0.65,
            pointerEvents: 'none'
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Top Brand Row + Back to 3D Model Button */}
          <div
            className="flex items-center justify-between flex-wrap gap-md"
            style={{ marginBottom: '28px' }}
          >
            <div className="flex items-center gap-sm">
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 20px rgba(6, 182, 212, 0.45)'
                }}
              >
                <Droplets size={24} color="#ffffff" />
              </div>
              <div>
                <div className="flex items-center gap-sm">
                  <span
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 900,
                      letterSpacing: '0.03em',
                      color: '#ffffff'
                    }}
                  >
                    AQUA SAVIOUR
                  </span>
                  <span
                    style={{
                      background: 'rgba(56, 189, 248, 0.2)',
                      border: '1px solid rgba(56, 189, 248, 0.45)',
                      color: '#38bdf8',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '999px'
                    }}
                  >
                    AQUASAFE AI
                  </span>
                </div>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                  Autonomous Underground Pipeline Crack &amp; Leak Intelligence Platform
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/model-3d')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                color: '#e2e8f0',
                padding: '7px 13px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={14} />
              <span>3D Road &amp; Pipe Model</span>
            </button>
          </div>

          {/* Main Headline & Mission Description */}
          <div style={{ maxWidth: '580px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(16, 185, 129, 0.16)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                color: '#34d399',
                fontSize: '0.7rem',
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: '999px',
                marginBottom: '12px',
                letterSpacing: '0.04em'
              }}
            >
              <Sparkles size={12} />
              <span>PRIOR SAFETY • ZERO INFRASTRUCTURE DAMAGE PIPE REPLACEMENT</span>
            </div>

            <h1
              style={{
                fontSize: '2.05rem',
                fontWeight: 900,
                lineHeight: 1.18,
                color: '#ffffff',
                marginBottom: '14px',
                letterSpacing: '-0.02em'
              }}
            >
              AQUASAFE AI — Real-Time Underground Pipe Crack &amp; Leakage Detector
            </h1>

            <p
              style={{
                fontSize: '0.9rem',
                color: '#cbd5e1',
                lineHeight: 1.6,
                marginBottom: '22px'
              }}
            >
              Pinpoint the <strong>exact leakage distance between underground sensor nodes</strong>{' '}
              for prior safety and surgical pipe replacement without road destruction. Powered by
              low-cost <strong>ESP32 wireless sensor nodes</strong>, a{' '}
              <strong>5-indicator hydro-acoustic detector</strong>,{' '}
              <strong>Open-Meteo Hydro-Geological Moisture Mapping</strong>, and an{' '}
              <strong>AI/ML cross-correlation engine</strong>.
            </p>

            {/* 4 Key System Capabilities */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="flex items-center gap-sm text-sm" style={{ color: '#e2e8f0' }}>
                <div
                  style={{
                    background: 'rgba(2, 132, 199, 0.25)',
                    border: '1px solid rgba(56, 189, 248, 0.35)',
                    padding: '8px',
                    borderRadius: '8px',
                    flexShrink: 0
                  }}
                >
                  <Cpu size={17} color="#38bdf8" />
                </div>
                <div>
                  <strong style={{ color: '#ffffff' }}>
                    ESP32 Wireless 5-Indicator Sensor Nodes (N01–N04):
                  </strong>{' '}
                  <span style={{ color: '#cbd5e1', fontSize: '0.81rem' }}>
                    INMP441 I2S Acoustic Vibration, Hydro-Pressure, Flow Delta, Pipe Crack AI &amp; Soil Moisture.
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-sm text-sm" style={{ color: '#e2e8f0' }}>
                <div
                  style={{
                    background: 'rgba(16, 185, 129, 0.22)',
                    border: '1px solid rgba(52, 211, 153, 0.35)',
                    padding: '8px',
                    borderRadius: '8px',
                    flexShrink: 0
                  }}
                >
                  <Droplets size={17} color="#34d399" />
                </div>
                <div>
                  <strong style={{ color: '#ffffff' }}>
                    GIS Engineer Hydro-Geological Moisture Monitor:
                  </strong>{' '}
                  <span style={{ color: '#cbd5e1', fontSize: '0.81rem' }}>
                    Dedicated Open-Meteo Moisture Heatmap, Pore-Pressure Risk Zones &amp; Hydro Stratification (0–100cm).
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-sm text-sm" style={{ color: '#e2e8f0' }}>
                <div
                  style={{
                    background: 'rgba(249, 115, 22, 0.22)',
                    border: '1px solid rgba(251, 146, 60, 0.35)',
                    padding: '8px',
                    borderRadius: '8px',
                    flexShrink: 0
                  }}
                >
                  <Activity size={17} color="#fb923c" />
                </div>
                <div>
                  <strong style={{ color: '#ffffff' }}>
                    Time-of-Flight Cross-Correlation &amp; AI/ML Prediction:
                  </strong>{' '}
                  <span style={{ color: '#cbd5e1', fontSize: '0.81rem' }}>
                    Computes exact leak position{' '}
                    <code style={{ color: '#38bdf8' }}>Distance = [L - (v × Δt)] / 2</code> at{' '}
                    <code>v = 1,480 m/s</code> (32.5m from N01).
                  </span>
                </div>
              </div>
            </div>

            {/* CLICKABLE DEDICATED PORTAL OPTIONS GRID ON LEFT PANEL */}
            <div style={{ marginTop: '24px' }}>
              <div
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  color: '#38bdf8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '10px'
                }}
              >
                CLICK ANY OPTION BELOW TO LAUNCH THAT DEDICATED PORTAL DIRECTLY:
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                  gap: '8px'
                }}
              >
                {PORTAL_MODULES.slice(0, 8).map((mod) => (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => handleQuickPortalLaunch(mod.path)}
                    style={{
                      textAlign: 'left',
                      background:
                        targetPortal === mod.path
                          ? 'rgba(2, 132, 199, 0.35)'
                          : 'rgba(2, 6, 23, 0.65)',
                      border:
                        targetPortal === mod.path
                          ? '1px solid #38bdf8'
                          : '1px solid rgba(148, 163, 184, 0.22)',
                      borderRadius: '8px',
                      padding: '8px 10px',
                      color: '#f8fafc',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div
                      className="flex items-center justify-between"
                      style={{ fontSize: '0.78rem', fontWeight: 800 }}
                    >
                      <span className="flex items-center gap-xs">
                        <span style={{ color: '#38bdf8' }}>
                          {portalIcons[mod.path] || <MapPin size={14} />}
                        </span>
                        <span>{mod.label}</span>
                      </span>
                      <ArrowRight size={12} color="#38bdf8" />
                    </div>
                    <div
                      className="truncate"
                      style={{ fontSize: '0.66rem', color: '#94a3b8' }}
                    >
                      {mod.roleHighlight}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer of Left Panel */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            paddingTop: '18px',
            marginTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px',
            fontSize: '0.74rem',
            color: '#94a3b8'
          }}
        >
          <span>Jal Jeevan Mission &amp; Smart City Water Conservation</span>
          <span style={{ color: '#38bdf8', fontWeight: 700 }}>
            RUPTURE → CAPTURE → TRANSMIT → CORRELATE → LOCATE → ACT
          </span>
        </div>
      </div>

      {/* RIGHT PANEL: PORTAL OF LOGIN WITH THE 5 ROLES & PORTAL DESTINATION */}
      <div
        style={{
          flex: '1 1 46%',
          minWidth: '360px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 38px',
          background: 'var(--bg)'
        }}
      >
        <div style={{ width: '100%', maxWidth: '480px' }}>
          {/* Sign In / Create Account Tab Switcher */}
          <div
            style={{
              display: 'flex',
              background: 'var(--card-hover)',
              borderRadius: 'var(--r-md)',
              padding: '4px',
              marginBottom: '20px',
              border: '1px solid var(--border)'
            }}
          >
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              style={{
                flex: 1,
                padding: '9px 16px',
                border: 'none',
                borderRadius: 'var(--r-sm)',
                background: mode === 'login' ? 'var(--card)' : 'transparent',
                color: mode === 'login' ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: mode === 'login' ? 800 : 600,
                fontSize: '0.85rem',
                boxShadow: mode === 'login' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                cursor: 'pointer'
              }}
            >
              Sign In to Portal
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              style={{
                flex: 1,
                padding: '9px 16px',
                border: 'none',
                borderRadius: 'var(--r-sm)',
                background: mode === 'register' ? 'var(--card)' : 'transparent',
                color: mode === 'register' ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: mode === 'register' ? 800 : 600,
                fontSize: '0.85rem',
                boxShadow: mode === 'register' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                cursor: 'pointer'
              }}
            >
              Register Official Role
            </button>
          </div>

          {/* Portal Header */}
          <div style={{ marginBottom: '16px' }}>
            <div className="flex items-center justify-between">
              <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '4px' }}>
                {mode === 'login'
                  ? 'AQUA SAVIOUR Command Portal'
                  : 'Register Official AQUASAFE Profile'}
              </h2>
              <span className="badge badge-ai">5 ROLES</span>
            </div>
            <p className="text-sm text-secondary">
              Select your role and desired portal option (defaults to Node Live Map)
            </p>
          </div>

          {/* 5 ROLES INTERACTIVE SELECTOR */}
          <div style={{ marginBottom: '16px' }}>
            <div
              className="flex items-center justify-between"
              style={{ marginBottom: '8px' }}
            >
              <label
                className="form-label"
                style={{
                  fontSize: '0.74rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}
              >
                1. Select Authorized Role
              </label>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: selectedRole.color
                }}
              >
                Active: {selectedRole.badge}
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))',
                gap: '8px'
              }}
            >
              {PORTAL_ROLES.map((roleItem) => {
                const isSelected = selectedRole.id === roleItem.id;
                return (
                  <button
                    key={roleItem.id}
                    type="button"
                    onClick={() => handleSelectRole(roleItem)}
                    style={{
                      textAlign: 'left',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: isSelected
                        ? `2px solid ${roleItem.color}`
                        : '1px solid var(--border)',
                      background: isSelected ? roleItem.bgLight : 'var(--card)',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        style={{
                          fontSize: '0.64rem',
                          fontWeight: 800,
                          color: roleItem.color,
                          letterSpacing: '0.03em'
                        }}
                      >
                        {roleItem.badge}
                      </span>
                      {isSelected && <BadgeCheck size={14} color={roleItem.color} />}
                    </div>
                    <div
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        color: 'var(--text-primary)'
                      }}
                    >
                      {roleItem.role}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. SELECT DESTINATION PORTAL OPTION */}
          <div style={{ marginBottom: '16px' }}>
            <label
              className="form-label"
              style={{
                fontSize: '0.74rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                display: 'block',
                marginBottom: '6px'
              }}
            >
              2. Choose Portal Interface to Open
            </label>
            <select
              className="form-select"
              style={{ width: '100%', fontWeight: 700 }}
              value={targetPortal}
              onChange={(e) => setTargetPortal(e.target.value)}
            >
              <option value="/dashboard">
                Node Live Map Portal (Default — Surface Surveillance &amp; Heatmaps)
              </option>
              <option value="/gis-realtime">
                GIS Realtime Portal (Between-Node Leak Triangulation &amp; GIS Details)
              </option>
              <option value="/hydro-moisture">
                Hydro Moisture Map Portal (GIS Engineer — Open-Meteo Moisture &amp; Pore-Pressure)
              </option>
              <option value="/nodes">
                Node Details Portal (ESP32 Wireless Sensor Fleet &amp; DMA Telemetry)
              </option>
              <option value="/analytics">
                Analytics Portal (256-Sample Cross-Correlation &amp; AI/ML Predictions)
              </option>
              <option value="/report">
                Regulatory Compliance &amp; Safety Reports Builder Portal
              </option>
              <option value="/server">
                Server &amp; MQTT Gateway Status Portal
              </option>
              <option value="/alerts">
                Emergency Leak Alerts &amp; Crew Dispatch Portal
              </option>
            </select>
          </div>

          {/* Error / Success Alerts */}
          {errorMsg && (
            <div
              style={{
                background: 'var(--critical-bg)',
                border: '1px solid var(--critical-light)',
                borderRadius: 'var(--r-md)',
                padding: '10px 14px',
                color: 'var(--critical)',
                fontSize: '0.8125rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '14px'
              }}
            >
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div
              style={{
                background: 'var(--success-bg)',
                border: '1px solid var(--success-light)',
                borderRadius: 'var(--r-md)',
                padding: '10px 14px',
                color: 'var(--success)',
                fontSize: '0.8125rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '14px'
              }}
            >
              <CheckCircle2 size={16} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* LOGIN FORM */}
          {mode === 'login' ? (
            <form
              onSubmit={handleLoginSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              <div className="form-group">
                <label className="form-label">
                  Official Username / ID ({selectedRole.role})
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    className="form-input"
                    style={{ width: '100%', paddingLeft: '36px' }}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your official username"
                    required
                  />
                  <User
                    size={16}
                    color="var(--text-muted)"
                    style={{ position: 'absolute', left: 12, top: 12 }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Security Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPass ? 'text' : 'password'}
                    className="form-input"
                    style={{ width: '100%', paddingLeft: '36px', paddingRight: '40px' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                  />
                  <Lock
                    size={16}
                    color="var(--text-muted)"
                    style={{ position: 'absolute', left: 12, top: 12 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    style={{
                      position: 'absolute',
                      right: 8,
                      top: 8,
                      padding: 4,
                      color: 'var(--text-muted)'
                    }}
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="form-checkbox">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="text-xs text-secondary">
                    Remember session &amp; enable instant portal switching
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
                style={{
                  padding: '13px',
                  justifyContent: 'center',
                  marginTop: '4px',
                  fontSize: '0.88rem',
                  fontWeight: 800
                }}
              >
                {isSubmitting ? (
                  'Authenticating...'
                ) : (
                  <>
                    <span>Sign In as {selectedRole.role}</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* REGISTER FORM */
            <form
              onSubmit={handleRegisterSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              <div className="form-group">
                <label className="form-label">Full Official Name &amp; Designation</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    className="form-input"
                    style={{ width: '100%', paddingLeft: '36px' }}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={`e.g. ${selectedRole.defaultName}`}
                    required
                  />
                  <User
                    size={16}
                    color="var(--text-muted)"
                    style={{ position: 'absolute', left: 12, top: 12 }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Desired Username / Official ID ({selectedRole.badge})
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    className="form-input"
                    style={{ width: '100%', paddingLeft: '36px' }}
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    placeholder={`e.g. ${selectedRole.username}`}
                    required
                  />
                  <ShieldCheck
                    size={16}
                    color="var(--text-muted)"
                    style={{ position: 'absolute', left: 12, top: 12 }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Security Password (min 6 chars)</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showRegPass ? 'text' : 'password'}
                    className="form-input"
                    style={{ width: '100%', paddingLeft: '36px', paddingRight: '40px' }}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                  />
                  <Lock
                    size={16}
                    color="var(--text-muted)"
                    style={{ position: 'absolute', left: 12, top: 12 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPass(!showRegPass)}
                    style={{
                      position: 'absolute',
                      right: 8,
                      top: 8,
                      padding: 4,
                      color: 'var(--text-muted)'
                    }}
                  >
                    {showRegPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showRegPass ? 'text' : 'password'}
                    className="form-input"
                    style={{ width: '100%', paddingLeft: '36px' }}
                    value={regConfirmPass}
                    onChange={(e) => setRegConfirmPass(e.target.value)}
                    placeholder="••••••••••••"
                    required
                  />
                  <Lock
                    size={16}
                    color="var(--text-muted)"
                    style={{ position: 'absolute', left: 12, top: 12 }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
                style={{
                  padding: '13px',
                  justifyContent: 'center',
                  marginTop: '4px',
                  fontWeight: 800
                }}
              >
                <span>Register {selectedRole.role} &amp; Enter Portal</span>
                <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
