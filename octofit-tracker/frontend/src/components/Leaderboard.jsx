import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (Array.isArray(data)) {
          setEntries(data);
        } else if (data && Array.isArray(data.results)) {
          setEntries(data.results);
        } else {
          setEntries([]);
        }
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard');
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Leaderboard</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <div className="list-group">
        {entries.map((entry) => (
          <div key={`${entry.rank}-${entry.userName}`} className="list-group-item d-flex justify-content-between align-items-center">
            <span>#{entry.rank} {entry.userName || entry.name}</span>
            <span className="badge bg-success">{entry.points} pts</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Leaderboard;
