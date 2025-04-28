import React, { useState } from 'react';
import { createUser } from '../services/userService';

const AddUserComponent = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await createUser(userData);
      setSuccess('Utilisateur créé avec succès !');
      console.log('Réponse du serveur:', response);
      setUserData({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      });
    } catch (error) {
      setError(error.message || 'Erreur lors de la création de l’utilisateur.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Ajouter un utilisateur</h2>
      
      {/* Affichage des messages d'erreur ou de succès */}
      {error && <div style={styles.error}>{error}</div>}
      {success && <div style={styles.success}>{success}</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nom complet :</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            placeholder="Nom complet"
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email :</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            placeholder="Email"
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Mot de passe :</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            placeholder="Mot de passe"
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Confirmer le mot de passe :</label>
          <input
            type="password"
            name="password_confirmation"
            value={userData.password_confirmation}
            placeholder="Confirmer le mot de passe"
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.submitButton}>Créer l'utilisateur</button>
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
  error: {
    color: '#dc3545',
    textAlign: 'center',
    marginBottom: '20px',
  },
  success: {
    color: '#28a745',
    textAlign: 'center',
    marginBottom: '20px',
  },
};

export default AddUserComponent;
