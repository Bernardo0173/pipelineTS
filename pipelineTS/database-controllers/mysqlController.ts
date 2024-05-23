import express, { Request, Response, Router } from 'express';
import mysql, { Connection, MysqlError } from 'mysql';

const router: Router = express.Router();

// Tipado para la configuración de la conexión
interface DbConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}

const dbConfig: DbConfig = {
    host: '',
    port: 3306,
    user: 'admin',
    password: '',
    database: 'pipelinets'
};

const db: Connection = mysql.createConnection(dbConfig);

db.connect((err: MysqlError | null) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// Definición de los tipos para el cuerpo de la solicitud
interface ProductoRequestBody {
    nombre: string;
    precio: number;
    cantidad_en_stock: number;
}

router.post('/productos', (req: Request, res: Response) => {
    const { nombre, precio, cantidad_en_stock }: ProductoRequestBody = req.body;
    const query: string = 'INSERT INTO productos (nombre, precio, cantidad_en_stock) VALUES (?, ?, ?)';
    db.query(query, [nombre, precio, cantidad_en_stock], (err: MysqlError | null, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send('Producto agregado');
        }
    });
});

router.get('/getproductos', (req: Request, res: Response) => {
    const query: string = 'SELECT * FROM productos';
    db.query(query, (err: MysqlError | null, results: any[]) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(results);
        }
    });
});

export default router;
