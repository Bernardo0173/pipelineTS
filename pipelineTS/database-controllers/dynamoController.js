"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const router = (0, express_1.Router)();
aws_sdk_1.default.config.update({
    region: 'us-east-1',
    accessKeyId: 'your-access-key-id',
    secretAccessKey: 'your-secret-access-key',
    sessionToken: 'your-session-token' // Añadir si se usan credenciales temporales
});
const dynamoDb = new aws_sdk_1.default.DynamoDB.DocumentClient();
const tableName = 'Videojuegos';
router.post('/videojuegos', (req, res) => {
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
        }
        else {
            res.status(201).send('Videojuego agregado');
        }
    });
});
router.get('/getvideojuegos', (req, res) => {
    const params = {
        TableName: tableName
    };
    dynamoDb.scan(params, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).json(data.Items);
        }
    });
});
exports.default = router;
