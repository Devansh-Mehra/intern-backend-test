// src/routes/user.routes.ts
import { Router } from 'express';
import {UserController} from '../controllers/user.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();
const userController = new UserController();


// User Routes
router.post('/createUser', userController.createUser);
router.post('/authenticateUser', userController.authenticateUser);
router.post(
  '/users/:userId/books/:bookId',
  authenticateToken,
  userController.attachBook
);

export default router;
