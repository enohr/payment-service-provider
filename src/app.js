const express = require('express')
const swagger = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const router = require('./routes')
const database = require ('./database');
const { errorHandler } = require('./middlewares/errorMiddleware');
const swaggerDocument = YAML.load(path.resolve(__dirname, '..', 'swagger.yaml'));

const app = express()

app.use(express.json());
app.use(router);
app.use((err, req, res, next) => {
    errorHandler(err, res);
})

app.use('/api-docs', swagger.serve, swagger.setup(swaggerDocument, {explorer: true}));

module.exports = app;