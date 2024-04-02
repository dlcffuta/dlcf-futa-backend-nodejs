import { Router } from 'express';
import KoinoniaReportController from '../../controllers/reports.controller/koinoniaReport';
import Container from 'typedi';
import { checkPermission, checkHallRepJwt } from '../../middlewares';

const router = Router();

const koinoniaReportController = Container.get(KoinoniaReportController);

router.post('/', [checkHallRepJwt, checkPermission], koinoniaReportController.createKoinoniaReport);
router.get('/', [checkHallRepJwt, checkPermission], koinoniaReportController.getAllKoinoniaReport);
router.get(
  '/:id',
  [checkHallRepJwt, checkPermission],
  koinoniaReportController.getKoinoniaReportById,
);
router.put(
  '/:id',
  [checkHallRepJwt, checkPermission],
  koinoniaReportController.updateKoinoniaReport,
);
router.delete(
  '/:id',
  [checkHallRepJwt, checkPermission],
  koinoniaReportController.deleteKoinoniaReport,
);

export default router;
