import { Router } from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { Container } from 'typedi';

import WorkerControllers from '../controllers/worker.controller';
import { checkPermission, checkUserJwt } from '../middlewares';
import { multerOpts } from '../utils/cloudinary';

const storage = new CloudinaryStorage(multerOpts);
const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 2 } });

// We use typedi to get instances of the controllers (i.e the decorated classes [with @Service()])
const workerController = Container.get(WorkerControllers);

// We use express.Router() to create a new router object
const router = Router();

router.post('/', workerController.createWorker);
router.put('/:id', upload.single('profilePicture'), workerController.uploadProfilePicture);
router.get('/', [checkUserJwt, checkPermission], workerController.getAllWorkers);
router.get('/:id', [checkUserJwt, checkPermission], workerController.getWorkerById);
router.patch('/:id', [checkUserJwt, checkPermission], workerController.updateWorker);
router.delete('/:id', [checkUserJwt, checkPermission], workerController.deleteWorker);

export default router;
