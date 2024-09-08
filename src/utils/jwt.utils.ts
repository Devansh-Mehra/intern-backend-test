// src/utils/jwt.utils.ts
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'supersecret';

export const generateToken = (userId: string, username: string) => {
  return jwt.sign({ userId, username }, JWT_SECRET, { expiresIn: '1h' });
};
