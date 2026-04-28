import { Link } from 'react-router-dom';
import { PlusCircle, FileText, CheckCircle, Clock, TrendingUp, ShieldCheck, Layers, ArrowUpRight } from 'lucide-react';

export default function Dashboard({ user, tasks, bids }) {
  if (!user) return null;
  const isClient = user.role === 'client';

  const clientTasks = tasks.filter(t => t.client_id === user.id);
  const openTasks = tasks.filter(t => t.status === 'open');
  const developerBids = bids.filter(b => b.developer_id === user.id);

  const displayTasks = isClient ? clientTasks : openTasks;
  const totalBids = isClient
    ? bids.filter(b => clientTasks.some(ct => ct.id === b.task_id)).length
    : developerBids.length;

  const initials = user.name ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : 'U';

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

      {/* ── Welcome Header ── */}
      <div style={{
        padding: '1.75rem 2rem',
        borderRadius: 'var(--radius-xl)',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '1rem',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Accent line at top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), transparent)' }} />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: 48, height: 48, borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, var(--accent-primary), #7c3aed)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.95rem', fontWeight: 700, color: '#fff', flexShrink: 0,
            boxShadow: '0 0 20px rgba(99,102,241,0.2)'
          }}>
            {initials}
          </div>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, lineHeight: 1.3 }}>
              Welcome back, {user.name}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '0.15rem' }}>
              {isClient ? 'Client Workspace' : 'Developer Portal'} · {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </p>
          </div>
        </div>

        {isClient && (
          <Link to="/create-task" className="btn btn-primary" style={{ padding: '0.65rem 1.25rem' }}>
            <PlusCircle size={16} /> New Task
          </Link>
        )}
      </div>

      {/* ── Stats Row ── */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { icon: <FileText size={20} />, value: isClient ? clientTasks.length : openTasks.length, label: isClient ? 'Tasks Posted' : 'Open Tasks', color: 'var(--accent-primary)', bg: 'var(--accent-primary-dim)' },
          { icon: <Clock size={20} />, value: totalBids, label: isClient ? 'Bids Received' : 'Bids Submitted', color: 'var(--accent-warning)', bg: 'var(--accent-warning-dim)' },
          { icon: <CheckCircle size={20} />, value: 0, label: 'Completed', color: 'var(--accent-success)', bg: 'var(--accent-success-dim)' },
        ].map((s, i) => (
          <div key={i} style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.25rem 1.5rem',
            display: 'flex', alignItems: 'center', gap: '1rem',
            transition: 'all 250ms ease'
          }}>
            <div style={{
              width: 42, height: 42, borderRadius: 'var(--radius-lg)',
              background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: s.color, flexShrink: 0
            }}>
              {s.icon}
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1 }}>{s.value}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.2rem' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── SPM Feature Badges ── */}
      <div style={{
        display: 'flex', gap: '0.75rem', flexWrap: 'wrap',
        padding: '1rem 1.25rem',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)'
      }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 500, display: 'flex', alignItems: 'center', marginRight: '0.5rem' }}>SPM Features:</span>
        {[
          { icon: <ShieldCheck size={13} />, label: 'Scope Boundaries', color: 'var(--accent-primary)' },
          { icon: <TrendingUp size={13} />, label: 'COCOMO Estimation', color: 'var(--accent-warning)' },
          { icon: <Layers size={13} />, label: 'WBS Phased Bids', color: 'var(--accent-success)' },
        ].map(f => (
          <span key={f.label} style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
            fontSize: '0.72rem', fontWeight: 500,
            padding: '0.3rem 0.7rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border-light)',
            color: f.color
          }}>
            {f.icon} {f.label}
          </span>
        ))}
      </div>

      {/* ── Task List ── */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600 }}>
            {isClient ? 'Your Tasks' : 'Available Tasks'}
          </h2>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
            {displayTasks.length} {displayTasks.length === 1 ? 'task' : 'tasks'}
          </span>
        </div>

        {displayTasks.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '3rem 2rem',
            background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)'
          }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
              {isClient ? "You haven't posted any tasks yet." : 'No open tasks right now.'}
            </p>
            {isClient && (
              <Link to="/create-task" className="btn btn-primary">
                <PlusCircle size={16} /> Post Your First Task
              </Link>
            )}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
            {displayTasks.map(task => {
              const taskBids = bids.filter(b => b.task_id === task.id);
              const myBid = developerBids.find(b => b.task_id === task.id);
              return (
                <div key={task.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', zIndex: 1 }}>
                    <span className={`badge ${task.status === 'open' ? 'badge-info' : 'badge-success'}`}>
                      {task.status}
                    </span>
                  </div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', paddingRight: '4.5rem', lineHeight: 1.4 }}>{task.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {task.description}
                    </p>
                  </div>

                  <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--text-secondary)', position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Budget</span>
                      <span style={{ color: 'var(--accent-success)', fontWeight: 600 }}>${task.budget}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Deadline</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{task.deadline}</span>
                    </div>
                    {isClient && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Bids</span>
                        <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{taskBids.length}</span>
                      </div>
                    )}
                    {!isClient && myBid && (
                      <div style={{ 
                        color: myBid.status === 'approved' ? 'var(--accent-success)' : 'var(--accent-warning)', 
                        fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.25rem',
                        fontSize: '0.75rem'
                      }}>
                        {myBid.status === 'approved' ? <CheckCircle size={12} /> : <Clock size={12} />}
                        Bid: ${myBid.amount} ({myBid.status})
                      </div>
                    )}
                  </div>

                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', position: 'relative', zIndex: 1 }}>
                    <Link to={`/task/${task.id}`} className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem' }}>
                      {isClient ? 'View Bids' : 'View & Bid'} <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
