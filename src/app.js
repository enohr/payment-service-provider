const express = require('express')
const router = require('./routes')

const database = require ('./database');

const { errorHandler } = require('./middlewares/errorMiddleware');
const app = express()

app.use(express.json());
app.use(router);
app.use((err, req, res, next) => {
    errorHandler(err, res);
})

module.exports = app;