export type PulverizacaoModel = {
  id: string;
  propertyId?: string;
  tipoPulverizacao: string;
  data: Date;
  principiosAtivos?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export type CreatePulverizacaoParams = Omit<PulverizacaoModel, 'id'>
