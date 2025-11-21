import { CreatePropertyParams, PropertyModel } from '@/domain/models/property-model'

export interface CreateProperty {
  create(data: CreatePropertyParams): Promise<PropertyModel>
}
