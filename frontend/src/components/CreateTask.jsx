import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, ArrowLeft, Calculator, ChevronRight } from 'lucide-react';

const SectionLabel = ({ number, label, sublabel }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
    <div style={{
      width: 28, height: 28, borderRadius: '50%',
      background: 'var(--accent-primary-dim)', border: '1px solid rgba(99,102,241,0.2)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-primary)', flexShrink: 0
    }}>{number}</div>
    <div>
      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{label}</div>
      {sublabel && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{sublabel}</div>}
    </div>
  </div>
);

export default function CreateTask({ user, onAdd }) {
  const [title, setTitle] = useState('');
  const [whyDev, setWhyDev] = useState('');
  const [whatDone, setWhatDone] = useState('');
  const [whenDeadline, setWhenDeadline] = useState('');
  const [whoResponsible, setWhoResponsible] = useState('');
  const [whereLocated, setWhereLocated] = useState('');
  const [howDone, setHowDone] = useState('');
  const [howMuchRes, setHowMuchRes] = useState('');
  const [inScope, setInScope] = useState('');
  const [outOfScope, setOutOfScope] = useState('');
  const [numFeatures, setNumFeatures] = useState(3);
  const [complexity, setComplexity] = useState('medium');
  const [suggestedBudget, setSuggestedBudget] = useState(0);
  const [budget, setBudget] = useState('');
  const [deadline, setDeadline] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const multiplier = { simple: 0.8, medium: 1.2, complex: 2.0 }[complexity] || 1;
    setSuggestedBudget(Math.round(numFeatures * 150 * multiplier));
  }, [numFeatures, complexity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: `t-${Date.now()}`,
      title,
      description: `[WHY] ${whyDev}\n\n[WHAT] ${whatDone}\n\n[WHEN] ${whenDeadline}\n\n[WHO] ${whoResponsible}\n\n[WHERE] ${whereLocated}\n\n[HOW] ${howDone}\n\n[HOW MUCH] ${howMuchRes}\n\n[IN-SCOPE]\n${inScope}\n\n[OUT-OF-SCOPE]\n${outOfScope}`,
      budget: Number(budget),
      deadline,
      client_id: user.id,
      status: 'open'
    };
    onAdd(newTask);
    navigate('/dashboard');
  };

  const panelStyle = {
    background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-xl)', padding: '1.5rem', position: 'relative', overflow: 'hidden'
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '780px', margin: '0 auto' }}>
      <button onClick={() => navigate('/dashboard')} className="btn btn-outline" style={{ marginBottom: '1.25rem', fontSize: '0.82rem' }}>
        <ArrowLeft size={14} /> Dashboard
      </button>

      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Post a New Project</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.83rem' }}>
          Define scope boundaries and apply W5HH principles to attract quality bids.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        {/* Section 1: Title & W5HH */}
        <div style={panelStyle}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--accent-primary), transparent)' }} />
          <SectionLabel number="1" label="W5HH Definition" sublabel="Standard Software Project Management principles" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <input type="text" className="input-control" placeholder="Project title (e.g. React Performance Optimization)" value={title} onChange={e => setTitle(e.target.value)} required />
            <div className="grid md:grid-cols-2 gap-3">
              <textarea className="input-control" placeholder="WHY — Business justification. Why is this system needed?" value={whyDev} onChange={e => setWhyDev(e.target.value)} required style={{ minHeight: '72px' }} />
              <textarea className="input-control" placeholder="WHAT — Deliverables. What will be built and handed over?" value={whatDone} onChange={e => setWhatDone(e.target.value)} required style={{ minHeight: '72px' }} />
              <textarea className="input-control" placeholder="WHEN — Milestones. When will it be accomplished?" value={whenDeadline} onChange={e => setWhenDeadline(e.target.value)} required style={{ minHeight: '72px' }} />
              <textarea className="input-control" placeholder="WHO — Roles. Who is responsible for each function?" value={whoResponsible} onChange={e => setWhoResponsible(e.target.value)} required style={{ minHeight: '72px' }} />
              <textarea className="input-control" placeholder="WHERE — Logistics. Where are they located physically?" value={whereLocated} onChange={e => setWhereLocated(e.target.value)} required style={{ minHeight: '72px' }} />
              <textarea className="input-control" placeholder="HOW — Technical approach. How will the job be done?" value={howDone} onChange={e => setHowDone(e.target.value)} required style={{ minHeight: '72px' }} />
            </div>
            <textarea className="input-control" placeholder="HOW MUCH — Resource estimation. How much of each resource is needed?" value={howMuchRes} onChange={e => setHowMuchRes(e.target.value)} required style={{ minHeight: '72px' }} />
          </div>
        </div>

        {/* Section 2: Scope Boundaries */}
        <div style={panelStyle}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--accent-success), transparent)' }} />
          <SectionLabel number="2" label="Scope Boundaries" sublabel="Prevent scope creep by defining explicit inclusions and exclusions" />
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-success)', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>
                ✓ IN-SCOPE
              </label>
              <textarea className="input-control" placeholder="List what the developer must build. Be specific." value={inScope} onChange={e => setInScope(e.target.value)} required style={{ minHeight: '110px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-danger)', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>
                ✗ OUT-OF-SCOPE
              </label>
              <textarea className="input-control" placeholder="List what will NOT be paid for (e.g. server costs, payments)." value={outOfScope} onChange={e => setOutOfScope(e.target.value)} required style={{ minHeight: '110px' }} />
            </div>
          </div>
        </div>

        {/* Section 3: COCOMO Estimator */}
        <div style={panelStyle}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--accent-warning), transparent)' }} />
          <SectionLabel number="3" label="COCOMO-Lite Estimator" sublabel="Get a budget suggestion based on feature count & complexity" />
          <div className="grid md:grid-cols-3 gap-4" style={{ alignItems: 'end' }}>
            <div>
              <label className="input-label">Feature Count</label>
              <input type="number" min="1" className="input-control" value={numFeatures} onChange={e => setNumFeatures(Number(e.target.value))} />
            </div>
            <div>
              <label className="input-label">Complexity</label>
              <select className="input-control" value={complexity} onChange={e => setComplexity(e.target.value)}>
                <option value="simple">Simple (×0.8)</option>
                <option value="medium">Medium (×1.2)</option>
                <option value="complex">Complex (×2.0)</option>
              </select>
            </div>
            <div style={{
              textAlign: 'center', padding: '0.75rem',
              background: 'rgba(34, 197, 94, 0.06)', border: '1px solid rgba(34, 197, 94, 0.15)',
              borderRadius: 'var(--radius-lg)'
            }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Suggested</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-success)', lineHeight: 1 }}>${suggestedBudget}</div>
            </div>
          </div>
          <button type="button" onClick={() => setBudget(suggestedBudget.toString())} style={{
            marginTop: '0.9rem', width: '100%', padding: '0.55rem',
            background: 'transparent', border: '1px dashed var(--border-medium)',
            borderRadius: 'var(--radius-lg)', color: 'var(--text-muted)', fontSize: '0.8rem',
            cursor: 'pointer', transition: 'all 200ms ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem'
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.color = 'var(--accent-primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-medium)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
          >
            <Calculator size={13} /> Apply Suggested Budget
          </button>
        </div>

        {/* Section 4: Budget & Deadline */}
        <div style={panelStyle}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--accent-secondary), transparent)' }} />
          <SectionLabel number="4" label="Timeline & Budget" sublabel="Set your final agreed budget and project deadline" />
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Final Budget (USD)</label>
              <input type="number" className="input-control" value={budget} onChange={e => setBudget(e.target.value)} placeholder="0" required />
            </div>
            <div>
              <label className="input-label">Target Deadline</label>
              <input type="date" className="input-control" value={deadline} onChange={e => setDeadline(e.target.value)} required />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ padding: '0.9rem', fontSize: '0.95rem', width: '100%' }}>
          <PlusCircle size={18} /> Publish Project
          <ChevronRight size={16} style={{ marginLeft: '0.25rem' }} />
        </button>
      </form>
    </div>
  );
}
