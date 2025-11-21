
import { faker } from '@faker-js/faker';

import { HttpGetParams } from '@/data/protocols/http/http-get-client'

export const mockGetRequest = (): HttpGetParams<any> => ({
  url: faker.internet.url(),
  body: faker.airline.airline()
})
