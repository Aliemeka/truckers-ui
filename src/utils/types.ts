export interface TruckType {
  id: number;
  name: string;
  imageSrc: string;
  range: string;
  color: string;
  driver: string;
}

export interface LocationType {
  id: number;
  truckId: number;
  longitude: number;
  latitude: number;
}
