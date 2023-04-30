import Blog from '../models/blog';
import { Request, Response } from 'express';
class BlogController {
    static async getAllBlog(req: Request, res: Response) {
        try {
            const blogs = await Blog.findAll();
            return res.status(200).json(blogs);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({
                    message: error.message,
                });
            }
        }
    }
}
export default BlogController;
