import { Router } from 'express';
import BlogController from '../controllers/blog.controller';
const router = Router();
router.get('/', BlogController.getAllBlog);
router.post('/', BlogController.createBlog);
router.get('/:id', BlogController.getBlog);
router.put('/:id', BlogController.updateBlog);
router.delete('/:id', BlogController.deleteBlog);
export default router;
