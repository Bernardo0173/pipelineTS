import express from 'express';
import bodyParser from 'body-parser';
import mysqlController from './mysqlController';
import dynamoController from './dynamoController';

const app = express();
const port = 8085;

app.use(bodyParser.json());

app.use('/mysql', mysqlController);
app.use('/dynamo', dynamoController);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
