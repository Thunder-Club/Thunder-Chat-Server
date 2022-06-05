export type LocationLevel = 0 | 1 | 2 | 3;
export type PlanetLevel = 'Earth' | 'Mars';
export type Location = {
  country: string;
  city: string;
  locality: string;
};
export interface Room {
  roomId: string;
  roomname: string;
  locationLevel: LocationLevel;
  participantCount: number;
  location: Location;
}

export interface User {
  userId: string;
  roomId: string;
  username: string;
  profileImageUrl: string;
  locationPermit: boolean;
  location: Location | null;
}

export interface Chat {
  message: string;
  senderId: string;
  timestamp: Date;
}
