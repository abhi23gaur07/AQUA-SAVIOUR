import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AquaProvider, useAqua } from './context/AquaContext';
import Initial3DModelPage from './pages/Initial3DModelPage';
import LoginPortalPage from './pages/LoginPortalPage';
import LiveMapDashboardPage from './pages/LiveMapDashboardPage';
import GisRealtimePage from './pages/GisRealtimePage';
import HydroMoistureMapPage from './pages/HydroMoistureMapPage';
import NodesDataPage from './pages/NodesDataPage';
import NodeDetailPage from './pages/NodeDetailPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ReportPage from './pages/ReportPage';
import ServerStatusPage from './pages/ServerStatusPage';
import AlertsPage from './pages/AlertsPage';
import StudyPagesView from './pages/StudyPagesView';

function ProtectedRoute({ children }) {
  const { user } = useAqua();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <AquaProvider>
      <BrowserRouter>
        <Routes>
          {/* 1. Initial Page: Full-Screen 3D Model with only AQUA SAVIOUR on it (Click anywhere -> /login) */}
          <Route path="/" element={<Initial3DModelPage />} />
          <Route path="/model-3d" element={<Initial3DModelPage />} />

          {/* 2. Role-Based Login & Portal Option Selector */}
          <Route path="/login" element={<LoginPortalPage />} />
          <Route path="/register" element={<LoginPortalPage />} />

          {/* 3. Dedicated Separate Portals (Each option opens its own dedicated portal page) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <LiveMapDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gis-realtime"
            element={
              <ProtectedRoute>
                <GisRealtimePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hydro-moisture"
            element={
              <ProtectedRoute>
                <HydroMoistureMapPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/nodes"
            element={
              <ProtectedRoute>
                <NodesDataPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/detail/:nodeId"
            element={
              <ProtectedRoute>
                <NodeDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <ReportPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/server"
            element={
              <ProtectedRoute>
                <ServerStatusPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alerts"
            element={
              <ProtectedRoute>
                <AlertsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/study"
            element={
              <ProtectedRoute>
                <StudyPagesView />
              </ProtectedRoute>
            }
          />

          <Route path="/map" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AquaProvider>
  );
}
