const { Transaction } = require('../database/models/transaction')
const Queue = require('../lib/Queue')


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

        await Queue.add(transaction);

        return res.status(201).json({message: 'Transaction created!', data: transaction});
    }

    async list(req, res) {
        const transactions = await Transaction.findAll();
        return res.status(200).json({message: 'Query Successfullly!', data: transactions})
    }

    async getByCnpj(req, res) {
        const cnpj = req.params.cnpj
        
        const transactions = await Transaction.findAll({where: {cnpj_seller: cnpj}})

        return res.status(200).json({message: 'Query successfully', data: transactions})
    }

    async deleteById(req, res) {
        const { id } = req.params;

        const deleted = await Transaction.destroy({where: {transaction_id: id}})

        if (deleted) {
            return res.status(200).json({message: 'Deleted'})
        }
        return res.status(404).json({error: 'transaction not found'})
    }

}

module.exports = { TransactionController };