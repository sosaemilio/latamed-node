import { Router } from "express";
import { requiresAuth } from "express-openid-connect";

const router = Router();

router.use('/patients', requiresAuth(), require('./patients'));
router.use('/history', requiresAuth(), require('./history'));
router.use('/appointments', requiresAuth(), require('./appointments'));
router.use('/doctors', requiresAuth(), require('./doctors'));
router.use('/api-docs', require('./swagger'));

export default router