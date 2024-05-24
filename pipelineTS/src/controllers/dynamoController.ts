import { Router, Request, Response } from 'express';
import AWS from 'aws-sdk';

const router = Router();

AWS.config.update({
    region: 'us-east-1',
    accessKeyId: 'your-access-key-id',
    secretAccessKey: 'your-secret-access-key',
    sessionToken: 'your-session-token'  // Añadir si se usan credenciales temporales
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = 'Videojuegos';

router.post('/videojuegos', (req: Request, res: Response) => {
    const { videojuegoId, nombre, genero, precio } = req.body;
    const params = {
        TableName: tableName,
        Item: {
            videojuegoId,
            nombre,
            genero,
            precio
        }
    };
    dynamoDb.put(params, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send('Videojuego agregado');
        }
    });
});

router.get('/getvideojuegos', (req: Request, res: Response) => {
    const params = {
        TableName: tableName
    };
    dynamoDb.scan(params, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(data.Items);
        }
    });
});

export default router;
