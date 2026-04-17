import { Link } from 'react-router-dom';
import { ArrowRight, Code, Users, Handshake, AlertTriangle, Sparkles, Shield, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="animate-fade-in">
      {/* ── Hero Section ── */}
      <section style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center',
        padding: '5rem 0 4rem', gap: '1.5rem', position: 'relative'
      }}>
        {/* Decorative glow orb */}
        <div style={{
          position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)',
          width: '500px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.1) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0
        }} />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <div className="badge badge-info" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.9rem' }}>
            <span style={{ position: 'relative', display: 'inline-flex', height: '6px', width: '6px' }}>
              <span className="animate-ping" style={{ position: 'absolute', display: 'inline-flex', height: '100%', width: '100%', borderRadius: '50%', backgroundColor: 'var(--accent-primary)', opacity: 0.6 }}></span>
              <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '50%', height: '6px', width: '6px', backgroundColor: 'var(--accent-primary)' }}></span>
            </span>
            v1.0 — Live
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, maxWidth: '700px', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            The Bidding Platform for{' '}
            <span className="text-gradient">Top-Tier Talent</span>
          </h1>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '520px', lineHeight: 1.7 }}>
            Post tasks with clear scope boundaries. Receive milestone-based bids. Select the optimal developer — all in one place.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/login" className="btn btn-primary" style={{ padding: '0.8rem 2rem', fontSize: '1rem' }}>
              Get Started <ArrowRight size={18} />
            </Link>
            <a href="#scope" className="btn btn-secondary" style={{ padding: '0.8rem 2rem', fontSize: '1rem' }}>
              View Project Scope
            </a>
          </div>
        </div>
      </section>

      {/* ── Scope Disclaimer ── */}
      <section id="scope" style={{ maxWidth: '680px', margin: '0 auto 3rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <div style={{ flexShrink: 0, marginTop: '2px' }}>
            <AlertTriangle size={22} style={{ color: 'var(--accent-warning)' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem' }}>Scope Boundary Notice</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.65 }}>
              Per the project management plan, <strong style={{ color: 'var(--text-primary)' }}>payment processing, escrow services, and real-time chat</strong> are explicitly out-of-scope. This platform focuses solely on task posting, bidding, and scope management.
            </p>
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.25rem',
        padding: '0 0 5rem'
      }}>
        {[
          {
            icon: <Users size={24} />,
            gradient: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(99,102,241,0.03))',
            borderColor: 'rgba(99,102,241,0.15)',
            iconColor: 'var(--accent-primary)',
            title: 'Client Workspaces',
            desc: 'Formulate tasks with W5HH structure, explicit budgets, and scope boundaries to attract qualified bids.'
          },
          {
            icon: <Code size={24} />,
            gradient: 'linear-gradient(135deg, rgba(167,139,250,0.12), rgba(167,139,250,0.03))',
            borderColor: 'rgba(167,139,250,0.15)',
            iconColor: 'var(--accent-secondary)',
            title: 'Developer Bidding',
            desc: 'Browse open tasks, submit WBS milestone-based proposals, and demonstrate your execution strategy.'
          },
          {
            icon: <Shield size={24} />,
            gradient: 'linear-gradient(135deg, rgba(34,197,94,0.12), rgba(34,197,94,0.03))',
            borderColor: 'rgba(34,197,94,0.15)',
            iconColor: 'var(--accent-success)',
            title: 'Scope Protection',
            desc: 'Every project has explicit In-Scope / Out-of-Scope fields — preventing scope creep by design.'
          }
        ].map(f => (
          <div key={f.title} style={{
            background: f.gradient,
            border: `1px solid ${f.borderColor}`,
            borderRadius: 'var(--radius-xl)',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            transition: 'all 250ms ease',
            cursor: 'default'
          }}>
            <div style={{ color: f.iconColor }}>{f.icon}</div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{f.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.65 }}>{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
