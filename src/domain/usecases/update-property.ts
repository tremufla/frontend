import { PropertyModel } from '@/domain/models/property-model'

export interface UpdateProperty {
  update(id: string, data: Partial<PropertyModel>): Promise<PropertyModel>
}
