import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import destinationService from "../services/destinationService";

const DestinationList = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await destinationService.getDestinations();
        setDestinations(data);
        setFilteredDestinations(data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des destinations.");
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette destination ?")) {
      try {
        await destinationService.deleteDestination(id);
        setFilteredDestinations(filteredDestinations.filter((dest) => dest.id !== id));
      } catch (err) {
        setError("Erreur lors de la suppression de la destination.");
      }
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = destinations.filter((destination) =>
      ["nom", "description"].some((key) =>
        destination[key]?.toString().toLowerCase().includes(value)
      )
    );
    setFilteredDestinations(filtered);
  };

  if (loading) {
    return <div style={styles.loading}>Chargement des destinations...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <div style={styles.layout}>
      {/* Dashboard Section */}
      <div style={styles.dashboard}>
        <h2 style={styles.dashboardTitle}>Admin Dashboard</h2>
        <ul style={styles.dashboardMenu}>
          <li style={styles.menuItem} onClick={() => navigate("/add-destination")}>
            Ajouter Destination
          </li>
          <li style={styles.menuItem} onClick={() => navigate("/voyages")}>
            Voyages
          </li>
          <li style={styles.menuItem} onClick={() => navigate("/users")}>
            Utilisateurs
          </li>
          <li style={styles.menuItem} onClick={() => navigate("/reservations")}>
          Reservations
          </li>
          
          <li style={styles.menuItem} onClick={() => navigate("/logout")}>
            Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        <h1 style={styles.title}>Liste des Destinations</h1>

        {/* Barre de recherche */}
        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Rechercher par nom ou description"
            value={search}
            onChange={handleSearch}
            style={styles.input}
          />
        </div>

        {/* Tableau des destinations */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Image</th>
              <th style={styles.th}>Nom</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDestinations.length > 0 ? (
              filteredDestinations.map((destination) => (
                <tr key={destination.id}>
                  <td style={styles.td}>
                    <img
                      src={destination.image}
                      alt={destination.nom}
                      style={styles.image}
                    />
                  </td>
                  <td style={styles.td}>{destination.nom}</td>
                  <td style={styles.td}>{destination.description}</td>
                  <td style={styles.td}>
                    <button
                      style={styles.editButton}
                      onClick={() => navigate(`/edit-destination/${destination.id}`)}
                    >
                      Modifier
                    </button>
                    <button
                      style={styles.deleteButton}
                      onClick={() => handleDelete(destination.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={styles.noResults}>
                  Aucune destination trouvée.
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
    transition: "background-color 0.3s",
  },
  menuItemHover: {
    backgroundColor: "#007bff",
  },
  content: {
    flex: 1,
    padding: "20px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "2rem",
    color: "#343a40",
    fontWeight: "bold",
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
  image: {
    width: "100px",
    height: "auto",
    borderRadius: "5px",
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
  loading: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "1.5rem",
  },
  error: {
    textAlign: "center",
    marginTop: "20px",
    color: "#dc3545",
    fontSize: "1.2rem",
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

export default DestinationList;
