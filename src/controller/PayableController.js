const { sumPayables } = require('../service/payableService')


class PayableController {

    async list(req, res) {
        const { cnpj } = req.params

        const payablesDebit = await sumPayables('paid', cnpj);
        const payablesCredit = await sumPayables('waiting_funds', cnpj);

        return res.json({message: 'Success', data: {sumPaid: payablesDebit, sumWaiting: payablesCredit}})
    }
}

module.exports = {
    PayableController
}