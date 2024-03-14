import { Router } from 'express';
import PmPrayerReportController from '../../controllers/reports.controller/pmPrayerReport';
import Container from 'typedi';
import { checkPermission, checkUserJwt, addHall } from '../../middlewares';

const router = Router();

const pmPrayerReportController = Container.get(PmPrayerReportController);

router.post('/', pmPrayerReportController.createPmPrayerReport);
router.get('/', pmPrayerReportController.getAllPmPrayerReport);
router.get('/:id', pmPrayerReportController.getPmPrayerReportById);
router.put('/:id', pmPrayerReportController.updatePmPrayerReport);
router.delete('/:id', pmPrayerReportController.deletePmPrayerReport);

export default router;
