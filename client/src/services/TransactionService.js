import http from '../http-common';

const getAllDates = () => {
  return http.get('/api/transaction/dates');
};

const getListTransactions = (period, filter) => {
  return http.get(`/api/transaction?period=${period}&filter=${filter}`);
};

const edit = (id, value) => {
  return http.put(`/api/transaction/edit?id=${id}&value=${value}`);
};

const getTransaction = (id) => {
  return http.get(`/api/transaction/findById?id=${id}`);
};

const create = (data) => {
  return http.post('/api/transaction/create', data);
};

const remove = (id) => {
  return http.delete(`/api/transaction/remove?id=${id}`);
};

export default {
  getListTransactions,
  getTransaction,
  getAllDates,
  create,
  edit,
  remove
};
