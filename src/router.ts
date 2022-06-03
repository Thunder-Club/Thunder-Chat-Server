import * as express from 'express';

const router = express.Router();

router.get(
  '/',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send('Server is running 🚀');
  },
);

router.get(
  '/test',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send('Welcome to Test Route!');
  },
);

export default router;
