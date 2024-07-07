import request from 'supertest';
import app from '../app';
import sequelize from '../config/database';
import User from '../models/user';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('User API', () => {
  let token: string;
  let userId: string;

  beforeAll(async () => {
    const res = await request(app).post('/auth/register').send({
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      password: 'password123',
      phone: '1234567890',
    });

    token = res.body.data.accessToken;
    userId = res.body.data.user.userId;
  });

  it('should retrieve user details', async () => {
    const res = await request(app)
      .get(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data.email).toBe('john.smith@example.com');
  });
});
