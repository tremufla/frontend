import { AxiosHttpClient } from '@/infraestructure/http/axios-http-client/axios-http-client'
import axios from 'axios'
import { mockGetRequest } from '../../../data/mock/mock-http-get'
import { mockAxios } from './mock/mock-axios'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockGetRequest()
    const { sut, mockedAxios } = makeSut()

    await sut.get(request)

    expect(mockedAxios.get).toHaveBeenCalledWith(request.url)
  })

  test('Should return the correct status code and body', () => {
    const { sut, mockedAxios } = makeSut()
    const axiosResponse = {
      data: 'any_data',
      status: 200
    }

    mockedAxios.get.mockResolvedValueOnce(axiosResponse)

    const promise = sut.get(mockGetRequest())

    return expect(promise).resolves.toEqual({ statusCode: axiosResponse.status, body: axiosResponse.data })
  })
})
