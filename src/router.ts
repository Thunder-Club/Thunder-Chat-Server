import * as express from 'express';
import * as controllers from './controllers';

const router = express.Router();

router.get(
  '/',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send('Server is running 🚀');
  },
);

router.get(
  '**',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(404);
    res.send('Page Not Found');
  },
);

router.post('/room', controllers.createRoom);
router.get('/room/:id', controllers.getRoom);
router.patch('/room/:id', controllers.updateRoom);
router.delete('/room/:id', controllers.deleteRoom);

router.get('/room/:id/user', controllers.getAllUserInTheRoom);
router.get('/user/:id', controllers.getUser);
router.post('/room/:id/user', controllers.addUser);
router.patch('/user/:id', controllers.updateUser);
router.delete('/user/:id', controllers.deleteUser);

router.get('/room/:id/chat', controllers.getAllChatInTheRoom);
router.get('/chat/:id', controllers.getChat);
router.post('/room/:id/chat', controllers.addChat);
router.delete('/chat/:id', controllers.deleteChat);

export default router;
