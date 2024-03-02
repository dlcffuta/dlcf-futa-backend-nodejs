import MemberControllers from '../controllers/member.controllers';
import { Router } from 'express';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { Container } from 'typedi';
import multer from 'multer';
import { multerOpts } from '../utils/cloudinary';

const storage = new CloudinaryStorage(multerOpts);
const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 2 } });

// We use typedi to get instances of the controllers (i.e the decorated classes [with @Service()])
const memberController = Container.get(MemberControllers);

// We use express.Router() to create a new router object
const router = Router();

router.post('/', memberController.createMember);
router.put('/:id', upload.single('profilePicture'), memberController.uploadProfilePicture);
router.get('/', memberController.getAllMembers);
router.get('/:id', memberController.getMemberById);
router.patch('/:id', memberController.updateMember);
router.delete('/:id', memberController.deleteMember);

export default router;