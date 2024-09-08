import { Response } from 'express';
import type { Request } from 'express';
import { UserModel } from '../model/user.model';
import {generateToken} from '../utils/jwt.utils'
import { BookModel } from '../model/book.model';
import jwt from 'jsonwebtoken';

export class BookController{
    createBook = async(req:Request, res:Response) => {
       try{ 
            const { title, author} = req.body;
            const userId = req.user?.userId; // from middleware
            const book = await BookModel.create({
                title: title,
                author: author,
                userId: userId
            });
            res.status(201).json({ message: 'Book created successfully', book });
        }catch(error){
            console.log(error)
            res.status(400).json({ error: "Failed to create book" });
        }
    }
}