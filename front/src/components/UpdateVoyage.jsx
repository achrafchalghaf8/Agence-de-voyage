import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import voyageService from '../services/voyageService';

const UpdateVoyage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [voyage, setVoyage] = useState({
    datevoyage: '',
    prixplace: '',
    nbplacetotal: '',
    depart: '',
    destination: '',
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVoyage = async () => {
      try {
        const data = await voyageService.getVoyageById(id);
        if (!data) {
          setMessage('Le voyage avec cet ID n\'existe pas.');
        } else {
          setVoyage({
            datevoyage: data.datevoyage ? new Date(data.datevoyage).toISOString().split('T')[0] : '',
            prixplace: data.prixplace || '',
            nbplacetotal: data.nbplacetotal || '',
            depart: data.depart || '',
            destination: data.destination || '',
          });
        }
        setIsLoading(false);
      } catch (error) {
        setMessage('Erreur lors de la récupération du voyage.');
        setIsLoading(false);
      }
    };

    fetchVoyage();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVoyage((prevVoyage) => ({
      ...prevVoyage,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await voyageService.updateVoyage(id, voyage);
      setMessage('Voyage mis à jour avec succès !');
      navigate('/voyages'); // Redirection après mise à jour
    } catch (error) {
      setMessage('Erreur lors de la mise à jour du voyage.');
    }
  };

  if (isLoading) return <p>Chargement...</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Modifier le Voyage</h1>
      {message && <p style={styles.message}>{message}</p>}
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
        <button type="submit" style={styles.submitButton}>Mettre à jour</button>
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
  message: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#28a745',
    fontWeight: 'bold',
  },
};

export default UpdateVoyage;
