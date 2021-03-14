const { createTransaction, deleteTransaction, listTransactions } = require('../service/transactionService')
const Queue = require('../lib/Queue');
const { BaseError } = require('../error/BaseError');


class TransactionController {

    validateRequest(req, res, next) {
        try {
            const {
                transaction_description,
                transaction_price,
                cnpj_seller,
                payment_method,
                card_digits,
                card_owner_name,
                card_valid_date,
                cvv 
            } 
            = req.body;

            if (!transaction_description || transaction_description.length <= 0 || typeof transaction_description !== 'string') 
                throw new BaseError(400, 'Error in field transaction_description');

            if (!transaction_price || transaction_price <= 0 || typeof transaction_price !== 'number') 
                throw new BaseError(400, 'Error in field transaction_price');

            if (!cnpj_seller || cnpj_seller.length <= 0 || typeof cnpj_seller !== 'string') 
                throw new BaseError(400, 'Error in field cnpj_seller');

            if (!payment_method || payment_method.length <= 0 || typeof payment_method !== 'string' || (payment_method !== 'debit' && payment_method !== 'credit')) 
                throw new BaseError(400, 'Error in field payment_method');

            if (!card_digits || card_digits.length <= 0 || typeof card_digits !== 'string') 
                throw new BaseError(400, 'Error in field card_digits');
            
            if (!card_owner_name || card_owner_name.length <= 0 || typeof card_owner_name !== 'string') 
                throw new BaseError(400, 'Error in field card_owner_name');
                
            if (!card_valid_date) 
                throw new BaseError(400, 'Error in field card_valid_date');

            if (!cvv || cvv.length <= 0 || typeof cvv !== 'string') 
                throw new BaseError(400, 'Error in field cvv');

            next();
        } catch (error) {
            next(error);
        }
    }

    async store(req, res, next) {
        try {
            const body = req.body;
            const transaction = await createTransaction(body);
            await Queue.add(transaction);
            return res.status(201).json({message: 'Transaction created!', data: transaction});
        } catch (error) {
            next(error);
        }
    }

    async list(req, res, next) {
        try {
            const transactions = await listTransactions();
            return res.status(200).json({message: 'Query Successfullly!', data: transactions})
        } catch (error) {
            next(error);
        }
    }

    async getByCnpj(req, res, next) {
        try {
            const cnpj = req.params.cnpj            
            if (!cnpj) {
                throw new BaseError(400, 'Error in field cnpj');
            }
            const transactions = await listTransactions({cnpj_seller: cnpj})
            return res.status(200).json({message: 'Query successfully', data: transactions})
        } catch (error) {
            next(error);
        }
    }

    async deleteById(req, res, next) {
        try {
            const { id } = req.params;

            if (!id) {
                throw new BaseError(400, 'Error in field id');
            }

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