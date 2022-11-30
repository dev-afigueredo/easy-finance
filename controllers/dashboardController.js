const transactionModel = require("../models/TransactionModel.js");
const dashboardDto = require("../dtos/DashboardDto.js");
const Transaction = transactionModel;

const findData = async (req, res) => {
    const date = new Date();
    const dateFormatYearMonth = date.getFullYear() + "-" + (date.getMonth() + 1);

    try { 
        await getTotalTransactions(dateFormatYearMonth);
        await getTotalRevenues(dateFormatYearMonth);
        await getTotalExpenses(dateFormatYearMonth);
        await getBalance();
        res.send(dashboardDto);
    } catch (error) {
        res.status(500).send('Erro ao carregador dados do dashboard: ' + error)
    }
};

async function getBalance() {
    dashboardDto.balance = dashboardDto.totalRevenues - dashboardDto.totalExpenses;
}

async function getTotalExpenses(dateFormatYearMonth) {
    await Transaction.aggregate([
        {
            $match: { 'yearMonth': dateFormatYearMonth, 'type': '-' },
        },
        {
            $group: { _id: null, amount: { $sum: "$value" } }
        }
    ]).then(res => {
        if (res.length > 0)
            dashboardDto.totalExpenses = res[0].amount;
    });
}

async function getTotalRevenues(dateFormatYearMonth) {
    await Transaction.aggregate([
        {
            $match: { 'yearMonth': dateFormatYearMonth, 'type': '+' },
        },
        {
            $group: { _id: null, amount: { $sum: "$value" } }
        }
    ]).then(res => {
        if (res.length > 0)
            dashboardDto.totalRevenues = res[0].amount;
    });
}

async function getTotalTransactions(dateFormatYearMonth) {
    dashboardDto.totalTransactions = await Transaction.find({ yearMonth: dateFormatYearMonth }).countDocuments();
}

module.exports = { findData };

