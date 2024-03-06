import { Router } from 'express';

import memberRoutes from './member';
import workerRoutes from './worker';
import adminRoutes from './admin';

const router = Router();

// * Collective routes: Default (index.ts) route
router.use('/member', memberRoutes);
router.use('/worker', workerRoutes);
router.use('/admin', adminRoutes);

export default router;
