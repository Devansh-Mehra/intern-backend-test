// src/routes/book.routes.ts
import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';
import { BookController } from '../controllers/book.controller';

const   router = Router();
const bookController = new BookController();

router.post('/createBook', authenticateToken, bookController.createBook);

export default router;
