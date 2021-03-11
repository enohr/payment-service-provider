const { createTransaction, deleteTransaction, listTransactions } = require('../service/transactionService')
const Queue = require('../lib/Queue')


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

    async deleteById(req, res) {
        try {
            const { id } = req.params;

            const deleted = await deleteTransaction(id)

            if (deleted) {
                return res.status(200).json({message: 'Deleted'})
            }
            return res.status(404).json({error: 'transaction not found'})
        } catch (error) {
            throw new Error(error.message);
        }
    }
        

}

module.exports = { TransactionController };