import { Router } from 'express';

import adminRoutes from './admin';
import memberRoutes from './member';
import workerRoutes from './worker';
import hallRoutes from './hall';
import centreRoutes from './centre';
import schoolRoutes from './school';
import amPrayerReportRoute from './reports/amPrayerReport';
import pmPrayerReportRoute from './reports/pmPrayerReport';
import evangelismReportRoute from './reports/evangelismReport';
import koinoniaReportRoute from './reports/koinoniaReport';
import hallRepresentativeRoutes from './hallRep';

const router = Router();

// * Collective routes: Default (index.ts) route
router.use('/member', memberRoutes);
router.use('/worker', workerRoutes);
router.use('/admin', adminRoutes);
router.use('/hall', hallRoutes);
router.use('/centre', centreRoutes);
router.use('/school', schoolRoutes);
router.use('/report/morning_prayer', amPrayerReportRoute);
router.use('/report/evening_prayer', pmPrayerReportRoute);
router.use('/report/evangelism', evangelismReportRoute);
router.use('/report/koinonia', koinoniaReportRoute);
router.use('/hallrep', hallRepresentativeRoutes)

export default router;
