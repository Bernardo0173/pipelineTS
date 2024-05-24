"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("mysql"));
const dbConfig_1 = require("./config/dbConfig");
const router = (0, express_1.Router)();
const db = mysql_1.default.createConnection(dbConfig_1.dbConfig);
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    }
    else {
        console.log('Connected to MySQL');
    }
});
router.post('/productos', (req, res) => {
    const { nombre, precio, cantidad_en_stock } = req.body;
    const query = 'INSERT INTO productos (nombre, precio, cantidad_en_stock) VALUES (?, ?, ?)';
    db.query(query, [nombre, precio, cantidad_en_stock], (err, result) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(201).send('Producto agregado');
        }
    });
});
router.get('/getproductos', (req, res) => {
    const query = 'SELECT * FROM productos';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).json(results);
        }
    });
});
exports.default = router;
