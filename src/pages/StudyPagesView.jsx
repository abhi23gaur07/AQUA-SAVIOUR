import React, { useState } from 'react';
import { BookOpen, CheckCircle2 } from 'lucide-react';
import AppShell from '../components/AppShell';
import { FOUR_PAGES_STUDY } from '../data/aquaData';

export default function StudyPagesView() {
  const [activePage, setActivePage] = useState(0);
  const page = FOUR_PAGES_STUDY[activePage];

  return (
    <AppShell>
      <div className="flex items-center justify-between flex-wrap gap-md">
        <div>
          <span className="badge badge-info">4-PAGE SYSTEM ARCHITECTURE STUDY</span>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 900, marginTop: '4px' }}>
            AQUA SAVIOUR Complete 4-Page Technical Study &amp; Prototype Reference
          </h1>
        </div>

        <div className="flex items-center gap-xs">
          {FOUR_PAGES_STUDY.map((p, idx) => (
            <button
              key={p.pageNumber}
              type="button"
              onClick={() => setActivePage(idx)}
              className={`btn btn-sm ${
                activePage === idx ? 'btn-primary' : 'btn-secondary'
              }`}
            >
              Page {p.pageNumber}
            </button>
          ))}
        </div>
      </div>

      <div className="split-two-col">
        <div className="card" style={{ padding: '14px' }}>
          <img
            src={page.image}
            alt={page.title}
            style={{
              width: '100%',
              borderRadius: '10px',
              border: '1px solid var(--border)',
              display: 'block'
            }}
          />
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <span className="badge badge-ai">{page.badge}</span>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 900, marginTop: '6px' }}>
              Page {page.pageNumber}: {page.title}
            </h2>
            <p className="text-xs text-muted" style={{ marginTop: '2px' }}>
              {page.subtitle}
            </p>
          </div>

          <p className="text-sm text-secondary" style={{ lineHeight: 1.6 }}>
            {page.problemStatement}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {page.pathwaySteps.map((st) => (
              <div
                key={st.step}
                style={{
                  background: 'var(--bg)',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  borderLeft: '3px solid var(--primary)',
                  fontSize: '0.8rem'
                }}
              >
                <strong>
                  {st.step} — {st.name}:
                </strong>{' '}
                <span className="text-secondary">{st.desc}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-xs flex-wrap">
            {page.impacts.map((imp) => (
              <span
                key={imp}
                className="badge badge-L0"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <CheckCircle2 size={11} />
                <span>{imp}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

