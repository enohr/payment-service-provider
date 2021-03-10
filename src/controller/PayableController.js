const { Payable } = require('../database/models/payable');
const { Transaction } = require('../database/models/transaction');


class PayableController {

    async list(req, res) {
        const { cnpj } = req.params

        const payablesDebit = await Payable.sum('price',
            {where: { status: 'paid'},
            include: {
                model: Transaction,
                attributes: [], // To exclude the pk of the included models
                where: { cnpj_seller: cnpj } 
            }
        })

        const payablesCredit = await Payable.sum('price',
            {where: {status: 'waiting_funds'},
            include: {
                model: Transaction,
                attributes: [], // To exclude the pk of the included models
                where: { cnpj_seller: cnpj } 
            }
        })

        return res.json({message: 'Success', data: {sumPaid: payablesDebit, sumWaiting: payablesCredit}})
    }
}

module.exports = {
    PayableController
}