const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const professionalRoutes = require('./router/router');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const swaggerDocument = YAML.load('./swagger.yaml');

const port = process.env.PORT || 8080;
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/professional', professionalRoutes);

// Root route to avoid "Cannot GET /"
app.get('/', (req, res) => {
  res.send('Good morning world! This is awesome for now.');
});

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
