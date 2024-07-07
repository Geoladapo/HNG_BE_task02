import express from 'express';
import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import organizationRoutes from './routes/organizationRoutes';
import { initModels } from './models';
import sequelize from './config/database';

const app = express();

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello User Authentication and Organization',
  });
});

app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/organisations', organizationRoutes);

initModels();

sequelize
  .sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch((error) => {
    console.log('Error syncing database', error);
  });

export default app;
