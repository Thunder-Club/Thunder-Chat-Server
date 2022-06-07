import * as DB from '../models';
import { v4 as uuidv4 } from 'uuid';

export async function getMars(): Promise<{ [fieldPath: string]: any }> {
  const room = await DB.getSpecificDocuments({
    collectionName: 'rooms',
    field: 'roomname',
    key: 'Mars',
  });

  if (!room) {
    const newMars = await createRoom({
      location: null,
      locationLevel: 0,
      isMars: true,
    });
    return newMars;
  } else {
    return room[0];
  }
}

export async function getEarth(): Promise<{ [fieldPath: string]: any }> {
  const room = await DB.getSpecificDocuments({
    collectionName: 'rooms',
    field: 'roomname',
    key: 'Earth',
  });

  if (!room) {
    const newEarth = await createRoom({
      location: null,
      locationLevel: 0,
      isEarth: true,
    });
    return newEarth;
  } else {
    return room[0];
  }
}

export async function getRoom({
  location,
}: {
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
    if (possibleRoomName.length === 0) {
      return await getEarth();
    }
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
  location,
  locationLevel,
  isEarth = false,
  isMars = false,
}: {
  location: { [fieldPath: string]: any };
  locationLevel: number;
  isEarth?: boolean;
  isMars?: boolean;
}): Promise<{ [fieldPath: string]: any }> {
  const roomId = uuidv4();
  const roomname = isEarth
    ? 'Earth'
    : isMars
    ? 'Mars'
    : Object.values(location).join('/');
  const room = DB.createADocument({
    collectionName: 'rooms',
    documentName: roomId,
    data: {
      roomId,
      roomname,
      locationLevel,
      location,
    },
  });
  return room;
}

export async function getThisRoomIdOrNewRoomId({
  room,
  newUserLocation,
}: {
  room: { [fieldPath: string]: any };
  newUserLocation: { [fieldPath: string]: any };
}): Promise<string> {
  const { roomId, locationLevel, location } = room;

  const locationKeysToCheck = ['country', 'city', 'locality'];
  const locationKeyToCheck = locationKeysToCheck[locationLevel];

  const usersInTheRoom = await DB.getSpecificDocuments({
    collectionName: 'users',
    field: 'roomId',
    key: `${roomId}`,
  });

  // if user number in the room is too small just return the id
  if (usersInTheRoom && usersInTheRoom.length <= 19) {
    return roomId;
  }

  let usersInSameLocation = [];
  usersInTheRoom &&
    usersInTheRoom.filter((user) => {
      if (
        user.location[`${locationKeyToCheck}`] ==
        newUserLocation[`${locationKeyToCheck}`]
      ) {
        usersInSameLocation.push(user);
      }
    });

  if (usersInSameLocation.length >= 2) {
    // Create New Room
    const newRoom = await createRoom({
      location: {
        ...location,
        [locationKeyToCheck]: newUserLocation[`${locationKeyToCheck}`],
      },
      locationLevel: locationLevel + 1,
    });
    // update all previous user's roomId
    const newRoomId = newRoom.roomId;
    usersInSameLocation.forEach((user) => {
      DB.updateADocument({
        collectionName: 'users',
        documentName: `${user.userId}`,
        data: { ...user, roomId: newRoomId },
      });
    });
    // return newRoomId
    return newRoomId;
  } else {
    // no need to create new room
    // return original room id
    return roomId;
  }
}
