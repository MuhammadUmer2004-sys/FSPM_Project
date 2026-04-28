import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { LayoutDashboard, LogIn, Home, PlusCircle, LogOut, Briefcase, FileSignature, ShieldAlert } from 'lucide-react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import CreateTask from './components/CreateTask';
import TaskDetails from './components/TaskDetails';

// Mock DB
const MOCK_USER = {
  id: 'u1',
  name: 'Alex Developer',
  role: 'developer', // or 'client'
  avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
};

const initialTasks = [
  { id: 't1', title: 'React Performance Optimization', description: 'Need an expert to fix severe React render cycle bottlenecks.', budget: 1500, deadline: '2026-05-01', client_id: 'c1', status: 'open' },
  { id: 't2', title: 'Figma to MVP Next.js Dashboard', description: 'Convert my Figma designs into a fully functioning Next.js MVP dashboard. No backend needed, just JSON mockups.', budget: 3000, deadline: '2026-05-15', client_id: 'c2', status: 'open' },
];

const initialBids = [
  { id: 'b1', task_id: 't1', developer_id: 'u1', amount: 1200, proposal: 'I can fix your re-renders using useMemo and Context decoupling.', status: 'pending' }
];

export default function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Load user from local storage
  useEffect(() => {
    const savedUser = localStorage.getItem('freelanceFlowUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch Tasks
      const tasksRes = await fetch(`${API_URL}/api/tasks`);
      const tasksData = await tasksRes.json();
      
      // Fetch Bids (Assuming we want all bids for the dashboard stats)
      // Since there is no "get all bids" endpoint, we fetch bids for each task 
      // or we can just rely on the fact that when we visit a task details page we fetch them.
      // For the dashboard, we'll try to fetch all bids if we had an endpoint.
      // For now, let's just use the tasks we have.
      setTasks(tasksData.length > 0 ? tasksData : initialTasks);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setTasks(initialTasks); // Fallback to mock data
      setLoading(false);
    }
  };

  const loginUser = (userData) => {
    localStorage.setItem('freelanceFlowUser', JSON.stringify(userData));
    setUser(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem('freelanceFlowUser');
    setUser(null);
  };

  const addTask = async (task) => {
    try {
      const res = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });
      const newTask = await res.json();
      setTasks(prev => [newTask, ...prev]);
    } catch (err) {
      console.error("Error adding task:", err);
      setTasks(prev => [task, ...prev]); // Fallback to local update
    }
  };

  const addBid = async (bid) => {
    try {
      const res = await fetch(`${API_URL}/api/bids`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bid)
      });
      const newBid = await res.json();
      setBids(prev => [newBid, ...prev]);
    } catch (err) {
      console.error("Error adding bid:", err);
      setBids(prev => [bid, ...prev]); // Fallback to local update
    }
  };

  return (
    <Router>
      <nav className="navbar">
        <div className="container flex items-center justify-between" style={{ width: '100%' }}>
          <Link to="/" className="flex items-center gap-2" style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            <span className="text-gradient">Freelance</span>Flow
          </Link>
          
          <div className="flex items-center gap-6">
            {!user && <Link to="/" className="text-secondary text-sm font-medium transition-fast" style={{ opacity: 0.8 }}>How it Works</Link>}
            {user ? (
              <>
                <Link to="/dashboard" className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                  <LayoutDashboard size={16} /> <span className="md-visible">Dashboard</span>
                </Link>
                <div className="flex items-center gap-3" style={{ padding: '0 0.5rem', borderLeft: '1px solid var(--border-subtle)' }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 'var(--radius-md)',
                    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.72rem', fontWeight: 800, color: '#fff',
                    flexShrink: 0, boxShadow: 'var(--shadow-glow-sm)'
                  }}>
                    {user.name ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : 'U'}
                  </div>
                  <span className="text-sm font-semibold text-primary" style={{ letterSpacing: '0.01em' }}>{user.name.split(' ')[0]}</span>
                  <button onClick={logoutUser} className="btn-icon" style={{ 
                    background: 'none', border: 'none', color: 'var(--text-muted)', 
                    cursor: 'pointer', display: 'flex', padding: '4px' 
                  }} title="Sign Out">
                    <LogOut size={18} />
                  </button>
                </div>
              </>
            ) : (
              <Link to="/login" className="btn btn-primary" style={{ padding: '0.55rem 1.25rem' }}>
                <LogIn size={16} /> Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      <main className="main-content">
        <div className="container">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login onLogin={loginUser} />} />
            <Route path="/dashboard" element={
              user ? <Dashboard user={user} tasks={tasks} bids={bids} /> : <Navigate to="/login" />
            } />
            <Route path="/create-task" element={
              user?.role === 'client' ? <CreateTask user={user} onAdd={addTask} /> : <Navigate to="/dashboard" replace />
            } />
            <Route path="/task/:taskId" element={
              user ? <TaskDetails user={user} tasks={tasks} bids={bids} onAddBid={addBid} /> : <Navigate to="/login" replace />
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}
