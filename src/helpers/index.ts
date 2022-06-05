import * as DB from '../models';
import { v4 as uuidv4 } from 'uuid';

export async function getMars(): Promise<{ [fieldPath: string]: any }> {
  const room = await DB.getSpecificDocuments({
    collectionName: 'rooms',
    field: 'roomname',
    key: 'Mars',
  });

  if (room === []) {
    const newMars = await createRoom({ roomname: 'Mars' });
    return newMars;
  } else {
    return room[0];
  }
}

export async function getRoom({
  roomname,
  location,
}: {
  roomname?: string;
  location?: {
    country: string;
    city: string;
    locality: string;
  };
}): Promise<{ [fieldPath: string]: any }> {
  // in Mars
  if (!location) {
    const Mars = await getMars();
    return Mars;
  }

  // in Earth
  let room;
  let possibleRoomName = Object.values(location);
  while (!!!room) {
    room = await DB.getSpecificDocuments({
      collectionName: 'rooms',
      field: 'roomname',
      key: `${possibleRoomName.join('/')}`,
    });
    possibleRoomName.pop();
  }
  return room[0];
}

export async function getRoomWithId({
  roomId,
}: {
  roomId: string;
}): Promise<{ [fieldPath: string]: any }> {
  const room = await DB.getADocument({
    collectionName: 'rooms',
    documentName: roomId,
  });
  return room;
}

export async function createRoom({
  roomname,
}: {
  roomname: string;
}): Promise<{ [fieldPath: string]: any }> {
  const roomId = uuidv4();
  const localities = roomname.split('/');
  const locationLevel = localities.length - 1;
  const location =
    locationLevel >= 1
      ? {
          country: localities[0],
          city: localities[1],
          locality: localities[2],
        }
      : null;
  const room = DB.createADocument({
    collectionName: 'rooms',
    documentName: roomId,
    data: {
      roomId,
      roomname,
      participantCount: 0,
      locationLevel,
      location,
    },
  });
  return room;
}

export async function getUsersinSameLocation({
  room,
}: {
  room: { [fieldPath: string]: any };
}): Promise<void> {
  const { roomId, locationLevel, location } = room;
}
