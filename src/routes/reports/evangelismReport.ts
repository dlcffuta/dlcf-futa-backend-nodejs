import { Router } from 'express';
import EvangelismReportController from '../../controllers/reports.controller/evangelismReport';
import { Container } from 'typedi';
import { checkPermission, checkHallRepJwt } from '../../middlewares';

const router = Router();

const evangelismReportController = Container.get(EvangelismReportController);

router.post(
  '/',
  [checkHallRepJwt, checkPermission],
  evangelismReportController.createEvangelismReport,
);
router.get(
  '/',
  [checkHallRepJwt, checkPermission],
  evangelismReportController.getAllEvangelismReport,
);
router.get(
  '/:id',
  [checkHallRepJwt, checkPermission],
  evangelismReportController.getEvangelismReportById,
);
router.put(
  '/:id',
  [checkHallRepJwt, checkPermission],
  evangelismReportController.updateEvangelismReport,
);
router.delete(
  '/:id',
  [checkHallRepJwt, checkPermission],
  evangelismReportController.deleteEvangelismReport,
);

export default router;
