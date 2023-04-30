import { Express } from 'express';
import blog from './blog.route';
const routes = (app: Express): void => {
    app.use('/api/blogs', blog);
};
export default routes;
