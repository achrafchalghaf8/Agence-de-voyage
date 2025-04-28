import axios from "axios";

const API_URL = "http://localhost:8000/api/destinations"; // URL de votre API Laravel

const getDestinations = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getDestinationById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const createDestination = async (destination) => {
  const response = await axios.post(API_URL, destination);
  return response.data;
};

const updateDestination = async (id, destination) => {
  const response = await axios.put(`${API_URL}/${id}`, destination);
  return response.data;
};

const deleteDestination = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export default {
  getDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
};
