import * as express from 'express';

export async function getRoom(req: express.Request, res: express.Response) {
  try {
    // TODO: Get a room
    res.status(200);
    // TODO: send a room
    // res.send(...);
    res.send('Get a room');
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function createRoom(req: express.Request, res: express.Response) {
  try {
    // TODO: Get a room
    res.status(201);
    // TODO: send a room
    // res.send(...);
    res.send('Create a room');
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function updateRoom(req: express.Request, res: express.Response) {
  try {
    // TODO: Get a room
    res.status(202);
    // TODO: send a room
    // res.send(...);
    res.send('Update the room');
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function deleteRoom(req: express.Request, res: express.Response) {
  try {
    // TODO: Delete a room
    res.status(204);
    res.send('Delete the room');
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}
