import { Router } from 'express';

import memberRoutes from './member';
import hallRoutes from "./hall"

const router = Router();

// * Collective routes: Default (index.ts) route
router.use('/member', memberRoutes);
router.use('/hall', hallRoutes);

export default router;
