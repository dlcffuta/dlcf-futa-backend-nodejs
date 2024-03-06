import { Router } from 'express';
import { Container } from 'typedi';

import AdminControllers from '../controllers/admin.controller';
import { checkUserJwt } from '../middlewares';

// We use typedi to get instances of the controllers (i.e the decorated classes [with @Service()])
const adminController = Container.get(AdminControllers);

// We use express.Router() to create a new router object
const router = Router();

router.post('/login', adminController.login);
router.post('/change-password', [checkUserJwt], adminController.changePassword);
router.post('/#/#/forgot-password', adminController.forgotPassword);

export default router;