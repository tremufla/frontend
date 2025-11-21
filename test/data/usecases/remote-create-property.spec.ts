import { RemoteCreateProperty } from '@/data/usecases/remote-create-property'
import { HttpPostClientSpy } from '../mock/mock-http-client'
import { faker } from '@faker-js/faker'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { mockProperty } from './mock-property'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { BadRequestError } from '@/domain/errors/bad-request-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { CreatePropertyParams } from '@/domain/models/property-model'

type SutTypes = {
  sut: RemoteCreateProperty
  httpPostClientSpy: HttpPostClientSpy<CreatePropertyParams, any>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<CreatePropertyParams, any>()
  const sut = new RemoteCreateProperty(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy,
  }
}

describe('RemoteCreateProperty', () => {
  test('Should call HttpPostClient with correct URL and body', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)

    const body: CreatePropertyParams = {
      name: faker.company.name(),
      city: faker.location.city(),
      state: faker.location.state(),
      latitude: Number(faker.location.latitude()),
      longitude: Number(faker.location.longitude()),
    }

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.created,
      body: mockProperty(),
    }

    await sut.create(body)

    expect(httpPostClientSpy.url).toBe(url)
    expect(httpPostClientSpy.body).toEqual(body)
  })

  test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    }

    const promise = sut.create({} as CreatePropertyParams)

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('Should throw BadRequestError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    }

    const promise = sut.create({} as CreatePropertyParams)

    await expect(promise).rejects.toThrow(new BadRequestError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    }

    const promise = sut.create({} as CreatePropertyParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return a PropertyModel if HttpPostClient returns 201', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    const httpResult = mockProperty()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.created,
      body: httpResult,
    }

    const property = await sut.create({} as CreatePropertyParams)

    expect(property).toEqual(httpResult)
  })
})
