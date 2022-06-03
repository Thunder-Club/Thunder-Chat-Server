import * as express from 'express';

export async function getAllUserInTheRoom(
  req: express.Request,
  res: express.Response,
) {
  try {
    // TODO: Get all user in the room
    res.status(200);
    // TODO: send users
    // res.send(...);
    res.send('Get all users in the room');
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function getUser(req: express.Request, res: express.Response) {
  try {
    // TODO: Get a user
    res.status(200);
    // TODO: send a user
    // res.send(...);
    res.send('Get a user');
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function addUser(req: express.Request, res: express.Response) {
  try {
    res.status(201);
    // TODO: add a user in the room
    // res.send(...);
    res.send('Add a user in the room');
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function updateUser(req: express.Request, res: express.Response) {
  try {
    // TODO: Update the user
    res.status(202);
    // TODO: send updated user
    // res.send(...);
    res.send('Update the user');
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function deleteUser(req: express.Request, res: express.Response) {
  try {
    // TODO: Delete the user
    res.status(204);
    res.send('Delete the user');
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}
