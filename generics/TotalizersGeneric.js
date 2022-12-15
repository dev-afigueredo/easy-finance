class TotalizersGeneric {
    totalTransactions;
    totalExpenses;
    totalRevenues;
    balance;

    constructor() {
        this.totalTransactions = 0;
        this.totalExpenses = 0;
        this.totalRevenues = 0;
        this.balance = 0;
    }

    get() {
        return new TotalizersGeneric();
    }
}

module.exports = new TotalizersGeneric;