const request = require('supertest')

const { deleteTransaction, createTransaction } = require('../service/transactionService')

const server = require('../app');

const FAKE_TRANSACTION_1 = {
	"transaction_description": "Celular",
	"transaction_price": 1000,
	"cnpj_seller": "68546956000127",
	"payment_method": "debit",
	"card_digits": "5118677470870117",
	"card_owner_name": "Eduardo",
	"card_valid_date": "03/03/2021",
	"cvv": "245"
}

const FAKE_TRANSACTION_2 = {
	"transaction_description": "Book",
	"transaction_price": 1000,
	"cnpj_seller": "68546956000127",
	"payment_method": "credit",
	"card_digits": "5118677470870117",
	"card_owner_name": "Eduardo",
	"card_valid_date": "03/03/2021",
	"cvv": "245"
}

const FAKE_TRANSACTION_3 = {
	"transaction_description": "iPad",
	"transaction_price": 2000,
	"cnpj_seller": "68546956000125",
	"payment_method": "credit",
	"card_digits": "5118677470870115",
	"card_owner_name": "Julio",
	"card_valid_date": "03/03/2021",
	"cvv": "245"
}

describe('Testing transactions routes', () => {
	let transaction1, transaction2, transaction3;
	beforeAll(async () => {
		transaction1 = await createTransaction(FAKE_TRANSACTION_1);
		transaction2 = await createTransaction(FAKE_TRANSACTION_2);
		transaction3 = await createTransaction(FAKE_TRANSACTION_3);
	})

	afterAll(async () => {
		await deleteTransaction(transaction1.transaction_id);
		await deleteTransaction(transaction2.transaction_id);
		await deleteTransaction(transaction3.transaction_id);
	})

    it('Should create a new transaction', async () => {
        const response = await request(server).post('/transaction').send(FAKE_TRANSACTION_1);

		const transactionCreated = response.body.data;

        expect(transactionCreated).toHaveProperty("transaction_id")

		await deleteTransaction(transactionCreated.transaction_id);

    })

	it('Should save only last 4 digits of card number', async () => {
		const expectedLength = 4;
		const response = await request(server).post('/transaction').send(FAKE_TRANSACTION_1);

		const transactionCreated = response.body.data;

		expect(transactionCreated.card_last_digits).toHaveLength(expectedLength);

		await deleteTransaction(transactionCreated.transaction_id);
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
		const newTransaction = await createTransaction(FAKE_TRANSACTION_1);
		const response = await request(server).delete(`/transaction/${newTransaction.transaction_id}`);

		expect(response.status).toBe(204);
	})

	it('Should not delete by wrong id', async() => {
		const id = -1;
		const response = await request(server).delete(`/transaction/${id}`);

		expect(response.status).toBe(404);
	})

	it('Should not create a transaction without description field', async () => {
		const transaction = FAKE_TRANSACTION_1;
		delete transaction.transaction_description;

		const response = await request(server).post('/transaction').send(transaction);

		expect(response.status).toBe(400);
	})

	it('Should not create a transaction without price field', async () => {
		const transaction = FAKE_TRANSACTION_1;
		delete transaction.transaction_price;

		const response = await request(server).post('/transaction').send(transaction);

		expect(response.status).toBe(400);
	})

	it('Should not create a transaction with price 0', async () => {
		const transaction = FAKE_TRANSACTION_1;
		transaction.transaction_price = 0;

		const response = await request(server).post('/transaction').send(transaction);

		expect(response.status).toBe(400);
	})

	it('Should not create a transaction without cnpj_seller field', async () => {
		const transaction = FAKE_TRANSACTION_1;
		delete transaction.cnpj_seller;

		const response = await request(server).post('/transaction').send(transaction);

		expect(response.status).toBe(400);
	})

	it('Should not create a transaction with wrong payment method', async () => {
		const transaction = FAKE_TRANSACTION_1;
		transaction.payment_method = 'cash';

		const response = await request(server).post('/transaction').send(transaction);

		expect(response.status).toBe(400);
	})

	it('Should not create a transaction without payment method', async () => {
		const transaction = FAKE_TRANSACTION_1;
		delete transaction.payment_method;

		const response = await request(server).post('/transaction').send(transaction);

		expect(response.status).toBe(400);
	})

	it('Should not create a transaction without card digits', async () => {
		const transaction = FAKE_TRANSACTION_1;
		delete transaction.card_digits;

		const response = await request(server).post('/transaction').send(transaction);

		expect(response.status).toBe(400);
	})

	it('Should not create a transaction without card owner name', async () => {
		const transaction = FAKE_TRANSACTION_1;
		delete transaction.card_owner_name;

		const response = await request(server).post('/transaction').send(transaction);

		expect(response.status).toBe(400);
	})

	it('Should not create a transaction without card valid date', async () => {
		const transaction = FAKE_TRANSACTION_1;
		delete transaction.card_valid_date;

		const response = await request(server).post('/transaction').send(transaction);

		expect(response.status).toBe(400);
	})

	it('Should not create a transaction without card cvv', async () => {
		const transaction = FAKE_TRANSACTION_1;
		delete transaction.cvv;

		const response = await request(server).post('/transaction').send(transaction);

		expect(response.status).toBe(400);
	})
})