// services/api.js
import axios from 'axios';

const API_KEY = '30c7bbbcce8c4fe898cdeb45b3d1abd7';
const BASE_URL = 'https://api.rawg.io/api';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

export const getGames = async (params = {}) => {
  try {
    const response = await api.get('/games', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
};

export const getGameDetails = async (id) => {
  try {
    const response = await api.get(`/games/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching game ${id}:`, error);
    throw error;
  }
};

export const getGameScreenshots = async (id) => {
  try {
    const response = await api.get(`/games/${id}/screenshots`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching screenshots for game ${id}:`, error);
    throw error;
  }
};

export const searchGames = async (query) => {
  try {
    const response = await api.get('/games', { 
      params: { 
        search: query,
        page_size: 20
      } 
    });
    return response.data;
  } catch (error) {
    console.error('Error searching games:', error);
    throw error;
  }
};