import { Router } from 'express';
import HallControllers from '../controllers/hall.controller';
import Container from 'typedi';
import { checkPermission, checkUserJwt, addHall } from '../middlewares';

const router = Router();
const hallController = Container.get(HallControllers);

router.post('/', [checkUserJwt, checkPermission, addHall], hallController.createHall);
router.get('/', hallController.getAllHalls);
router.get('/:id', [checkUserJwt, checkPermission], hallController.getHallById);
router.put('/:id', [checkUserJwt, checkPermission], hallController.updateHall);
router.delete('/:id', [checkUserJwt, checkPermission], hallController.deleteHall);

export default router;
