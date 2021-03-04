const express = require('express')
const router = require('./routes')

const database = require ('./database')

const app = express()

app.use(express.json());
app.use(router);

module.exports = app;