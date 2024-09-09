import request from 'supertest';
import app from '../src/app';
import { expect } from '@jest/globals';

describe('User Management and Book Management', () => {
  let token: string;
  let userId: number;

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users/createUser')
      .send({
        username: 'testuser',
        password: 'password123',
      });

    expect(res.status).toBe(201);
    expect(res.body.user).toHaveProperty('username', 'testuser');
    userId = res.body.user.id;
  });

  it('should not create a user with an existing username', async () => {
    const res = await request(app)
      .post('/users/createUser')
      .send({
        username: 'testuser',
        password: 'password123',
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toContain('username must be unique');
  });

  it('should authenticate a user with valid credentials', async () => {
    const res = await request(app)
      .post('/users/authenticateUser')
      .send({
        username: 'testuser',
        password: 'password123',
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });
});
