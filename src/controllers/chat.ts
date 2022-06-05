import * as express from 'express';

export async function getAllChatInTheRoom(
  req: express.Request,
  res: express.Response,
) {
  try {
    // TODO: Get all chat in the room
    res.status(200);
    // TODO: send all chat
    // res.send(...);
    res.send('Get all chat in the room');
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function addChat(req: express.Request, res: express.Response) {
  try {
    // TODO: create a Chat
    res.status(201);
    // TODO: send a Chat
    // res.send(...);
    res.send('Create a Chat');
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}
