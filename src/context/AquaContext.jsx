import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_NODES,
  PINPOINTED_LEAKS,
  PORTAL_ROLES,
  INITIAL_ALERTS
} from '../data/aquaData';

const AquaContext = createContext(null);

const STORAGE_KEY = 'aqua_saviour_auth_v2';
const THEME_KEY = 'aqua_saviour_theme';

export function AquaProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem(THEME_KEY) === 'dark';
  });

  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [leaks, setLeaks] = useState(PINPOINTED_LEAKS);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem(THEME_KEY, darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Live telemetry micro-updates every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setNodes((prev) =>
        prev.map((node) => {
          const jitter = (Math.random() - 0.5) * 0.6;
          const newAcoustic = Math.max(
            18,
            Number((node.readings.acousticDb + jitter).toFixed(1))
          );
          const newPressure = Math.max(
            1.5,
            Number((node.readings.pressureBar + (Math.random() - 0.5) * 0.03).toFixed(2))
          );
          const newFlow = Math.max(
            0.4,
            Number((node.readings.flowDeltaLpm + (Math.random() - 0.5) * 0.25).toFixed(1))
          );
          const newMoisture = Math.min(
            98,
            Math.max(
              15,
              Number((node.readings.soilMoisturePct + (Math.random() - 0.5) * 0.2).toFixed(1))
            )
          );
          return {
            ...node,
            readings: {
              ...node.readings,
              acousticDb: newAcoustic,
              pressureBar: newPressure,
              flowDeltaLpm: newFlow,
              soilMoisturePct: newMoisture
            }
          };
        })
      );
      setLastUpdate(new Date());
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const login = async ({ username, password, roleId, customName }) => {
    const matchedRole =
      PORTAL_ROLES.find((r) => r.id === roleId || r.role === roleId) || PORTAL_ROLES[0];

    const sessionUser = {
      username: username?.trim() || matchedRole.username,
      name: customName?.trim() || matchedRole.defaultName,
      role: matchedRole.role,
      roleId: matchedRole.id,
      badge: matchedRole.badge,
      department: matchedRole.department,
      clearance: matchedRole.clearance,
      color: matchedRole.color,
      loginTime: new Date().toISOString()
    };

    setUser(sessionUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser));
    return sessionUser;
  };

  const switchRole = (roleId) => {
    const matchedRole =
      PORTAL_ROLES.find((r) => r.id === roleId || r.role === roleId) || PORTAL_ROLES[0];
    const updatedUser = {
      username: matchedRole.username,
      name: matchedRole.defaultName,
      role: matchedRole.role,
      roleId: matchedRole.id,
      badge: matchedRole.badge,
      department: matchedRole.department,
      clearance: matchedRole.clearance,
      color: matchedRole.color,
      loginTime: new Date().toISOString()
    };
    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
  };

  const register = async ({ name, username, password, roleId }) => {
    return login({ username, password, roleId, customName: name });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const acknowledgeAlert = (alertId) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === alertId
          ? {
              ...a,
              status: 'Acknowledged',
              acknowledgedBy: user?.name || 'Authorized Engineer'
            }
          : a
      )
    );
  };

  const resolveAlert = (alertId) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, status: 'Resolved' } : a))
    );
  };

  const toggleTheme = () => setDarkMode((d) => !d);

  return (
    <AquaContext.Provider
      value={{
        user,
        nodes,
        leaks,
        alerts,
        setLeaks,
        lastUpdate,
        darkMode,
        toggleTheme,
        login,
        switchRole,
        register,
        logout,
        acknowledgeAlert,
        resolveAlert
      }}
    >
      {children}
    </AquaContext.Provider>
  );
}

export function useAqua() {
  const ctx = useContext(AquaContext);
  if (!ctx) {
    throw new Error('useAqua must be used inside AquaProvider');
  }
  return ctx;
}
