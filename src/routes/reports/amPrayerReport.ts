import { Router } from 'express';
import AmPrayerReportController from '../../controllers/reports.controller/amPrayerReport';
import Container from 'typedi';
import { checkPermission, checkUserJwt, addHall } from '../../middlewares';

const router = Router();

const amPrayerReportController = Container.get(AmPrayerReportController);

router.post('/', amPrayerReportController.createAmPrayerReport);
router.get('/', amPrayerReportController.getAllAmPrayerReport);
router.get('/:id', amPrayerReportController.getAmPrayerReportById);
router.put('/:id', amPrayerReportController.updateAmPrayerReport);
router.delete('/:id', amPrayerReportController.deleteAmPrayerReport);

export default router;
