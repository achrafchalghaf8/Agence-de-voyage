import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import destinationService from "../services/destinationService";

const AddDestination = () => {
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    image: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("nom", formData.nom);
    form.append("description", formData.description);
    form.append("image", formData.image);

    try {
      await destinationService.createDestination(form);
      navigate("/destinations");
    } catch (err) {
      console.error("Erreur lors de l'ajout de la destination", err);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Ajouter une Destination</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nom :</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Description :</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{ ...styles.input, minHeight: "100px" }}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Image (URL ou chemin) :</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.submitButton}>
          Ajouter
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#f8f9fa",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "2rem",
    color: "#343a40",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#343a40",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ced4da",
    backgroundColor: "#fff",
    fontSize: "1rem",
  },
  submitButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
  },
};

export default AddDestination;
