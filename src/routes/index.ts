import { Router } from 'express';

import memberRoutes from './member';

const router = Router();

// * Collective routes: Default (index.ts) route
router.use('/member', memberRoutes);

export default router;
