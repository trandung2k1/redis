import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import sequelize from './config/db';
import client from './config/redis';
import routes from './routes';
const port: number = +process?.env?.PORT! || 4000;
const app: Express = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
// (async () => {
//     await client.connect();
//     await sequelize.sync({ force: true });
// })();
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
app.get('/', (req: Request, res: Response) => {
    return res.status(200).json({
        message: 'Welcome to server!',
    });
});
routes(app);
app.listen(port, async () => {
    await sequelize.sync({ force: true });
    console.log(`Server listening on http://localhost:${port}`);
});
