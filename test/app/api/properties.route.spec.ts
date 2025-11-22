import { BadRequestError } from '@/domain/errors/bad-request-error'

jest.mock('@/main/factories/usecases/remote-create-property-factory', () => ({
  makeRemoteCreateProperty: jest.fn(),
}))

import { makeRemoteCreateProperty } from '@/main/factories/usecases/remote-create-property-factory'
import { POST } from '@/app/api/properties/route'
import { faker } from '@faker-js/faker'

type SutTypes = {
  postHandler: typeof POST
  createSpy: jest.Mock
}

const makeSut = (): SutTypes => {
  const createSpy = jest.fn()
  ;(makeRemoteCreateProperty as jest.Mock).mockImplementation(() => ({ create: createSpy }))

  return {
    postHandler: POST,
    createSpy,
  }
}

describe('POST /api/properties route', () => {
  const payload = { name: faker.company.name() }

  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('should return 201 and created object on success', async () => {
    const created = { id: faker.string.uuid(), ...payload }
    const { postHandler, createSpy } = makeSut()
    createSpy.mockResolvedValueOnce(created)

    const req = new Request('http://localhost', { method: 'POST', body: JSON.stringify(payload) })
    const res: any = await postHandler(req)

    expect(res.status).toBe(201)
    const body = await res.json()
    expect(body).toEqual(created)
    expect(createSpy).toHaveBeenCalledWith(payload)
  })

  test('should map domain errors from usecase', async () => {
    const { postHandler, createSpy } = makeSut()
    createSpy.mockRejectedValueOnce(new BadRequestError())

    const req = new Request('http://localhost', { method: 'POST', body: JSON.stringify(payload) })
    const res: any = await postHandler(req)

    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body).toHaveProperty('error')
  })
})
