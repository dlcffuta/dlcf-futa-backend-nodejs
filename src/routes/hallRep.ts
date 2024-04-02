import { Router } from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { Container } from 'typedi';

import HallRepresentativeControllers from '../controllers/hallRep.controller';
import { checkPermission, checkHallRepJwt, checkAdminJwt } from '../middlewares';
import { multerOpts } from '../utils/cloudinary';

const storage = new CloudinaryStorage(multerOpts);
const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 2 } });

// We use typedi to get instances of the controllers (i.e the decorated classes [with @Service()])
const hallRepresentativeController = Container.get(HallRepresentativeControllers);

// We use express.Router() to create a new router object
const router = Router();

router.post(
  '/',
  [checkAdminJwt, checkPermission],
  hallRepresentativeController.createHallRepresentative,
);
router.put(
  '/:id',
  [checkHallRepJwt, checkPermission],
  upload.single('profilePicture'),
  hallRepresentativeController.uploadProfilePicture,
);
router.get(
  '/',
  [checkHallRepJwt, checkPermission],
  hallRepresentativeController.getAllHallRepresentatives,
);
router.get(
  '/:id',
  [checkHallRepJwt, checkPermission],
  hallRepresentativeController.getHallRepresentativeById,
);
router.patch(
  '/:id',
  [checkHallRepJwt, checkPermission],
  hallRepresentativeController.updateHallRepresentative,
);

export default router;
