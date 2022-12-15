const transactionModel = require("../models/TransactionModel.js");
const Transaction = transactionModel;
const totalizersGeneric = require("../generics/TotalizersGeneric.js");
const Totalizers = totalizersGeneric;
const dashboardDto = require("../dtos/DashboardDto.js");
const Dashboard = dashboardDto;

const findData = async (_req, res) => {
    const date = new Date();
    const dateFormatYearMonth = date.getFullYear() + "-" + (date.getMonth() + 1);

    try {
        await getTotalTransactions(dateFormatYearMonth);
        await getTotalRevenues(dateFormatYearMonth);
        await getTotalExpenses(dateFormatYearMonth);
        await getBalance();

        await getDataByDay(dateFormatYearMonth);
        res.send(Dashboard);
    } catch (error) {
        res.status(500).send('Erro ao carregador dados do Dashboard: ' + error)
    }
};

async function getBalance() {
    Dashboard.totalizersByMonth.balance = Dashboard.totalizersByMonth.totalRevenues - Dashboard.totalizersByMonth.totalExpenses;
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
            Dashboard.totalizersByMonth.totalExpenses = res[0].amount;
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
            Dashboard.totalizersByMonth.totalRevenues = res[0].amount;
    });
}

async function getTotalTransactions(dateFormatYearMonth) {
    Dashboard.totalizersByMonth.totalTransactions = await Transaction.find({ yearMonth: dateFormatYearMonth }).countDocuments();
}

async function getDataByDay(dateFormatYearMonth) {
    await Transaction.aggregate([
        {
            $match: { 'yearMonth': dateFormatYearMonth },
        },
        {
            $group: 
            { 
                _id: { day: '$day', type: '$type' }, 
                amount: { $sum: "$value" }, 
                countTransaction: { $sum: 1 } 
            }
        },
        { 
            $sort: { _id: 1 } 
        }
    ]).then(res => {
        if (res.length > 0) {
            Dashboard.totalizersByDay = new Array();
            res.forEach(element => {
                let newTotalizers;
                let newDay = true;

                const indexDayFinded = Dashboard.totalizersByDay.findIndex(dash => dash.day === element._id.day);
                if (indexDayFinded > -1) {
                    newTotalizers = Dashboard.totalizersByDay[indexDayFinded];
                    newTotalizers.totalTransactions += element.countTransaction;
                    newDay = !newDay;
                } else {
                    newTotalizers = Totalizers.get();
                }

                if (element._id.type === "+") {
                    newTotalizers.totalRevenues = element.amount;
                } else {
                    newTotalizers.totalExpenses = element.amount;
                }
                newTotalizers.balance = newTotalizers.totalRevenues - newTotalizers.totalExpenses;

                if (newDay) {
                    newTotalizers.totalTransactions = element.countTransaction;
                    Dashboard.totalizersByDay.push({
                        day: element._id.day,
                        ...newTotalizers
                    });
                }
            });
        }
    });
}

module.exports = { findData };
