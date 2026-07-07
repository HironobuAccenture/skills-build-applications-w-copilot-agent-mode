import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-lg border-0">
            <div className="card-body p-5">
              <h1 className="display-5 fw-bold mb-3">OctoFit Tracker</h1>
              <p className="lead text-muted mb-4">
                A modern multi-tier fitness tracking experience for teams, progress, and motivation.
              </p>
              <div className="alert alert-info" role="status">
                Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces URLs. If it is unset, the app falls back to localhost.
              </div>
              <nav className="nav flex-wrap gap-2 mb-4">
                <Link className="btn btn-outline-primary" to="/">Home</Link>
                <Link className="btn btn-outline-primary" to="/users">Users</Link>
                <Link className="btn btn-outline-primary" to="/teams">Teams</Link>
                <Link className="btn btn-outline-primary" to="/activities">Activities</Link>
                <Link className="btn btn-outline-primary" to="/leaderboard">Leaderboard</Link>
                <Link className="btn btn-outline-primary" to="/workouts">Workouts</Link>
              </nav>
              <Routes>
                <Route path="/" element={<div className="d-flex gap-3 flex-wrap"><span className="badge bg-primary-subtle text-primary-emphasis">React 19</span><span className="badge bg-success-subtle text-success-emphasis">Vite</span><span className="badge bg-info-subtle text-info-emphasis">Express + MongoDB</span></div>} />
                <Route path="/users" element={<Users />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/workouts" element={<Workouts />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
