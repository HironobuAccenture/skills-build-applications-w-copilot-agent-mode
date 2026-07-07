import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setUsers(data);
        } else if (data && Array.isArray(data.results)) {
          setUsers(data.results);
        } else {
          setUsers([]);
        }
      } catch (err) {
        setError(err.message || 'Unable to load users');
      }
    }

    loadUsers();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Users</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <div className="list-group">
        {users.map((user) => (
          <div key={user._id || user.id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h3 className="h6 mb-1">{user.name}</h3>
                <p className="mb-1 text-muted">{user.email}</p>
              </div>
              <span className="badge bg-primary">{user.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Users;
