import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app';

describe('User API Tests', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ username: 'testuser', password: 'password123' });

    expect(res.status).to.equal(201);
    expect(res.body.user.username).to.equal('testuser');
  });
});
