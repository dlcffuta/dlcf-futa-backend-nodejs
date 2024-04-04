import { Router } from 'express';
import { Container } from 'typedi';

import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

import UnitControllers from '../controllers/unit.controller';
import { checkPermission, checkAdminJwt, addUnit, updateUnit } from '../middlewares';
import { multerOpts } from '../utils/cloudinary';

const storage = new CloudinaryStorage(multerOpts);
const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 2 } });

// We use typedi to get instances of the controllers (i.e the decorated classes [with @Service()])
const unitController = Container.get(UnitControllers);

// We use express.Router() to create a new router object
const router = Router();

router.post('/', [checkAdminJwt, checkPermission, addUnit], unitController.createUnit);
router.get('/', unitController.getAllUnits);
router.get('/:id', [checkAdminJwt, checkPermission], unitController.getUnitById);
router.patch('/:id', [checkAdminJwt, checkPermission, updateUnit], unitController.updateUnit);
router.delete('/:id', [checkAdminJwt, checkPermission], unitController.deleteUnit);
router.put(
  '/upload/:id',
  [upload.single('profilePicture'), checkAdminJwt, checkPermission],
  unitController.uploadUnitImagePicture,
);

export default router;
