// index.js
const express = require('express');
const bodyParser = require('body-parser');

const mysqlController = require('./mysqlController');
const dynamoController = require('./dynamoController');

const app = express();
const port = 8085;

app.use(bodyParser.json());

app.use('/mysql', mysqlController);
app.use('/dynamo', dynamoController);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
