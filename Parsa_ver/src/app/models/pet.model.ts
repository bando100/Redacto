export interface Pet {
  id?: number;
  name: string;
  species: string;
  breed: string;
  age: number;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  lastVisit?: Date;
  notes?: string;
}
