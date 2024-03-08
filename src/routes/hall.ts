import { Router } from 'express';
import HallControllers from '../controllers/hall.controllers';
import Container from 'typedi';

const router = Router();
const hallController = Container.get(HallControllers);

router.route('/').post(hallController.createHall).get(hallController.getAllHalls);

router
  .route('/:id')
  .get(hallController.getHallById)
  .put(hallController.updateHall)
  .delete(hallController.deleteHall);

export default router;
