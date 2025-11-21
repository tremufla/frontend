import { PropertyModel } from '@/domain/models/property-model'
import { faker } from '@faker-js/faker'

export const mockProperty = (): PropertyModel => ({
  id: faker.string.uuid(),
  name: faker.company.name(),
  longitude: faker.location.longitude(),
  latitude: faker.location.latitude()
})
