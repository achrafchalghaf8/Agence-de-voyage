// src/services/userService.js
import axios from 'axios';

// Base URL de votre API Laravel
const API_URL = 'http://localhost:8000/api/users';

// Récupérer tous les utilisateurs
export const getAllUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs', error);
    throw error;
  }
};

export const getUserById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur', error.response?.data || error.message);
      throw error.response?.data || { message: 'Erreur inconnue' };
    }
  };

export const createUser = async (userData) => {
    try {
      const response = await axios.post(API_URL, userData);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error.response?.data || error.message);
      throw error.response?.data || { message: "Erreur inconnue" };
    }
  };
  
  export const updateUser = async (id, userData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur', error.response?.data || error.message);
      throw error.response?.data || { message: 'Erreur inconnue' };
    }
  };
// Supprimer un utilisateur
export const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur', error.response?.data || error.message);
      throw error.response?.data || { message: 'Erreur inconnue' };
    }
  };
  export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  };
  
