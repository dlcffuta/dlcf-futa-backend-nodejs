import { Router } from 'express';
import { Container } from 'typedi';

import CentreControllers from '../controllers/centre.controller';
import { checkPermission, checkUserJwt, addCentre } from '../middlewares';

// We use typedi to get instances of the controllers (i.e the decorated classes [with @Service()])
const centreController = Container.get(CentreControllers);

// We use express.Router() to create a new router object
const router = Router();

router.post('/', [checkUserJwt, checkPermission, addCentre], centreController.createCentre);
router.get('/', centreController.getAllCentres);
router.get('/:id', [checkUserJwt, checkPermission], centreController.getCentreById);
router.patch('/:id', [checkUserJwt, checkPermission], centreController.updateCentre);
router.delete('/:id', [checkUserJwt, checkPermission], centreController.deleteCentre);

export default router;
