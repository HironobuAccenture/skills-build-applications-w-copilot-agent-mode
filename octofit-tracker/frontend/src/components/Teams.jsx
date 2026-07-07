import { useEffect, useState } from 'react';

const API_ENDPOINT = "/api/teams/";

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
        const API_BASE_URL = codespaceName
          ? `https://${codespaceName}-8000.app.github.dev`
          : 'http://localhost:8000';
        const url = `${API_BASE_URL}${API_ENDPOINT}`;
        const response = await fetch(url);
        const data = await response.json();

        if (Array.isArray(data)) {
          setTeams(data);
        } else if (data && Array.isArray(data.results)) {
          setTeams(data.results);
        } else {
          setTeams([]);
        }
      } catch (err) {
        setError(err.message || 'Unable to load teams');
      }
    }

    loadTeams();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Teams</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <div className="row g-3">
        {teams.map((team) => (
          <div key={team._id || team.id} className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h6">{team.name}</h3>
                <p className="mb-2 text-muted">{team.goal}</p>
                <p className="mb-0">Members: {team.members}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Teams;
