import { PropertyModel } from '@/domain/models/property-model'

export type CreatePropertyParams = Omit<PropertyModel, 'id'>

export interface CreateProperty {
  create(data: CreatePropertyParams): Promise<PropertyModel>
}
