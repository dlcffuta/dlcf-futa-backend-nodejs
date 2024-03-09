import { Router } from 'express';
import HallControllers from '../controllers/hall.controller';
import Container from 'typedi';
import { checkPermission, checkUserJwt, addHall } from '../middlewares';

const router = Router();
const hallController = Container.get(HallControllers);

router.post('/', [addHall], hallController.createHall);
router.get('/', hallController.getAllHalls);
router.get('/:id', hallController.getHallById);
router.put('/:id', hallController.updateHall);
router.delete('/:id', hallController.deleteHall);

export default router;
