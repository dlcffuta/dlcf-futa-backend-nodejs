import { Router } from 'express';
import AmPrayerReportController from '../../controllers/reports.controller/amPrayerReport';
import Container from 'typedi';
import { checkPermission, checkHallRepJwt } from '../../middlewares';

const router = Router();

const amPrayerReportController = Container.get(AmPrayerReportController);

router.post('/', [checkHallRepJwt, checkPermission], amPrayerReportController.createAmPrayerReport);
router.get('/', [checkHallRepJwt, checkPermission], amPrayerReportController.getAllAmPrayerReport);
router.get(
  '/:id',
  [checkHallRepJwt, checkPermission],
  amPrayerReportController.getAmPrayerReportById,
);
router.put(
  '/:id',
  [checkHallRepJwt, checkPermission],
  amPrayerReportController.updateAmPrayerReport,
);
router.delete(
  '/:id',
  [checkHallRepJwt, checkPermission],
  amPrayerReportController.deleteAmPrayerReport,
);

export default router;
