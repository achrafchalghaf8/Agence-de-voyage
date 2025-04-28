import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import voyageService from "../services/voyageService";
import Navbar from "../Navbar";

const VoyageList = () => {
  const [voyages, setVoyages] = useState([]);
  const [filteredVoyages, setFilteredVoyages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVoyages = async () => {
      try {
        const data = await voyageService.getVoyages();
        setVoyages(data);
        setFilteredVoyages(data);
        setLoading(false);
      } catch (err) {
        setError("Impossible de charger les voyages.");
        setLoading(false);
      }
    };

    fetchVoyages();
  }, []);

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const keywords = searchValue.split(" ").filter((word) => word.length > 0);

    const filtered = voyages.filter((voyage) => {
      return keywords.every((keyword) =>
        Object.values(voyage).some((field) =>
          field?.toString().toLowerCase().includes(keyword)
        )
      );
    });

    setFilteredVoyages(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce voyage ?")) {
      try {
        await voyageService.deleteVoyage(id);
        const updatedVoyages = voyages.filter((voyage) => voyage.id !== id);
        setVoyages(updatedVoyages);
        setFilteredVoyages(updatedVoyages);
        alert("Voyage supprimé avec succès !");
      } catch (err) {
        alert("Erreur lors de la suppression du voyage.");
      }
    }
  };

  if (loading) {
    return <div style={styles.loading}>Chargement des voyages...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <div style={styles.layout}>
      {/* Dashboard */}
      <div style={styles.dashboard}>
        <h2 style={styles.dashboardTitle}>Admin Dashboard</h2>
        <ul style={styles.dashboardMenu}>
          <li style={styles.menuItem} onClick={() => navigate("/add-voyage")}>
            Ajouter Voyage
          </li>
          <li style={styles.menuItem} onClick={() => navigate("/reservations")}>
            Reservations
          </li>         
          <li style={styles.menuItem} onClick={() => navigate("/users")}>
            Users
          </li>  
          <li style={styles.menuItem} onClick={() => navigate("/destinations")}>
            destinations
          </li>        
          <li style={styles.menuItem} onClick={() => navigate("/logout")}>
            Logout
          </li>    </ul>
      </div>

      {/* Main Content */}
      <div style={styles.container}>
        <h1 style={styles.title}>Gestion des Voyages</h1>

        {/* Barre de recherche */}
        <div style={styles.searchBar}>
          <input
            type="text"
            style={styles.searchInput}
            placeholder="Rechercher par plusieurs critères..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Tableau des voyages */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Prix par place (€)</th>
              <th style={styles.th}>Nombre de places</th>
              <th style={styles.th}>Départ</th>
              <th style={styles.th}>Destination</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVoyages.length > 0 ? (
              filteredVoyages.map((voyage) => (
                <tr key={voyage.id}>
                  <td style={styles.td}>{voyage.datevoyage}</td>
                  <td style={styles.td}>{voyage.prixplace}</td>
                  <td style={styles.td}>{voyage.nbplacetotal}</td>
                  <td style={styles.td}>{voyage.depart}</td>
                  <td style={styles.td}>{voyage.destination}</td>
                  <td style={styles.td}>
                    <button
                      style={styles.modifyButton}
                      onClick={() => navigate(`/update-voyage/${voyage.id}`)}
                    >
                      Modifier
                    </button>
                    <button
                      style={styles.deleteButton}
                      onClick={() => handleDelete(voyage.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={styles.noResults}>
                  Aucun voyage correspondant trouvé.
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
  },
  dashboard: {
    width: "250px",
    backgroundColor: "#343a40",
    color: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },
  dashboardTitle: {
    marginBottom: "20px",
    fontSize: "1.5rem",
    textAlign: "center",
  },
  dashboardMenu: {
    listStyle: "none",
    padding: 0,
  },
  menuItem: {
    marginBottom: "10px",
    cursor: "pointer",
    padding: "10px",
    backgroundColor: "#495057",
    borderRadius: "5px",
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: "20px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "2rem",
    color: "#343a40",
    fontWeight: "bold",
  },
  searchBar: {
    marginBottom: "20px",
  },
  searchInput: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ced4da",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
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
  },
  modifyButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "5px",
  },
};

export default VoyageList;
