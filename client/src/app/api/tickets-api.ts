import axios from 'axios';

const API_URL = 'http://localhost:4200/api';

export const getTickets = () => {
  return axios.get(`${API_URL}/tickets`);
};

export const getSingleTicket = (id: number) => {
  return axios.get(`${API_URL}/tickets/${id}`);
};

export const getUsers = () => {
  return axios.get(`${API_URL}/users`);
};

export const getSingleUser = (ticketId: number) => {
  return axios.get(`${API_URL}/users/${ticketId}`);
};

export const createTicket = (description: string) => {
  const param = { description: description };
  return axios.post(`${API_URL}/tickets`, param);
};

export const assignTicket = (ticketId: number, userId: number) => {
  return axios.put(`${API_URL}/tickets/${ticketId}/assign/${userId}`);
};

export const unAssignTicket = (ticketId: number) => {
  return axios.put(`${API_URL}/tickets/${ticketId}/unassign`);
};

export const completeTicket = (ticketId: number) => {
  return axios.put(`${API_URL}/tickets/${ticketId}/complete`);
};

export const incompleteTicket = (ticketId: number) => {
  return axios.delete(`${API_URL}/tickets/${ticketId}/complete`);
};
