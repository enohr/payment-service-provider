const { Transaction } = require('../database/models/transaction')


const createTransaction = function(body) {
    const creditCardNumber = body.card_digits;
    const lastDigitsCard = creditCardNumber.slice(creditCardNumber.length - 4);
    
    const transaction = {
        ...body,
        card_last_digits: lastDigitsCard
    }

    delete transaction.card_digits

    return Transaction.create(transaction);
}

const listTransactions = function(expression) {
    return Transaction.findAll(expression ? {where: expression} : {});
}

const deleteTransaction = function(id) {
    return Transaction.destroy({where: {transaction_id: id}});
}

module.exports = {
    createTransaction,
    listTransactions,
    deleteTransaction
}
