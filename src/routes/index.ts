import { Router } from 'express';

import adminRoutes from './admin';
import memberRoutes from './member';
import workerRoutes from './worker';
import hallRoutes from './hall';
import centreRoutes from './centre';
import schoolRoutes from './school';

const router = Router();

// * Collective routes: Default (index.ts) route
router.use('/member', memberRoutes);
router.use('/worker', workerRoutes);
router.use('/admin', adminRoutes);
router.use('/hall', hallRoutes);
router.use('/centre', centreRoutes);
router.use('/school', schoolRoutes);

export default router;
