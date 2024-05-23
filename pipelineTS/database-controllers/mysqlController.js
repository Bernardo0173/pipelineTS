const express = require('express');
const mysql = require('mysql');

const router = express.Router();

const db = mysql.createConnection({
    host: 'instancia-db-g1.chp6txp4xi8d.us-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: 'Password1234',
    database: 'pipelinets'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

router.post('/productos', (req, res) => {
    const { nombre, precio, cantidad_en_stock } = req.body;
    const query = 'INSERT INTO productos (nombre, precio, cantidad_en_stock) VALUES (?, ?, ?)';
    db.query(query, [nombre, precio, cantidad_en_stock], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send('Producto agregado');
        }
    });
});

// Nueva ruta para consultar productos
router.get('/getproductos', (req, res) => {
    const query = 'SELECT * FROM productos';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(results);
        }
    });
});

module.exports = router;
