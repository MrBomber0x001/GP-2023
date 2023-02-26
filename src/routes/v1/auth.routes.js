import { Router } from 'express'
const router = Router();
import { signIn, signup } from '../../controllers/auth.controller.js';

router.post('/auth/login', signIn);
router.post('/auth/register', signup)

export default router