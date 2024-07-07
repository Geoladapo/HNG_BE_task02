import { Request, Response } from 'express';
import { Organization, UserOrganization } from '../models';

export const getOrganizations = async (req: Request, res: Response) => {
  try {
    const organizations = await Organization.findAll();

    res.status(200).json({
      status: 'success',
      data: {
        organizations,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

export const getOrganizationById = async (req: Request, res: Response) => {
  const { orgId } = req.params;

  try {
    const organization = await Organization.findByPk(orgId);

    if (!organization) {
      return res.status(404).json({
        status: 'error',
        message: 'Organization not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: organization,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

export const createOrganization = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  try {
    const organization = await Organization.create({
      name,
      description,
    });

    res.status(201).json({
      status: 'success',
      data: organization,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

export const addUserToOrganization = async (req: Request, res: Response) => {
  const { orgId } = req.params;
  const { userId } = req.body;

  try {
    const userOrganization = await UserOrganization.create({
      userId,
      orgId,
    });

    res.status(200).json({
      status: 'success',
      message: 'User added to organization successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};
