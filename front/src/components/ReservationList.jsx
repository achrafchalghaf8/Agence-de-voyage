import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import reservationService from "../services/reservationService";
import voyageService from "../services/voyageService";
import userService from "../services/userService";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservationsWithDetails = async () => {
      try {
        const reservationData = await reservationService.getReservations();
        const voyageDetails = await voyageService.getVoyages();
        const userDetails = await userService.getAllUsers();

        const reservationsWithDetails = reservationData.map((reservation) => {
          const voyage = voyageDetails.find((v) => v.id === reservation.idVoyage);
          const user = userDetails.find((u) => u.id === reservation.idUser);

          return {
            ...reservation,
            destination: voyage?.destination || "Inconnu",
            datevoyage: voyage?.datevoyage || "Inconnu",
            depart: voyage?.depart || "Inconnu",
            userName: user?.name || "Utilisateur inconnu",
          };
        });

        setReservations(reservationsWithDetails);
        setFilteredReservations(reservationsWithDetails);
        setLoading(false);
      } catch (err) {
        setError("Impossible de charger les réservations, voyages ou utilisateurs.");
        setLoading(false);
      }
    };

    fetchReservationsWithDetails();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    const searchTerms = value.split(" ").filter((term) => term !== "");

    const filtered = reservations.filter((reservation) =>
      searchTerms.every((term) =>
        ["destination", "depart", "datevoyage", "userName", "nbPlaceAReserver"].some((key) =>
          reservation[key]?.toString().toLowerCase().includes(term)
        )
      )
    );

    setFilteredReservations(filtered);
  };

  if (loading) return <div style={styles.loading}>Chargement des réservations...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  return (
    <div style={styles.layout}>
      {/* Dashboard Section */}
      <div style={styles.dashboard}>
        <h2 style={styles.dashboardTitle}>Admin Dashboard</h2>
        <ul style={styles.dashboardMenu}>
          <li style={styles.menuItem} onClick={() => navigate("/add-reservation")}>
            Ajouter Réservation
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
            logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        <h1 style={styles.title}>Liste des Réservations</h1>
        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Rechercher par Destination, Départ, Date, Utilisateur..."
            value={search}
            onChange={handleSearch}
            style={styles.input}
          />
        </div>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Destination</th>
              <th style={styles.th}>Départ</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Utilisateur</th>
              <th style={styles.th}>Places Réservées</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.length > 0 ? (
              filteredReservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td style={styles.td}>{reservation.destination}</td>
                  <td style={styles.td}>{reservation.depart}</td>
                  <td style={styles.td}>{reservation.datevoyage}</td>
                  <td style={styles.td}>{reservation.userName}</td>
                  <td style={styles.td}>{reservation.nbPlaceAReserver}</td>
                  <td style={styles.td}>
                    <button style={styles.editButton} onClick={() => navigate(`/edit-reservation/${reservation.id}`)}>
                      Modifier
                    </button>
                    <button style={styles.deleteButton} onClick={() => handleDelete(reservation.id)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={styles.noResults}>
                  Aucune réservation trouvée.
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
    textAlign: "center",  },
  searchBar: {
    marginBottom: "20px",
    textAlign: "center",
  },
  input: {
    width: "80%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #dee2e6",
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
  editButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    marginRight: "5px",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
  },
  noResults: {
    color: "#6c757d",
    textAlign: "center",
    padding: "10px",
  },
  loading: {
    textAlign: "center",
    fontSize: "1.5rem",
  },
  error: {
    textAlign: "center",
    color: "#dc3545",
  },
};

export default ReservationList;
