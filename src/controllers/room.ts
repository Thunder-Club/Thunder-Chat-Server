import * as express from 'express';
import * as DB from '../models';

export async function getRoom(req: express.Request, res: express.Response) {
  try {
    const roomId = req.params.id;
    const room = await DB.getADocument({
      collectionName: 'rooms',
      documentName: roomId,
    });
    if (room) {
      res.status(200);
      res.send(room);
      res.end();
    } else {
      res.status(404);
      res.send(`no rooms found with id ${roomId}`);
      res.end();
    }
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}
