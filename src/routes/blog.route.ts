import { Router } from 'express';
import BlogController from '../controllers/blog.controller';
const router = Router();
router.get('/', BlogController.getAllBlog);
export default router;
