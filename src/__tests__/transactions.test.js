const request = require('supertest')
const {  ok, deepStrictEqual } = require('assert');

const server = require('../app');

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

const FAKE_TRANSACTION_3 = {
	"transaction_description": "iPad",
	"transaction_price": 2000,
	"cnpj_seller": "68546956000125",
	"payment_method": "credit",
	"card_digits": "5118677470870115",
	"card_owner_name": "Julio",
	"card_valid_date": "03/03/2021",
	"cvv": 245
}

describe('Testing transactions routes', () => {
	let transaction1, transaction2, transaction3;
	beforeAll(async () => {
		transaction1 = await request(server).post('/transaction').send(FAKE_TRANSACTION_1)
		transaction2 = await request(server).post('/transaction').send(FAKE_TRANSACTION_2)
		transaction3 = await request(server).post('/transaction').send(FAKE_TRANSACTION_3)
	})

	afterAll(async () => {
		await request(server).delete(`/transaction/${transaction1.body.data.transaction_id}`);
		await request(server).delete(`/transaction/${transaction2.body.data.transaction_id}`);
		await request(server).delete(`/transaction/${transaction3.body.data.transaction_id}`);
	})

    it('Should create a new transaction', async () => {
        const response = await request(server).post('/transaction').send(FAKE_TRANSACTION_1);

		const transactionCreated = response.body.data;

        expect(transactionCreated).toHaveProperty("transaction_id")

		await request(server).delete(`/transaction/${transactionCreated.transaction_id}`)

    })

	it('Should save only last 4 digits of card number', async () => {
		const expectedLength = 4;
		const response = await request(server).post('/transaction').send(FAKE_TRANSACTION_1);

		const transactionCreated = response.body.data;

		expect(transactionCreated.card_last_digits).toHaveLength(expectedLength);

		await request(server).delete(`/transaction/${transactionCreated.transaction_id}`)
	})

	it('Should list all transactions', async () => {
		const response = await request(server).get('/transaction')

		const transactions = response.body.data;

		expect(transactions).not.toHaveLength(0);
	})

	it('Should list all transactions by given CNPJ', async () => {
		const cnpj = "68546956000127";
		const response = await request(server).get(`/transaction/${cnpj}`);

		const transactions = response.body.data;

		expect(transactions).not.toHaveLength(0);
	})

	it('Should not list transactions by given wrong CNPJ', async () => {
		const cnpj = "68546956000135";
		const response = await request(server).get(`/transaction/${cnpj}`);

		expect(response.body.data).toHaveLength(0);
	})

	it('Should delete transaction by given id', async() => {
		const newTransaction = await request(server).post('/transaction').send(FAKE_TRANSACTION_1);
		const response = await request(server).delete(`/transaction/${newTransaction.body.data.transaction_id}`);

		expect(response.status).toBe(200);
	})

	it('Should not delete by wrong id', async() => {
		const id = -1;
		const response = await request(server).delete(`/transaction/${id}`);

		expect(response.status).toBe(404);
	})


})