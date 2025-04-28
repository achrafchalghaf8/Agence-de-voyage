import React, { useState } from "react";
import voyageService from "../services/voyageService";

const AddVoyage = () => {
  const [voyage, setVoyage] = useState({
    datevoyage: "",
    prixplace: "",
    nbplacetotal: "",
    depart: "",
    destination: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVoyage({ ...voyage, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await voyageService.createVoyage(voyage);
      alert("Voyage créé avec succès !");
    } catch (error) {
      alert("Erreur lors de la création du voyage.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Ajouter un Voyage</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Date du voyage :</label>
          <input
            type="date"
            name="datevoyage"
            value={voyage.datevoyage}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Prix par place :</label>
          <input
            type="number"
            name="prixplace"
            value={voyage.prixplace}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nombre de places :</label>
          <input
            type="number"
            name="nbplacetotal"
            value={voyage.nbplacetotal}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Départ :</label>
          <input
            type="text"
            name="depart"
            value={voyage.depart}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Destination :</label>
          <input
            type="text"
            name="destination"
            value={voyage.destination}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.submitButton}>Créer</button>
      </form>
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
};

export default AddVoyage;
