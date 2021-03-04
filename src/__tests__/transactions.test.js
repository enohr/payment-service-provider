const request = require('supertest')
const {  ok, deepStrictEqual } = require('assert');

const server = require('../app');

const FAKE_TRANSACTION = {
	"transaction_description": "Celular",
	"transaction_price": 1000,
	"payment_method": "debit",
	"card_digits": "5118677470870117",
	"card_owner_name": "Eduardo",
	"card_valid_date": "03/03/2021",
	"cvv": 245
}

describe('Testing transactions routes', () => {

    it('Should create a new transaction', async () => {
        const expected = 201
        const response = await request(server).post('/transaction').send(FAKE_TRANSACTION);
        deepStrictEqual(response.status, expected);
    })

	it.only('Should list all transactions', async () => {
		const expected = 'Successfuly!'
		const response = await request(server).get('/transaction')

		deepStrictEqual(response.body.message, expected);
	})
})