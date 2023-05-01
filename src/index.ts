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
(async () => {
    await client.connect();
})();

app.get('/', (req: Request, res: Response) => {
    return res.status(200).json({
        message: 'Welcome to server!',
    });
});
app.get('/todos', async (req: Request, res: Response) => {
    try {
        const data = await client.get('todos');
        if (data) {
            console.log('Cache');
            return res.status(200).json(JSON.parse(data));
        } else {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=3');
            const todos = await response.json();
            console.log('Call api');
            await client.set('todos', JSON.stringify(todos), {
                EX: 10,
                NX: true,
            });
            return res.status(200).json(todos);
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message,
            });
        }
        console.log(error);
    }
});
routes(app);
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
app.listen(port, async () => {
    //! Synchronizing all models at once
    // await sequelize.sync({ force: true });
    console.log(`Server listening on http://localhost:${port}`);
});
