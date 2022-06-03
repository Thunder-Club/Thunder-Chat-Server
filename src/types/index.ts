type LocationLevel = 0 | 1 | 2 | 3;
type PlanetLevel = 'Earth' | 'Mars';

export interface Room {
  roomId: string;
  name: string;
  locationLevel: LocationLevel;
  participantCount: number;
  location: {
    planet: PlanetLevel;
    country: string | null;
    city: string | null;
    locality: string | null;
  };
}

export interface User {
  userId: string;
  name: string;
  profileImageUrl: string;
}

export interface Chat {
  chatId: string;
  message: string;
  senderId: string;
  timestamp: Date;
}
