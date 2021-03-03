const express = require('express')
const router = require('./routes')

const { connectDb } = require ('./database')

const app = express()

connectDb();

app.use(express.json());
app.use(router);

module.exports = app;