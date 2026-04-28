import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, CheckCircle, ShieldAlert, Clock, DollarSign, Layers, Plus, Trash2 } from 'lucide-react';

export default function TaskDetails({ user, tasks, bids, onAddBid }) {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const task = tasks.find(t => (t._id || t.id) === taskId);
  
  const [amount, setAmount] = useState('');
  const [proposal, setProposal] = useState('');
  const [milestones, setMilestones] = useState([{ id: 1, title: '', amount: '' }]);
  const [taskBids, setTaskBids] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (taskId) {
      fetchBids();
    }
  }, [taskId]);

  const fetchBids = async () => {
    try {
      const res = await fetch(`${API_URL}/api/tasks/${taskId}/bids`);
      const data = await res.json();
      setTaskBids(data);
    } catch (err) {
      console.error("Error fetching bids:", err);
      setTaskBids(bids.filter(b => b.task_id === taskId)); // Fallback to prop
    }
  };

  if (!task) return <div className="p-8 text-center">Task not found</div>;

  const handleAddMilestone = () => {
    setMilestones([...milestones, { id: Date.now(), title: '', amount: '' }]);
  };

  const handleRemoveMilestone = (id) => {
    if (milestones.length > 1) {
      setMilestones(milestones.filter(m => m.id !== id));
    }
  };

  const handleMilestoneChange = (id, field, value) => {
    setMilestones(milestones.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const bidValue = Number(amount);
    if (!bidValue || !proposal) return;

    const newBid = {
      id: `b-${Date.now()}`,
      task_id: taskId,
      developer_id: user.id,
      amount: bidValue,
      proposal,
      milestones,
      status: 'pending'
    };
    onAddBid(newBid);
    fetchBids(); // Refresh local list
    navigate('/dashboard');
  };

  const isClient = user.role === 'client';
  // const taskBids = bids.filter(b => b.task_id === taskId); // Replaced by local state
  const myBid = taskBids.find(b => b.task_id === taskId && b.developer_id === user.id);

  const panelStyle = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-xl)',
    padding: '1.75rem',
    position: 'relative',
    overflow: 'hidden'
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '4rem' }}>
      <button onClick={() => navigate('/dashboard')} className="btn btn-outline" style={{ marginBottom: '1.5rem', fontSize: '0.85rem' }}>
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div className="grid md:grid-cols-3 gap-6 items-start">
        
        {/* Left Column: Task Details */}
        <div className="md:col-span-2 flex flex-col gap-6">
          
          <div style={panelStyle}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, lineHeight: 1.2 }}>{task.title}</h1>
              <span className={`badge ${task.status === 'open' ? 'badge-info' : 'badge-success'}`} style={{ padding: '0.4rem 0.8rem' }}>
                {task.status.toUpperCase()}
              </span>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <DollarSign size={18} style={{ color: 'var(--accent-success)' }} />
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.02em' }}>BUDGET</div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>${task.budget}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={18} style={{ color: 'var(--accent-warning)' }} />
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.02em' }}>DEADLINE</div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{task.deadline}</div>
                </div>
              </div>
            </div>

            <div style={{ whiteSpace: 'pre-wrap', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
              {task.description}
            </div>
          </div>

          {!isClient && !myBid && (
            <div style={panelStyle}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, var(--accent-success), var(--accent-cyan))' }} />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Send size={20} className="text-accent-success" /> Submit Your Proposal
              </h2>
              
              <form onSubmit={handleBidSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '1.5rem' }}>
                  <div className="input-group">
                    <label className="input-label">YOUR BID (USD)</label>
                    <input type="number" className="input-control" placeholder="0" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                  </div>
                  <div className="input-group">
                    <label className="input-label">PROPOSAL SUMMARY</label>
                    <input type="text" className="input-control" placeholder="How will you achieve this?" value={proposal} onChange={(e) => setProposal(e.target.value)} required />
                  </div>
                </div>

                <div style={{ background: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Layers size={16} className="text-accent-primary" /> Work Breakdown (WBS Milestones)
                    </h3>
                    <button type="button" onClick={handleAddMilestone} className="btn btn-outline" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}>
                      <Plus size={14} /> Add Milestone
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {milestones.map((m, idx) => (
                      <div key={m.id} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 120px 40px', gap: '0.75rem', alignItems: 'center' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>M{idx+1}</div>
                        <input type="text" className="input-control" placeholder="Phase name..." value={m.title} onChange={(e) => handleMilestoneChange(m.id, 'title', e.target.value)} required />
                        <input type="number" className="input-control" placeholder="$" value={m.amount} onChange={(e) => handleMilestoneChange(m.id, 'amount', e.target.value)} required />
                        <button type="button" onClick={() => handleRemoveMilestone(m.id)} style={{ background: 'none', border: 'none', color: 'var(--accent-danger)', cursor: 'pointer', opacity: milestones.length > 1 ? 0.6 : 0.2 }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ height: '48px', fontSize: '1rem' }}>
                  Submit Professional Bid
                </button>
              </form>
            </div>
          )}

          {myBid && (
            <div style={{ ...panelStyle, background: 'rgba(34, 197, 94, 0.05)', borderColor: 'rgba(34, 197, 94, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle size={32} className="text-accent-success" />
                <div>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Proposal Submitted Successfully</h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Your bid of <strong className="text-accent-success">${myBid.amount}</strong> is now pending review.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={panelStyle}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>PROJECT STATS</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total Bids</span>
                <span className="badge badge-info">{taskBids.length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Avg. Estimate</span>
                <span style={{ fontWeight: 600 }}>${taskBids.length ? Math.round(taskBids.reduce((a,b) => a+b.amount, 0)/taskBids.length) : task.budget}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Status</span>
                <span style={{ color: 'var(--accent-success)', fontWeight: 600, fontSize: '0.8rem' }}>LIVE</span>
              </div>
            </div>
          </div>

          <div style={{ ...panelStyle, background: 'rgba(99, 102, 241, 0.03)' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldAlert size={18} className="text-accent-primary" /> Scope Guarantee
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              This platform enforces explicit scope boundaries. Ensure your bid addresses the "WHY" and "WHAT" sections to minimize misunderstandings.
            </p>
          </div>

          {isClient && taskBids.length > 0 && (
            <div style={panelStyle}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem' }}>Received Bids</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {taskBids.map(b => (
                  <div key={b.id} style={{ padding: '0.75rem', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Dev #{b.developer_id.slice(-4)}</span>
                      <span style={{ color: 'var(--accent-success)', fontWeight: 700 }}>${b.amount}</span>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{b.proposal}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
