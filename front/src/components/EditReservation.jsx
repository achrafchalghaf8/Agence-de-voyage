import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import reservationService from "../services/reservationService";
import voyageService from "../services/voyageService";
import userService from "../services/userService";

const EditReservation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState({});
  const [voyages, setVoyages] = useState([]);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const data = await reservationService.getReservationById(id);
        setReservation(data);
      } catch (err) {
        setMessage("Réservation non trouvée.");
      }
    };

    const fetchData = async () => {
      try {
        const voyagesData = await voyageService.getVoyages();
        setVoyages(voyagesData);

        const usersData = await userService.getAllUsers();
        setUsers(usersData);
      } catch (error) {
        setMessage("Erreur lors du chargement des données.");
      }
    };

    fetchReservation();
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedReservation = await reservationService.updateReservation(id, reservation);
      setMessage(updatedReservation.message);
      navigate("/reservations");
    } catch (error) {
      setMessage("Erreur lors de la mise à jour de la réservation.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Modifier la Réservation</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Voyage :</label>
          <select
            value={reservation.idVoyage || ""}
            onChange={(e) => setReservation({ ...reservation, idVoyage: e.target.value })}
            required
            style={styles.input}
          >
            <option value="">Sélectionnez un voyage</option>
            {voyages.map((voyage) => (
              <option key={voyage.id} value={voyage.id}>
                {`${voyage.depart} → ${voyage.destination} (${voyage.datevoyage})`}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Utilisateur :</label>
          <select
            value={reservation.idUser || ""}
            onChange={(e) => setReservation({ ...reservation, idUser: e.target.value })}
            required
            style={styles.input}
          >
            <option value="">Sélectionnez un utilisateur</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nombre de places à réserver :</label>
          <input
            type="number"
            value={reservation.nbPlaceAReserver || ""}
            onChange={(e) => setReservation({ ...reservation, nbPlaceAReserver: e.target.value })}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.submitButton}>Mettre à jour</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#f8f9fa',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '2rem',
    color: '#343a40',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#343a40',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ced4da',
    backgroundColor: '#fff',
    fontSize: '1rem',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  message: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#28a745',
    fontWeight: 'bold',
  },
};

export default EditReservation;