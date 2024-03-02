import { Router } from 'express';

import memberRoutes from './member';
import workerRoutes from './worker';

const router = Router();

// * Collective routes: Default (index.ts) route
router.use('/member', memberRoutes);
router.use('/worker', workerRoutes);

export default router;