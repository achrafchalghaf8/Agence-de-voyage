import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById, updateUser } from '../services/userService';

const EditUserComponent = () => {
  const { id } = useParams(); // ID récupéré depuis l'URL
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(id);
        setUser({
          ...userData,
          password: '',
          password_confirmation: '',
        }); // Ne pas pré-remplir le mot de passe
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de l'utilisateur", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Filtrer les champs nécessaires
    const filteredData = {
      name: user.name,
      email: user.email,
      ...(user.password && { password: user.password }),
      ...(user.password_confirmation && { password_confirmation: user.password_confirmation }),
    };

    try {
      await updateUser(id, filteredData);
      alert('Utilisateur mis à jour avec succès!');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur', error.response?.data || error.message);
      alert('Erreur lors de la mise à jour de l\'utilisateur');
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Modifier l'utilisateur</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nom :</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email :</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Mot de passe :</label>
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Confirmer le mot de passe :</label>
          <input
            type="password"
            value={user.password_confirmation}
            onChange={(e) =>
              setUser({ ...user, password_confirmation: e.target.value })
            }
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
};

export default EditUserComponent;
