import { Router } from 'express';
import { Container } from 'typedi';

import SchoolControllers from '../controllers/school.controller';
import { checkPermission, checkUserJwt, addSchool, updateSchool } from '../middlewares';

// We use typedi to get instances of the controllers (i.e the decorated classes [with @Service()])
const schoolController = Container.get(SchoolControllers);

// We use express.Router() to create a new router object
const router = Router();

router.post('/', [checkUserJwt, checkPermission, addSchool], schoolController.createSchool);
router.get('/', schoolController.getAllSchools);
router.get('/:id', [checkUserJwt, checkPermission], schoolController.getSchoolById);
router.patch('/:id', [checkUserJwt, checkPermission, updateSchool], schoolController.updateSchool);
router.delete('/:id', [checkUserJwt, checkPermission], schoolController.deleteSchool);

export default router;
