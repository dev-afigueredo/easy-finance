const transactionModel = require('../models/TransactionModel.js');
const Transaction = transactionModel;

const create = async (req, res) => {
  const newdata = new Transaction({
    description: req.body.description,
    value: req.body.value,
    category: req.body.category,
    year: req.body.year,
    month: req.body.month,
    day: req.body.day,
    yearMonth: req.body.yearMonth,
    yearMonthDay: req.body.yearMonthDay,
    type: req.body.type,
  });
  try {
    const data = await newdata.save();
    console.log(data);
    res.send({ message: 'Transação inserida com sucesso' });
  } catch (err) {
    console.log(newdata);
    res
      .status(500)
      .send({ message: err.message || 'Algum erro ocorreu ao salvar' });
  }
};

const findAll = async (req, res) => {
  const { filter, period } = req.query;
  const conditionFilter = filter
    ? { yearMonth: period, description: { $regex: new RegExp(filter), $options: 'i' } }
    : { yearMonth: period };
  try {
    if (!period) {
      res
        .status(400)
        .send("PERIODO NAO INFORMADO, SEGUE FORMATO PERMITIDO '?period=yyyy-mm'");
      return;
    }
    const data = await Transaction.find(conditionFilter).sort({ "day": 1 });
    res.send(data);
  } catch (error) {
    res
      .status(500)
      .send('Erro ao listar: ' + error);
  }
};

const findAllDates = async (req, res) => {
  try {
    const data = await Transaction.aggregate([
      {
        '$group': {
          '_id': '$yearMonth'
        }
      }
    ]).sort({ _id: 1 });
    res.send(data);
  } catch (error) {
    res
      .status(500)
      .send('Erro ao listar: ' + error);
  }
};

const findById = async (req, res) => {
  const { id } = req.query;
  try {
    const data = await Transaction.findOne({ _id: id });
    if (!data) {
      res.send('Transação não localizada para "' + id);
    } else {
      res.send(data);
    }
  } catch (err) {
    res.status(500).send({ message: 'Erro ao buscar transações' });
  }
};

const edit = async (req, res) => {
  const { id, value } = req.query;
  try {
    const data = await Transaction.findByIdAndUpdate({ _id: id },
      {
        "$set": { "value": value }
      },
      {
        new: true, upsert: true
      });
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: 'Erro ao atualizar a trabsação de id: ' + id });
  }
};

const remove = async (req, res) => {
  const id = req.query.id;
  try {
    const data = await Transaction.findByIdAndDelete({ _id: id });
    res.send("Transaction excluído com sucesso");
  } catch (err) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Transaction id: ' + id });
  }
};

module.exports = { create, findAll, findAllDates, findById, edit, remove };
