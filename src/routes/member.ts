import MemberController from '../controllers/member.controllers';
import { Router } from 'express';
import { Container } from 'typedi';
import { checkUserJwt } from '../middlewares/checkUserJwt';

// We use typedi to get instances of the controllers (i.e the decorated classes [with @Service()])
const memberController = Container.get(MemberController);

// We use express.Router() to create a new router object
const router = Router();

router.post('/', memberController.createMember);

export default router;
