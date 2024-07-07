// src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User, Organization, UserOrganization } from '../models';
import { generateAccessToken } from '../utils/jwt';

export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, phone } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
    });

    const organization = await Organization.create({
      name: `${firstName}'s Organization`,
      description: `${firstName}'s default organization`,
    });

    await UserOrganization.create({
      userId: user.userId,
      orgId: organization.orgId,
    });

    const accessToken = generateAccessToken(user.userId);

    res.status(201).json({
      status: 'success',
      message: 'Registration successful',
      data: {
        accessToken,
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        },
      },
    });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password',
      });
    }

    const accessToken = generateAccessToken(user.userId);

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        accessToken,
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};
