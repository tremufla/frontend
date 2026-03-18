import { PropertyModel } from '@/domain/models/property-model'
import { faker } from '@faker-js/faker'

const brazilianFarms = [
  { name: 'Fazenda Santa Cruz', city: 'Ribeirão Preto', state: 'SP', latitude: -21.1699, longitude: -47.8131 },
  { name: 'Fazenda Boa Vista', city: 'Uberlândia', state: 'MG', latitude: -18.9186, longitude: -48.2772 },
  { name: 'Fazenda São João', city: 'Sorriso', state: 'MT', latitude: -12.5469, longitude: -55.7214 },
  { name: 'Fazenda Três Irmãos', city: 'Rondonópolis', state: 'MT', latitude: -16.4703, longitude: -54.6362 },
  { name: 'Fazenda Ipê Amarelo', city: 'Luís Eduardo Magalhães', state: 'BA', latitude: -12.0964, longitude: -45.7897 },
  { name: 'Fazenda Cerrado Verde', city: 'Rio Verde', state: 'GO', latitude: -17.7992, longitude: -50.9269 },
  { name: 'Fazenda Água Limpa', city: 'Cascavel', state: 'PR', latitude: -24.9555, longitude: -53.4552 },
  { name: 'Fazenda Nova Esperança', city: 'Campo Grande', state: 'MS', latitude: -20.4697, longitude: -54.6201 },
  { name: 'Fazenda Bela Aurora', city: 'Barreiras', state: 'BA', latitude: -12.1522, longitude: -45.0042 },
  { name: 'Fazenda Terra Fértil', city: 'Passo Fundo', state: 'RS', latitude: -28.2622, longitude: -52.4086 },
]

export const mockProperty = (): PropertyModel => {
  const farm = faker.helpers.arrayElement(brazilianFarms)
  const latOffset = faker.number.float({ min: -0.5, max: 0.5 })
  const lngOffset = faker.number.float({ min: -0.5, max: 0.5 })

  return {
    id: faker.string.uuid(),
    name: farm.name,
    city: farm.city,
    state: farm.state,
    latitude: farm.latitude + latOffset,
    longitude: farm.longitude + lngOffset,
  }
}
