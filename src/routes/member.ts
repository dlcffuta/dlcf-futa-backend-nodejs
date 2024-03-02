import MemberController from '../controllers/member.controllers';
import { Router } from 'express';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { Container } from 'typedi';
import multer from 'multer';
import { multerOpts } from '../utils/cloudinary';
  
  const storage = new CloudinaryStorage(multerOpts);
  const upload = multer({ storage: storage });

// We use typedi to get instances of the controllers (i.e the decorated classes [with @Service()])
const memberController = Container.get(MemberController);

// We use express.Router() to create a new router object
const router = Router();

router.post('/', memberController.createMember);

export default router;
