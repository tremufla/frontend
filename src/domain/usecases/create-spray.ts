import { CreateSprayParams, SprayModel } from '@/domain/models/spray-model'

export interface CreateSpray {
  create(data: CreateSprayParams): Promise<SprayModel>
}
