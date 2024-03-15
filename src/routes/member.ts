import { Router } from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { Container } from 'typedi';

import MemberControllers from '../controllers/member.controller';
import { checkPermission, checkAdminJwt } from '../middlewares';
import { multerOpts } from '../utils/cloudinary';

const storage = new CloudinaryStorage(multerOpts);
const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 2 } });

// We use typedi to get instances of the controllers (i.e the decorated classes [with @Service()])
const memberController = Container.get(MemberControllers);

// We use express.Router() to create a new router object
const router = Router();

router.post('/', memberController.createMember);
router.put('/:id', upload.single('profilePicture'), memberController.uploadProfilePicture);
router.get('/', [checkAdminJwt, checkPermission], memberController.getAllMembers);
router.get('/:id', [checkAdminJwt, checkPermission], memberController.getMemberById);
router.patch('/:id', [checkAdminJwt, checkPermission], memberController.updateMember);
router.delete('/:id', [checkAdminJwt, checkPermission], memberController.deleteMember);

export default router;
