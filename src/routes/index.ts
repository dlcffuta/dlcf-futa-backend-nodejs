import { Router } from 'express';

import adminRoutes from './admin';
import memberRoutes from './member';
import workerRoutes from './worker';

const router = Router();

// * Collective routes: Default (index.ts) route
router.use('/member', memberRoutes);
router.use('/worker', workerRoutes);
router.use('/admin', adminRoutes);

export default router;
