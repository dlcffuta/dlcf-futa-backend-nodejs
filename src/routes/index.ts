import { Router } from 'express';

import adminRoutes from './admin';
import memberRoutes from './member';
<<<<<<< HEAD
import workerRoutes from './worker';
=======
import hallRoutes from "./hall"
>>>>>>> cloudinary_version_fixed

const router = Router();

// * Collective routes: Default (index.ts) route
router.use('/member', memberRoutes);
<<<<<<< HEAD
router.use('/worker', workerRoutes);
router.use('/admin', adminRoutes);
=======
router.use('/hall', hallRoutes);
>>>>>>> cloudinary_version_fixed

export default router;
