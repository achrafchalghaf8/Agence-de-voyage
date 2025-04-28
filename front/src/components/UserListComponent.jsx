import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, deleteUser } from '../services/userService';

const UserListComponent = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersData = await getAllUsers();
      setUsers(usersData);
      setFilteredUsers(usersData); // Initial filter with all users
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await deleteUser(id);
        alert('Utilisateur supprimé avec succès');
        fetchUsers(); // Reload the list after deletion
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur', error);
        alert('Erreur lors de la suppression de l\'utilisateur');
      }
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    // Split the search query by spaces to handle multiple search terms
    const searchTerms = value.split(' ').filter(term => term);

    const filtered = users.filter((user) =>
      searchTerms.every((term) =>
        // Check if any attribute contains the search term
        Object.keys(user).some((key) =>
          user[key] && user[key].toString().toLowerCase().includes(term)
        )
      )
    );

    setFilteredUsers(filtered);
  };

  return (
    <div style={styles.layout}>
      {/* Dashboard Section */}
      <div style={styles.dashboard}>
        <h2 style={styles.dashboardTitle}>Admin Dashboard</h2>
        <ul style={styles.dashboardMenu}>
          <li style={styles.menuItem} onClick={() => navigate("/add-user")}>
            Ajouter Utilisateur
          </li>
          <li style={styles.menuItem} onClick={() => navigate("/voyages")}>
            Voyages
          </li>
          <li style={styles.menuItem} onClick={() => navigate("/users")}>
            Utilisateurs
          </li>
          <li style={styles.menuItem} onClick={() => navigate("/destinations")}>
            Destinations
          </li>
          <li style={styles.menuItem} onClick={() => navigate("/logout")}>
            Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        <h1 style={styles.title}>Liste des Utilisateurs</h1>

        {/* Search Bar */}
        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Rechercher par ID, Nom ou Email"
            value={search}
            onChange={handleSearch}
            style={styles.input}
          />
        </div>

        {/* Users Table */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Nom</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td style={styles.td}>{user.id}</td>
                  <td style={styles.td}>{user.name}</td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>
                    <button
                      style={styles.editButton}
                      onClick={() => navigate(`/edit-user/${user.id}`)}
                    >
                      Modifier
                    </button>
                    <button
                      style={styles.deleteButton}
                      onClick={() => handleDelete(user.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={styles.noResults}>
                  Aucune utilisateur trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
  },
  dashboard: {
    width: "250px",
    backgroundColor: "#343a40",
    color: "#fff",
    padding: "20px",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
  },
  dashboardTitle: {
    fontSize: "1.5rem",
    marginBottom: "20px",
  },
  dashboardMenu: {
    listStyleType: "none",
    padding: 0,
  },
  menuItem: {
    padding: "10px",
    cursor: "pointer",
    borderRadius: "5px",
    marginBottom: "10px",
    backgroundColor: "#495057",
    color: "#fff",
    textAlign: "center",
  },
  content: {
    flex: 1,
    padding: "20px",
  },
  title: {
    fontSize: "2rem",
    color: "#343a40",
    marginBottom: "20px",
    textAlign: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  th: {
    backgroundColor: "#343a40",
    color: "#fff",
    padding: "10px",
    textAlign: "center",
  },
  td: {
    padding: "10px",
    textAlign: "center",
    border: "1px solid #dee2e6",
  },
  noResults: {
    textAlign: "center",
    color: "#6c757d",
    padding: "10px",
    fontSize: "1rem",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "5px",
  },
  editButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "5px",
  },
  searchBar: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  input: {
    width: "80%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #dee2e6",
  },
};

export default UserListComponent;
