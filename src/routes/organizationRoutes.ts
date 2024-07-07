import { Router } from 'express';
import {
  getOrganizations,
  getOrganizationById,
  createOrganization,
  addUserToOrganization,
} from '../controllers/organizationController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authenticate, getOrganizations);
router.get('/:orgId', authenticate, getOrganizationById);
router.post('/', authenticate, createOrganization);
router.post('/:orgId/users', authenticate, addUserToOrganization);

export default router;
