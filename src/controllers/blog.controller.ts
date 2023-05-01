import Blog from '../models/blog';
import { Request, Response } from 'express';
import { IBlog } from '../types/blog';
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
            console.log(error);
        }
    }
    static async getBlog(req: Request, res: Response) {
        const id: number = Number(req.params.id);
        try {
            const findBlog = await Blog.findByPk(id);
            if (findBlog === null) {
                return res.status(404).json({
                    message: 'Blog not found',
                });
            }
            return res.status(200).json(findBlog);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({
                    message: error.message,
                });
            }
            console.log(error);
        }
    }
    static async createBlog(req: Request, res: Response) {
        const { title, body, image }: IBlog = req.body;
        if (!title || !body || !image) {
            return res.status(400).json({
                message: 'Title, body, image is required',
            });
        }
        try {
            const findBlog = await Blog.findOne({ where: { title } });
            if (findBlog !== null) {
                return res.status(400).json({
                    message: 'Title already exists',
                });
            }
            const newBlog = await Blog.create({ title, body, image });
            return res.status(201).json(newBlog);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({
                    message: error.message,
                });
            }
            console.log(error);
        }
    }
    static async updateBlog(req: Request, res: Response) {
        const { title, body, image } = req.body;
        const id: number = Number(req.params.id);
        if (!title || !body || !image) {
            return res.status(400).json({
                message: 'Title, body, image is required',
            });
        }
        try {
            const findBlog = await Blog.findOne({ where: { id: id } });
            if (findBlog === null) {
                return res.status(404).json({
                    message: 'Blog not found',
                });
            }
            const updateBlog = await Blog.update(
                {
                    title,
                    body,
                    image,
                },
                {
                    returning: true,
                    where: {
                        id: id,
                    },
                },
            );
            return res.status(200).json(updateBlog[1][0]);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({
                    message: error.message,
                });
            }
            console.log(error);
        }
    }
    static async deleteBlog(req: Request, res: Response) {
        const id: number = Number(req.params.id);
        try {
            const row = await Blog.destroy({
                where: {
                    id: id,
                },
            });
            if (row === 0) {
                return res.status(404).json({
                    message: 'Blog not found',
                });
            }
            return res.status(200).json({
                message: 'Blog successfully deleted',
            });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({
                    message: error.message,
                });
            }
            console.log(error);
        }
    }
}
export default BlogController;
