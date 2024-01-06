import Router from 'express';
import { registerValidator, loginValidator } from '../middleware/user-validation.middleware';
import userController from '../controllers/user-controller';

const router = Router();

router.post('/register', registerValidator, () => userController.registration);
router.post('/login', loginValidator, () => userController.login);
router.post('/logout', () => userController.logout);
router.get('/activate/:link', () => userController.activate);
router.get('/refresh', () => userController.refresh);

export default router;