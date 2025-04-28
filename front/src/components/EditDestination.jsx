import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import destinationService from "../services/destinationService";

const EditDestination = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    image: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const data = await destinationService.getDestinationById(id);
        setFormData({
          nom: data.nom,
          description: data.description,
          image: data.image || "",
        });
      } catch (error) {
        setMessage("Erreur lors du chargement des données.");
      }
    };
    fetchDestination();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await destinationService.updateDestination(id, formData);
      navigate("/");
    } catch (err) {
      setMessage("Erreur lors de la mise à jour de la destination.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Modifier une Destination</h1>
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
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>URL de l'image :</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.submitButton}>
          Mettre à jour
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
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

export default EditDestination;
