import * as express from 'express';
import * as DB from '../models';
import type { Room, User, Chat } from '../types';

export async function getAllChatInTheRoom(
  req: express.Request,
  res: express.Response,
) {
  try {
    const roomId = req.params.id;
    const chatList = await DB.getAllDocumentsinCollection({
      collectionName: 'rooms',
      documentName: roomId,
      subCollectionName: 'chat',
    });
    if (chatList) {
      res.status(200);
      res.send(chatList);
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

export async function addChat(req: express.Request, res: express.Response) {
  try {
    const roomId = req.params.id;
    const chat: Chat = {
      ...req.body,
      timestamp: new Date(),
    };
    const newChat = await DB.createADocument({
      collectionName: 'rooms',
      documentName: roomId,
      subCollectionName: 'chat',
      data: chat,
    });
    if (newChat) {
      res.status(200);
      res.send(newChat);
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
