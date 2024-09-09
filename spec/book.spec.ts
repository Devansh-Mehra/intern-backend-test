import request from 'supertest';
import app from '../src/app';

describe('Book Management', () => {
  let token: string;
  let bookId: number;
  let userId: number;

  beforeAll(async () => {
    const authRes = await request(app)
      .post('/users/authenticateUser')
      .send({ username: 'testuser', password: 'password123' });

    token = authRes.body.token;
    userId = authRes.body.userId;
  });

  it('should create a new book when authenticated', async () => {
    const res = await request(app)
      .post('/books/createBook')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Book', author: 'Test Author' });

    expect(res.status).toBe(201);
    expect(res.body.book).toHaveProperty('title', 'Test Book');
    bookId = res.body.book.id;
  });

  it('should not create a book without authentication', async () => {
    const res = await request(app)
      .post('/books/createBook')
      .send({ title: 'Another Book', author: 'Another Author' });

    expect(res.status).toBe(401);
  });

  it('should attach a book to the authenticated user', async () => {
    const res = await request(app)
      .post(`/users/${userId}/books/${bookId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Book attached successfully');
  });

  it('should prevent attaching a book to another user', async () => {
    const anotherUserId = userId + 1;

    const res = await request(app)
      .post(`/users/${anotherUserId}/books/${bookId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(403);
    expect(res.body.error).toBe('Unauthorized action');
  });
});
