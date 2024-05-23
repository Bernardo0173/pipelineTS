// dynamoController.js
const express = require('express');
const AWS = require('aws-sdk');

const router = express.Router();

AWS.config.update({
    region: 'us-east-1',
    accessKeyId: 'ASIAYJCKTTDFIHHK43WH',
    secretAccessKey: 'uuBM8Q8G33M7IsdzkUtapTU6pZv/xLF4bL8ZYMcz'
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = 'Videojuegos';

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

router.get('/videojuegos', (req, res) => {
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
