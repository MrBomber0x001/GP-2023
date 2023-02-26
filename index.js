import { Router } from 'express';
import authRoutes from './src/routes/v1/auth.routes'
const router = Router();


router.use('/auth', authRoutes);

export default router