const express = require('express')
const router = require('./routes')

const { connectDb } = require ('./database')

const app = express()
const PORT = 3000

connectDb();

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`)
})

module.exports = app;