import express from 'express';
import { validateJWT } from '../middlewares/validateJWT.js';
import { tieneRol } from '../middlewares/validateRoles.js';
import { validateFields } from '../middlewares/validateFields.js';
import { roleValidators } from '../validators/usersValidator.js';
import { getUsers, updateRole } from '../controllers/usersController.js';

const router = express.Router();

router.get('/', [validateJWT, tieneRol('ADMIN')], getUsers);
router.patch('/:id/role', [validateJWT, tieneRol('ADMIN'), roleValidators, validateFields], updateRole);

export default router;