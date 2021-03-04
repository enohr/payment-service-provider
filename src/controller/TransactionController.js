const { Transaction } = require('../database/models/transaction')

class TransactionController {

    async store(req, res) {
        const creditCardNumber = req.body.card_digits;
        const lastDigitsCard = creditCardNumber.slice(creditCardNumber.length - 4);
        
        delete req.body.card_digits
        const user = {
            ...req.body,
            card_last_digits: lastDigitsCard
        }

        const transaction = await Transaction.create(user);
        return res.status(201).json({message: 'Transaction created!'});
    }

    async list(req,res) {
        const transactions = await Transaction.findAll();
        return res.json({message: 'Successfuly!', data: transactions})
    }

}

module.exports = { TransactionController };