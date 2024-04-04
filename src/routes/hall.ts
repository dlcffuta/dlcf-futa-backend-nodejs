import { Router } from 'express';
import HallControllers from '../controllers/hall.controller';
import { Container } from 'typedi';
import { checkPermission, checkAdminJwt, addHall } from '../middlewares';

const router = Router();
const hallController = Container.get(HallControllers);

router.post('/', [checkAdminJwt, checkPermission, addHall], hallController.createHall);
router.get('/', hallController.getAllHalls);
router.get('/:id', [checkAdminJwt, checkPermission], hallController.getHallById);
router.put('/:id', [checkAdminJwt, checkPermission], hallController.updateHall);
router.delete('/:id', [checkAdminJwt, checkPermission], hallController.deleteHall);

export default router;
