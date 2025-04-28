import axios from "axios";

const API_URL = "http://localhost:8000/api/voyages"; // URL de l'API backend Laravel

// Récupérer tous les voyages
const getVoyages = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des voyages", error);
    throw error;
  }
};



// Obtenir une réservation par ID
const getVoyageById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Créer un nouveau voyage
const createVoyage = async (voyage) => {
  try {
    const response = await axios.post(API_URL, voyage);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création du voyage", error);
    throw error;
  }
};



const updateVoyage = async (id, voyage) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, voyage);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Supprimer un voyage
const deleteVoyage = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la suppression du voyage avec l'ID ${id}`, error);
    throw error;
  }
};

export default {
  getVoyages,
  getVoyageById,
  createVoyage,
  updateVoyage,
  deleteVoyage,
};
