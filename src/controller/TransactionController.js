const { createTransaction, deleteTransaction, listTransactions } = require('../service/transactionService')
const Queue = require('../lib/Queue');
const { BaseError } = require('../error/BaseError');


class TransactionController {

    async store(req, res) {
        const body = req.body;
        const transaction = await createTransaction(body);
        await Queue.add(transaction);
        return res.status(201).json({message: 'Transaction created!', data: transaction});
    }

    async list(req, res) {
        const transactions = await listTransactions();
        return res.status(200).json({message: 'Query Successfullly!', data: transactions})
    }

    async getByCnpj(req, res) {
        const cnpj = req.params.cnpj
        
        const transactions = await listTransactions({cnpj_seller: cnpj})

        return res.status(200).json({message: 'Query successfully', data: transactions})
    }

    async deleteById(req, res, next) {
        try {
            const { id } = req.params;

            const deleted = await deleteTransaction(id)

            if (!deleted) {
                throw new BaseError(404, 'Transaction not found');
            }
            
            return res.status(204).json({message: 'Deleted'})

        } catch (error) {
            next(error);
        }
    }
        

}

module.exports = { TransactionController };