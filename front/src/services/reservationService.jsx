import axios from "axios";

const API_URL = "http://localhost:8000/api/reservations";

// Obtenir toutes les réservations
const getReservations = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtenir une réservation par ID
const getReservationById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Créer une nouvelle réservation
const createReservation = async (reservation) => {
  try {
    const response = await axios.post(API_URL, reservation);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Mettre à jour une réservation
const updateReservation = async (id, reservation) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, reservation);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Supprimer une réservation
const deleteReservation = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  getReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
};
