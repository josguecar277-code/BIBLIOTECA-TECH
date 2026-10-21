import express from 'express';
import { validateFields } from '../middlewares/validateFields.js';
import { validateJWT } from '../middlewares/validateJWT.js';
import { registerValidators, loginValidators } from '../validators/usersValidator.js';
import { getMe, login, register } from '../controllers/usersController.js';

const router = express.Router();

router.post('/register', [registerValidators, validateFields], register);
router.post('/login', [loginValidators, validateFields], login);
router.get('/me', [validateJWT], getMe);

export default router;