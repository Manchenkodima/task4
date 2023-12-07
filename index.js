require('dotenv').config();
const fs = require("fs");
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerSpec.js'); 
const app = express();
const Sentry = require("@sentry/node");
Sentry.init({
    dsn: 'https://163529ac6336c23fcdeb5603057442b8@o4506247310344192.ingest.sentry.io/4506297181143040'
  });
const bodyParser = require('body-parser')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const routes = require("./routes/index")
app.use("/api", routes)
 

module.exports = app;
