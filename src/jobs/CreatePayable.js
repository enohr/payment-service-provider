const { BaseError } = require('../error/BaseError');
const { Payable } = require('../database/models/payable')

const { discountFee, calculatePaymentDate, checkCardType} = require('../helper/payable')

const PayableJob = {
    key: 'CreatePayable',
    async handle({data}) {
        try {
            const { transaction_id,transaction_price, payment_method, createdAt } = data;

            const status = checkCardType(payment_method);
            const payment_date = calculatePaymentDate(status, createdAt);
            const price = discountFee(status, transaction_price);       
            const payable = {
                transaction_id,
                price,
                status,
                payment_date,
            }

            await Payable.create(payable)
    
            
        } catch(error) {
            throw new BaseError(500, error.message);
        }     
        
    }
}

module.exports = {PayableJob}