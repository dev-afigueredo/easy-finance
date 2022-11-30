const express = require('express');
const transactionController = require('../controllers/transactionController.js');
const dashboardController = require('../controllers/dashboardController.js');
const easyFinanceRouter = express.Router();

easyFinanceRouter.get('/transaction', transactionController.findAll);
easyFinanceRouter.get('/transaction/findById', transactionController.findById);
easyFinanceRouter.get('/transaction/dates', transactionController.findAllDates);
easyFinanceRouter.post('/transaction/create', transactionController.create);
easyFinanceRouter.put('/transaction/edit', transactionController.edit);
easyFinanceRouter.delete('/transaction/remove', transactionController.remove);

easyFinanceRouter.get('/dashboard', dashboardController.findData);

module.exports = easyFinanceRouter;
