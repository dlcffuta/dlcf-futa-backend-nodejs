import { Router } from 'express';
import EvangelismReportController from '../../controllers/reports.controller/evangelismReport';
import Container from 'typedi';
import { checkPermission, checkUserJwt, addHall } from '../../middlewares';

const router = Router();

const evangelismReportController = Container.get(EvangelismReportController);

router.post('/', evangelismReportController.createEvangelismReport);
router.get('/', evangelismReportController.getAllEvangelismReport);
router.get('/:id', evangelismReportController.getEvangelismReportById);
router.put('/:id', evangelismReportController.updateEvangelismReport);
router.delete('/:id', evangelismReportController.deleteEvangelismReport);

export default router;
