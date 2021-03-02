const { deepStrictEqual } = require('assert')

const request = require('supertest') 
const server = require('../index')

describe('Routes / ', () => {

    it('GET / - Responds with message: Hey There!', async () => {
        const response = await request(server).get('/')
        const expected = {
            message: 'Hey There!'
        }
        deepStrictEqual(response.body, expected);
    })
})