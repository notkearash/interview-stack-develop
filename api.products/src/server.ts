import morgan from 'morgan';
import express, { Request, Response } from 'express';
import productsRouter from './routes/products.routes';
import { Sequelize } from 'sequelize';
import cors from 'cors';
require('dotenv').config();

const app = express();


export const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mariadb',
        logging: () => console.log('[ DB ] Request made to DB'),
    }
);

(async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log('[ OK ] Connected to DB');
    } catch (error) {
        console.error('[FATAL] Unable to connect to the database:', error);
    }
})();


app.use(cors());
app.use(express.json());
app.use('/static', express.static('./static'));
app.use(morgan('< :method > :url :status :res[content-length] - :response-time ms'));

app.use('/api/products/', productsRouter(sequelize));
app.use((req: Request, res: Response): Response => res.status(404).json({ message: "404 not found" }));

app.listen(process.env.LPORT, (): void => console.log(`[ OK ] Listening on ${process.env.LPORT}`));