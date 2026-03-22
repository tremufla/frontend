export type SprayModel = {
  id: string;
  propertyId?: string;
  sprayType: string;
  date: Date;
  activeIngredients?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export type CreateSprayParams = Omit<SprayModel, 'id'>
