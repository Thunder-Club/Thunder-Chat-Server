import * as express from 'express';
import * as controllers from './controllers';

const router = express.Router();

router.get(
  '/',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send('Thunder Chat Server is running ⚡️');
  },
);

router.get('/room/:id', controllers.getRoom);

router.get('/room/:id/user', controllers.getAllUserInTheRoom);
router.get('/user/:id', controllers.getUser);
router.post('/user', controllers.addUser);
router.patch('/user/:id', controllers.updateUser);
router.delete('/user/:id', controllers.deleteUser);

router.get('/room/:id/chat', controllers.getAllChatInTheRoom);
router.post('/room/:id/chat', controllers.addChat);

router.get(
  '**',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(404);
    res.send('❌ Invalid Route');
  },
);

export default router;
