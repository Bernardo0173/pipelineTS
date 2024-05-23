const express = require('express');
const AWS = require('aws-sdk');

const router = express.Router();

AWS.config.update({
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = 'videojuegos';

router.post('/videojuegos', (req, res) => {
    const { videojuegoId, nombre, genero, precio } = req.body;
    const params = {
        TableName: tableName,
        Item: {
            videojuegoId: videojuegoId,
            nombre: nombre,
            genero: genero,
            precio: precio
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

// Nueva ruta para consultar videojuegos
router.get('/getvideojuegos', (req, res) => {
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

module.exports = router;
