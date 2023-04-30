import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import client from './config/redis';
const port: number = +process?.env?.PORT! || 4000;
const app: Express = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.get('/', (req: Request, res: Response) => {
    return res.status(200).json({
        message: 'Welcome to server!',
    });
});
(async () => {
    await client.connect();
})();
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
