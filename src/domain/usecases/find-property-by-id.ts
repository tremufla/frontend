import { PropertyModel } from '@/domain/models/property-model'

export interface FindPropertyById {
  findById(id: string): Promise<PropertyModel>
}
