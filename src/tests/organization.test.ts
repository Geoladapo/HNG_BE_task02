import request from 'supertest';
import app from '../app';
import sequelize from '../config/database';
import User from '../models/user';
import Organization from '../models/organization';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Organization API', () => {
  let token: string;
  let userId: string;
  let orgId: string;

  beforeAll(async () => {
    const userRes = await request(app).post('/auth/register').send({
      firstName: 'Alice',
      lastName: 'Doe',
      email: 'alice.doe@example.com',
      password: 'password123',
      phone: '1234567890',
    });

    token = userRes.body.data.accessToken;
    userId = userRes.body.data.user.userId;

    const orgRes = await request(app)
      .post('/api/organisations')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Organization',
        description: 'This is a test organization',
      });

    orgId = orgRes.body.data.orgId;
  })();

  it('should create a new organization', async () => {
    const res = await request(app)
      .post('/api/organisations')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'New Organization',
        description: 'This is a new organization',
      });

    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe('New Organization');
  });

  it('should retrieve all organizations', async () => {
    const res = await request(app)
      .get('/api/organisations')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data.organizations.length).toBeGreaterThan(0);
  });

  it('should retrieve a specific organization by ID', async () => {
    const res = await request(app)
      .get(`/api/organisations/${orgId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data.orgId).toBe(orgId);
  });

  it('should add a user to an organization', async () => {
    const res = await request(app)
      .post(`/api/organisations/${orgId}/users`)
      .set('Authorization', `Bearer ${token}`)
      .send({ userId });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('User added to organization successfully');
  });
});
