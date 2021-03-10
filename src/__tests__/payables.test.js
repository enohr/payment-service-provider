const request = require('supertest')
const { deepStrictEqual } = require('assert');

const server = require('../app');
const { calcFee, discountFee, checkCardType} = require('../helper/payable')

const FAKE_TRANSACTION_1 = {
	"transaction_description": "Celular",
	"transaction_price": 1000,
	"cnpj_seller": "68546956000127",
	"payment_method": "debit",
	"card_digits": "5118677470870117",
	"card_owner_name": "Eduardo",
	"card_valid_date": "03/03/2021",
	"cvv": 245
}

const FAKE_TRANSACTION_2 = {
	"transaction_description": "Book",
	"transaction_price": 235,
	"cnpj_seller": "68546956000127",
	"payment_method": "credit",
	"card_digits": "5118677470870117",
	"card_owner_name": "Eduardo",
	"card_valid_date": "03/03/2021",
	"cvv": 245
}


describe('Test Payables Status', () => {
	let transaction1, transaction2;
	beforeAll(async () => {
		transaction1 = await request(server).post('/transaction').send(FAKE_TRANSACTION_1)
		transaction2 = await request(server).post('/transaction').send(FAKE_TRANSACTION_2)
	})

	afterAll(async () => {
		await request(server).delete(`/transaction/${transaction1.body.data.transaction_id}`);
		await request(server).delete(`/transaction/${transaction2.body.data.transaction_id}`);
	})

    it('Should return paid as status on debit card', () => {
        const expectedCardType = 'paid';
        const cardType = checkCardType('debit');
        deepStrictEqual(cardType, expectedCardType);
    })

    it('Should return waiting_funds as status on credit card', () => {
        const expectedCardType = 'waiting_funds';
        const cardType = checkCardType('credit');
        deepStrictEqual(cardType, expectedCardType);
    })

})

describe('Test Payables Fee', () => {
    
    it('Should return 3 as fee on debit card', () => {
        const expectedFee = 3
        const fee = calcFee('paid')
        deepStrictEqual(fee, expectedFee);
    })

    it('Should return 5 as fee on credit card', () => {
        const expectedFee = 5
        const fee = calcFee('waiting_funds')
        deepStrictEqual(fee, expectedFee);
    })
})

describe('Test Payables Price', () => {
    it('Should discount 3% on debit card', () => {
        const price = 1000
        const expectedPriceDiscounted = 970;
        const newPrice = discountFee('paid', price);

        deepStrictEqual(newPrice, expectedPriceDiscounted);
    })
    it('Should discount 5% on debit card', () => {
        const price = 1000
        const expectedPriceDiscounted = 950;
        const newPrice = discountFee('waiting_funds', price);

        deepStrictEqual(newPrice, expectedPriceDiscounted);
    })
})

describe('Test Balances of Payables', () => {
    it('Should return 200 as Status Code on valid CNPJ', async () => {
        const cnpj = "68546956000127"
        const balance = await request(server).get(`/payable/${cnpj}`)

        deepStrictEqual(balance.status, 200)
    })
})
