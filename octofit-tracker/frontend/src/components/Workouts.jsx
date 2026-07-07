import { useEffect, useState } from 'react';

const API_ENDPOINT = "/api/workouts/";

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
        const API_BASE_URL = codespaceName
          ? `https://${codespaceName}-8000.app.github.dev`
          : 'http://localhost:8000';
        const url = `${API_BASE_URL}${API_ENDPOINT}`;
        const response = await fetch(url);
        const data = await response.json();

        if (Array.isArray(data)) {
          setWorkouts(data);
        } else if (data && Array.isArray(data.results)) {
          setWorkouts(data.results);
        } else {
          setWorkouts([]);
        }
      } catch (err) {
        setError(err.message || 'Unable to load workouts');
      }
    }

    loadWorkouts();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Workouts</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <div className="row g-3">
        {workouts.map((workout) => (
          <div key={workout._id || workout.id} className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h6">{workout.name}</h3>
                <p className="mb-2 text-muted">{workout.focus}</p>
                <p className="mb-0">{workout.difficulty} • {workout.duration} min</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Workouts;
