import UserController from '../controllers/user.controllers';
import { Router } from 'express';
import { Container } from 'typedi';
import { checkUserJwt } from '../middlewares/checkUserJwt';


// We use typedi to get instances of the controllers (i.e the decorated classes [with @Service()])
const userController = Container.get(UserController);

// We use express.Router() to create a new router object
const router = Router();

router.get('/', checkUserJwt, userController.getUserById);

// * POST /register: Allows users to create new account
router.post('/register',  userController.createUser);

// * POST /login: Allows users to login to their account
router.post('/login', userController.loginUser);

router.get('/all', userController.getAllUsers);

router.patch('/update', checkUserJwt, userController.updateUser);


export default router;