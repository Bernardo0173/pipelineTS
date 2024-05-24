import { Router, Request, Response } from 'express';
import mysql from 'mysql';
import { dbConfig } from './config/dbConfig';

const router = Router();

const db = mysql.createConnection(dbConfig);

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

router.post('/productos', (req: Request, res: Response) => {
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

router.get('/getproductos', (req: Request, res: Response) => {
    const query = 'SELECT * FROM productos';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(results);
        }
    });
});

export default router;
