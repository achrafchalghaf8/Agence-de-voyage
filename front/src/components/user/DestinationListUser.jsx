import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import destinationService from "../../services/destinationService";

const DestinationListUser = () => {
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

        {/* Affichage sous forme de cartes */}
        <div style={styles.cardsContainer}>
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((destination) => (
              <div key={destination.id} style={styles.card}>
                <img
                  src={destination.image}
                  alt={destination.nom}
                  style={styles.cardImage}
                />
                <h3 style={styles.cardTitle}>{destination.nom}</h3>
                <p style={styles.cardDescription}>{destination.description}</p>
                <div style={styles.cardActions}>
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
                </div>
              </div>
            ))
          ) : (
            <div style={styles.noResults}>
              Aucune destination trouvée.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    flexDirection: "column",
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
  cardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  },
  card: {
    width: "250px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    textAlign: "center",
    padding: "10px",
  },
  cardImage: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
  },
  cardTitle: {
    fontSize: "1.5rem",
    marginTop: "10px",
    color: "#343a40",
  },
  cardDescription: {
    fontSize: "1rem",
    color: "#6c757d",
    marginTop: "10px",
  },
  cardActions: {
    marginTop: "10px",
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
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  noResults: {
    textAlign: "center",
    color: "#6c757d",
    padding: "10px",
    fontSize: "1rem",
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
};

export default DestinationListUser;
