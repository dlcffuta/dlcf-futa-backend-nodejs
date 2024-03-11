import { Router } from 'express';
import KoinoniaReportController from 'controllers/reports.controller/koinoniaReport';
import Container from 'typedi';
import { checkPermission, checkUserJwt, addHall } from '../../middlewares';

const router = Router();

const koinoniaReportController = Container.get(KoinoniaReportController);

router.post('/', koinoniaReportController.createKoinoniaReport);
router.get('/', koinoniaReportController.getAllKoinoniaReport);
router.get('/:id', koinoniaReportController.getKoinoniaReportById);
router.put('/:id', koinoniaReportController.updateKoinoniaReport);
router.delete('/:id', koinoniaReportController.deleteKoinoniaReport);

export default router;
