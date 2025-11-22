import { createCreateHandler } from '@/app/api/_handlers/create-handler'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { BadRequestError } from '@/domain/errors/bad-request-error'
import { faker } from '@faker-js/faker'

type SutTypes = {
  handler: ReturnType<typeof createCreateHandler>
  createSpy: jest.Mock
}

const makeSut = (): SutTypes => {
  const createSpy = jest.fn()
  const handler = createCreateHandler(() => ({ create: createSpy }))

  return {
    handler,
    createSpy,
  }
}

describe('createCreateHandler', () => {
  const payload = { name: faker.company.name() }

  test('should call usecase.create and return 201 with body on success', async () => {
    const result = { id: faker.string.uuid(), ...payload }
    const { handler, createSpy } = makeSut()

    createSpy.mockResolvedValueOnce(result)

    const req = new Request('http://localhost', { method: 'POST', body: JSON.stringify(payload) })
    const res: any = await handler(req)

    expect(res.status).toBe(201)
    expect(createSpy).toHaveBeenCalledWith(payload)
    const body = await res.json()
    expect(body).toEqual(result)
  })

  test('should map InvalidCredentialsError to 401', async () => {
    const { handler, createSpy } = makeSut()
    createSpy.mockRejectedValueOnce(new InvalidCredentialsError())

    const req = new Request('http://localhost', { method: 'POST', body: JSON.stringify(payload) })
    const res: any = await handler(req)

    expect(res.status).toBe(401)
    const body = await res.json()
    expect(body).toHaveProperty('error')
  })

  test('should map BadRequestError to 400', async () => {
    const { handler, createSpy } = makeSut()
    createSpy.mockRejectedValueOnce(new BadRequestError())

    const req = new Request('http://localhost', { method: 'POST', body: JSON.stringify(payload) })
    const res: any = await handler(req)

    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body).toHaveProperty('error')
  })

  test('should map generic errors to 500', async () => {
    const { handler, createSpy } = makeSut()
    createSpy.mockRejectedValueOnce(new Error('boom'))

    const req = new Request('http://localhost', { method: 'POST', body: JSON.stringify(payload) })
    const res: any = await handler(req)

    expect(res.status).toBe(500)
    const body = await res.json()
    expect(body).toHaveProperty('error')
  })
})
