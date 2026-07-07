import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setActivities(data);
        } else if (data && Array.isArray(data.results)) {
          setActivities(data.results);
        } else {
          setActivities([]);
        }
      } catch (err) {
        setError(err.message || 'Unable to load activities');
      }
    }

    loadActivities();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Activities</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <div className="list-group">
        {activities.map((activity) => (
          <div key={activity._id || activity.id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h3 className="h6 mb-1">{activity.type}</h3>
                <p className="mb-0 text-muted">{activity.duration} min • {activity.calories} kcal</p>
              </div>
              <span className="badge bg-secondary">{activity.date ? new Date(activity.date).toLocaleDateString() : 'Recent'}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Activities;
