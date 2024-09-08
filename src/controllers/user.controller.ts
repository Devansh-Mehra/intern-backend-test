import { Response } from 'express';
import type { Request } from 'express';
import { UserModel } from '../model/user.model';
import {generateToken} from '../utils/jwt.utils'
import { BookModel } from '../model/book.model';
import jwt from 'jsonwebtoken';

export class UserController {

  createUser = async (req: Request, res: Response) => {
    try {
      const {username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
      }
      const existingUser = await UserModel.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }
      const user = await UserModel.create({username, password: req.body.password });
      res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      res.status(500).json({ error: "Failed To Create User" });
    }
  };

   authenticateUser = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({ where: { username } });

      if (!user || !user.validPassword(password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const userData = user.get();
      const token = generateToken(userData.id, userData.username);
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: "Failed to Authenticate User" });
    }
  }

  attachBook = async(req: Request, res: Response) => {
    try{
    const { userId, bookId } = req.params;
    const loggedInUserId = req.user?.userId;

    if (parseInt(userId) !== loggedInUserId) {
      return res.status(403).json({ error: 'Unauthorized action' });
    }

    const book = await BookModel.findByPk(bookId);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    book.userId = parseInt(userId); // Ensure userId is an integer
    await book.save();

    res.json({ message: 'Book attached successfully', book });
    }catch(error){

    } 
  }
}
