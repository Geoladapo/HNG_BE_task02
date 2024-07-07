import request from 'supertest';
import app from '../app';
import sequelize from '../config/database';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Auth API', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/auth/register').send({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      phone: '1234567890',
    });

    expect(res.status).toBe(201);
    expect(res.body.data.user.email).toBe('john.doe@example.com');
  });

  it('should login an existing user', async () => {
    await request(app).post('/auth/register').send({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      password: 'password123',
      phone: '0987654321',
    });

    const res = await request(app).post('/auth/login').send({
      email: 'jane.doe@example.com',
      password: 'password123',
    });

    expect(res.status).toBe(200);
    expect(res.body.data.user.email).toBe('jane.doe@example.com');
  });
});
