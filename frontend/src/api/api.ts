import axios from 'axios';

const API = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    'http://localhost:5000/api',
});

export function setAuthToken(token?: string | null) {
  if (token) API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete API.defaults.headers.common['Authorization'];
}

export async function getSweets() {
  const res = await API.get('/sweets');
  return res.data;
}

export async function createSweet(payload: { name: string; category: string; price: number; quantity?: number }) {
  const res = await API.post('/sweets', payload);
  return res.data;
}

export async function updateSweet(id: string, payload: Partial<{ name: string; category: string; price: number; quantity: number }>) {
  const res = await API.put(`/sweets/${id}`, payload);
  return res.data;
}

export async function deleteSweet(id: string) {
  const res = await API.delete(`/sweets/${id}`);
  return res.data;
}

export async function getSweetById(id: string) {
  const res = await API.get(`/sweets/${id}`);
  return res.data;
}

export async function restockSweet(id: string, amount: number) {
  const res = await API.post(`/sweets/${id}/restock`, { amount });
  return res.data;
}

export async function register(credentials: { username: string; password: string }) {
  const res = await API.post('/auth/register', credentials);
  return res.data;
}

export async function login(credentials: { username: string; password: string }) {
  const res = await API.post('/auth/login', credentials);
  return res.data;
}

export default API;