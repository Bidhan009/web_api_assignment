import { Router, Request, Response} from 'express';
import { UserController } from '../controller/user.controller';

const router: Router = Router();

const userController = new UserController();

router.get('/api/users', userController.getUsers);
router.get('/api/users/:id', userController.getUserById);
router.post('/api/users',userController.createUser);
router.put('/api/users/:id',userController.updateUserById);
router.delete('/api/users/:id',userController.deleteUserById);


export default router;