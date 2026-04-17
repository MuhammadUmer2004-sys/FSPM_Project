import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, User, Briefcase, Zap } from 'lucide-react';

export default function Login({ onLogin }) {
  const [role, setRole] = useState('developer');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const mockUser = {
      id: `u-${Date.now()}`,
      name: name.trim(),
      role: role,
      avatar: null
    };
    onLogin(mockUser);
    navigate('/dashboard');
  };

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      minHeight: 'calc(100vh - 64px)', padding: '2rem'
    }} className="animate-fade-in">

      {/* Background glow */}
      <div style={{
        position: 'fixed', top: '30%', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0
      }} />

      <div style={{
        width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1
      }}>
        {/* Logo mark */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.02em'
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #6366f1, #a78bfa)',
              borderRadius: '8px', padding: '4px 8px', fontSize: '0.95rem'
            }}>
              <Zap size={16} color="#fff" />
            </span>
            <span style={{ background: 'linear-gradient(135deg, #6366f1, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Freelance</span>Flow
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.4rem' }}>Project Bidding Platform</p>
        </div>

        {/* Card */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-2xl)',
          padding: '2rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Top accent line */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
            background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), transparent)'
          }} />

          <div style={{ marginBottom: '1.75rem' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.25rem' }}>Sign In</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Choose your role and enter your name to continue.</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Role selector */}
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.6rem', letterSpacing: '0.02em' }}>
                SELECT ROLE
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {[
                  { value: 'developer', icon: <User size={20} />, label: 'Developer', desc: 'Browse & bid' },
                  { value: 'client', icon: <Briefcase size={20} />, label: 'Client', desc: 'Post tasks' }
                ].map(r => (
                  <div
                    key={r.value}
                    onClick={() => setRole(r.value)}
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-lg)',
                      border: `1px solid ${role === r.value ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                      background: role === r.value ? 'rgba(99,102,241,0.08)' : 'var(--bg-elevated)',
                      cursor: 'pointer',
                      transition: 'all 200ms ease',
                      textAlign: 'center',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem'
                    }}
                  >
                    <span style={{ color: role === r.value ? 'var(--accent-primary)' : 'var(--text-muted)' }}>
                      {r.icon}
                    </span>
                    <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{r.label}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{r.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Name input */}
            <div>
              <label htmlFor="name" style={{ fontSize: '0.78rem', fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.6rem', letterSpacing: '0.02em' }}>
                FULL NAME
              </label>
              <input
                id="name"
                type="text"
                className="input-control"
                placeholder="e.g. John Doe"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                style={{ fontSize: '0.9rem' }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              <LogIn size={16} /> Enter Platform
            </button>
          </form>

          <p style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Demo mode — no password required. Role determines your access level.
          </p>
        </div>
      </div>
    </div>
  );
}
