import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Pipeline3DCanvas from '../components/Pipeline3DCanvas';

export default function Initial3DModelPage() {
  const navigate = useNavigate();
  const [isSliding, setIsSliding] = useState(false);

  const handleEnterPortal = useCallback(() => {
    if (isSliding) return;
    setIsSliding(true);
    setTimeout(() => {
      navigate('/login');
    }, 650);
  }, [isSliding, navigate]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleEnterPortal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleEnterPortal]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        userSelect: 'none',
        background: '#0f172a',
        cursor: 'pointer',
        transform: isSliding ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 650ms cubic-bezier(0.76, 0, 0.24, 1)',
        zIndex: 9999
      }}
    >
      {/* Full-Screen Interactive 3D WebGL Road & Internal Pipeline Model (Click Anywhere -> /login) */}
      <Pipeline3DCanvas onModelClick={handleEnterPortal} />

      {/* Subtle Radial Vignette (matching nexus-nurture-lake.vercel.app) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(circle at center, transparent 62%, rgba(2, 6, 23, 0.5) 100%)',
          zIndex: 10
        }}
      />

      {/* ONLY "AQUA SAVIOUR" WRITTEN OVER THE 3D MODEL */}
      <div
        onClick={handleEnterPortal}
        style={{
          position: 'relative',
          zIndex: 20,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none'
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(1.85rem, 4vw, 3.25rem)',
            fontWeight: 900,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: '#ffffff',
            textAlign: 'center',
            margin: 0,
            padding: '0 16px',
            textShadow:
              '0 0 28px rgba(56, 189, 248, 0.65), 0 0 60px rgba(2, 132, 199, 0.45), 0 4px 20px rgba(0, 0, 0, 0.9)'
          }}
        >
          AQUA SAVIOUR
        </h1>
      </div>
    </div>
  );
}
