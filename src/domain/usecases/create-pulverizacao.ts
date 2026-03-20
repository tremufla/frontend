import { CreatePulverizacaoParams, PulverizacaoModel } from '@/domain/models/pulverizacao-model'

export interface CreatePulverizacao {
  create(data: CreatePulverizacaoParams): Promise<PulverizacaoModel>
}
