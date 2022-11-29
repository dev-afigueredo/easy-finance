const express = require('express');
const controller = require('../controllers/transactionController.js');
const transactionRouter = express.Router();

transactionRouter.get('', controller.findAll);
transactionRouter.get('/findById', controller.findById);
transactionRouter.get('/dates', controller.findAllDates);
transactionRouter.post('/create', controller.create);
transactionRouter.put('/edit', controller.edit);
transactionRouter.delete('/remove', controller.remove);

module.exports = transactionRouter;
