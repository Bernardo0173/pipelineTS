import express, { Request, Response, Router } from 'express';
import AWS from 'aws-sdk';

const router: Router = express.Router();

// Actualizar la configuración de AWS si es necesario
AWS.config.update({
    // Ejemplo: region: 'us-west-2'
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName: string = 'videojuegos';

// Definición de los tipos para el cuerpo de la solicitud
interface VideojuegoRequestBody {
    videojuegoId: string;
    nombre: string;
    genero: string;
    precio: number;
}

router.post('/videojuegos', (req: Request, res: Response) => {
    const { videojuegoId, nombre, genero, precio }: VideojuegoRequestBody = req.body;
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
