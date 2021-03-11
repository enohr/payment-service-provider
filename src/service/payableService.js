const { Payable } = require('../database/models/payable');
const { Transaction } = require('../database/models/transaction');

exports.sumPayables = function(status, cnpj) {
    const query = {
        where: 
            {status},
        include: {
            model: Transaction,
            attributes: [], // To exclude the pk of the included models
            where: { cnpj_seller: cnpj } 
        }
    }

    return Payable.sum('price', query);

}