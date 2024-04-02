import { Router } from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { Container } from 'typedi';

import WorkerControllers from '../controllers/worker.controller';
import { checkPermission, checkAdminJwt, addWorker } from '../middlewares';
import { multerOpts } from '../utils/cloudinary';

const storage = new CloudinaryStorage(multerOpts);
const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 2 } });

// We use typedi to get instances of the controllers (i.e the decorated classes [with @Service()])
const workerController = Container.get(WorkerControllers);

// We use express.Router() to create a new router object
const router = Router();

router.post('/', addWorker, workerController.createWorker);
router.put('/:id', upload.single('profilePicture'), workerController.uploadProfilePicture);
router.get('/', [checkAdminJwt, checkPermission], workerController.getAllWorkers);
router.get('/:id', [checkAdminJwt, checkPermission], workerController.getWorkerById);
router.patch('/:id', [checkAdminJwt, checkPermission, addWorker], workerController.updateWorker);
router.delete('/:id', [checkAdminJwt, checkPermission], workerController.deleteWorker);

export default router;