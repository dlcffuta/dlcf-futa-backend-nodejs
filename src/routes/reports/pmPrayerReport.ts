import { Router } from 'express';
import PmPrayerReportController from '../../controllers/reports.controller/pmPrayerReport';
import Container from 'typedi';
import { checkPermission, checkHallRepJwt,  addHall } from '../../middlewares';

const router = Router();

const pmPrayerReportController = Container.get(PmPrayerReportController);

router.post('/', [checkHallRepJwt, checkPermission], pmPrayerReportController.createPmPrayerReport);
router.get('/', [checkHallRepJwt, checkPermission], pmPrayerReportController.getAllPmPrayerReport);
router.get('/:id', [checkHallRepJwt, checkPermission], pmPrayerReportController.getPmPrayerReportById);
router.put('/:id', [checkHallRepJwt, checkPermission], pmPrayerReportController.updatePmPrayerReport);
router.delete('/:id', [checkHallRepJwt, checkPermission], pmPrayerReportController.deletePmPrayerReport);

export default router;
