import * as express from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as DB from '../models';

import { getRoom, getRoomWithId, createRoom, getMars } from '../helpers';
import type { User } from '../types';

export async function getAllUserInTheRoom(
  req: express.Request,
  res: express.Response,
) {
  try {
    const roomId = req.params.id;
    const allUsers = await DB.getSpecificDocuments({
      collectionName: 'users',
      field: 'roomId',
      key: roomId,
    });
    if (allUsers) {
      res.status(200);
      res.send(allUsers);
      res.end();
    } else {
      res.status(404);
      res.send(`no rooms found with id ${roomId} or no users in this room`);
      res.end();
    }
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function getUser(req: express.Request, res: express.Response) {
  try {
    const userId = req.params.id;
    const user = await DB.getADocument({
      collectionName: 'users',
      documentName: userId,
    });
    if (user) {
      res.status(200);
      res.send(user);
      res.end();
    } else {
      res.status(404);
      res.send(`no users found with id ${userId}`);
      res.end();
    }
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

// TODO
export async function addUser(req: express.Request, res: express.Response) {
  res.status(201);
  res.send('...coming soon!');
  res.end();
  try {
    const userInfo = req.body;
    const { locationPermit, location } = userInfo;
    let data: User;
    if (!locationPermit) {
      // Go to Mars
      const Mars = (
        await getRoom({
          roomname: 'Mars',
        })
      ).roomId;
      data = {
        ...req.body,
        userId: uuidv4(),
        roomId: Mars.roomId,
      };
    } else {
      // Go to Earth
      const room = await getRoom({
        location,
      });
      // check room is small enough?
      if (room.participantCount <= 20) {
        // Small -> lets go with this one
        data = {
          ...req.body,
          userId: uuidv4(),
          roomId: room.roomId,
        };
      } else {
        // check locationLevel
      }
    }
    // Create User
    const user = await DB.createADocument({
      collectionName: 'users',
      documentName: data.userId,
      data,
    });
    // Update User
    res.status(201);
    res.send(user);
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function updateUser(req: express.Request, res: express.Response) {
  try {
    const userId = req.params.id;
    const updates = req.body;
    const user = await DB.updateADocument({
      collectionName: 'users',
      documentName: userId,
      data: updates,
    });
    if (user) {
      res.status(200);
      res.send(user);
      res.end();
    } else {
      res.status(404);
      res.send(`no users found with id ${userId}`);
      res.end();
    }
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function deleteUser(req: express.Request, res: express.Response) {
  try {
    const userId = req.params.id;
    await DB.deleteADocument({
      collectionName: 'users',
      documentName: userId,
    });
    res.status(204);
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}
