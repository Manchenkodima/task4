require('dotenv').config();
const fs = require("fs");
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerSpec.js'); 
const app = express();
const Sentry = require("@sentry/node");
Sentry.init({ dsn: process.env.URL });
const bodyParser = require('body-parser')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());
app.use(bodyParser.json());
app.use(express.json())

const routes = require("./routes/index")
app.use("/api", routes)
 

module.exports = app;
