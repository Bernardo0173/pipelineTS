import express, { Express } from 'express';
import bodyParser from 'body-parser';

import mysqlController from './mysqlController';
import dynamoController from './dynamoController';

const app: Express = express();
const port: number = 8085;

app.use(bodyParser.json());

app.use('/mysql', mysqlController);
app.use('/dynamo', dynamoController);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
