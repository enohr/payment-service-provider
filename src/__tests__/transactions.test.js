const request = require('supertest')
const {  ok, deepStrictEqual } = require('assert');

const server = require('../app');

const FAKE_TRANSACTION = {
	"transaction_description": "Celular",
	"transaction_price": 1000,
	"cnpj_seller": "68546956000127",
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

	it('Should save only last 4 digits of card number', async () => {
		const expectedLength = 4;
		const response = await request(server).post('/transaction').send(FAKE_TRANSACTION);

		const cardDigitsLength = response.body.data.card_last_digits.length;

		deepStrictEqual(cardDigitsLength, expectedLength);
	})

	it('Should list all transactions', async () => {
		const expectedStatusCode = 200
		const response = await request(server).get('/transaction')

		deepStrictEqual(response.status, expectedStatusCode);
	})

	it('Should list all transactions by given CNPJ', async () => {
		const cnpj = "68546956000127";
		const expectedLength = 2;
		const response = await request(server).get(`/transaction/${cnpj}`);

		deepStrictEqual(response.body.data.length, expectedLength);
	})

	it('Should delete transaction by given id', async() => {
		const id = 4;
		const status = 200;
		const response = await request(server).delete(`/transaction/${id}`);

		deepStrictEqual(response.status, status);
	})

	it.only('Should not delete by wrong id', async() => {
		const id = 0;
		const status = 404;
		const response = await request(server).delete(`/transaction/${id}`);

		deepStrictEqual(response.status, status);
	})


})