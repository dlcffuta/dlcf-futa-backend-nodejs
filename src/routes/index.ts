import { Router } from 'express';

import adminRoutes from './admin';
import memberRoutes from './member';
import workerRoutes from './worker';
import hallRoutes from './hall';
import centreRoutes from './centre';

const router = Router();

// * Collective routes: Default (index.ts) route
router.use('/member', memberRoutes);
router.use('/worker', workerRoutes);
router.use('/admin', adminRoutes);
router.use('/hall', hallRoutes);
router.use('/centre', centreRoutes);

export default router;
