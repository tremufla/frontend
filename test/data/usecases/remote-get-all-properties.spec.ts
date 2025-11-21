import { PropertyModel } from '@/domain/models/property-model';
import { HttpGetClientSpy } from '../mock/mock-http-client';
import { RemoteGetAllProperties } from '@/data/usecases/remote-get-all-properties';
import { faker } from '@faker-js/faker';
import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import { mockProperty } from './mock-property';
import { BadRequestError } from '@/domain/errors/bad-request-error';

type SutTypes = {
  sut: RemoteGetAllProperties;
  httpGetClientSpy: HttpGetClientSpy<void, PropertyModel[]>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<void, PropertyModel[]>();
  const sut = new RemoteGetAllProperties(url, httpGetClientSpy);

  return {
    sut,
    httpGetClientSpy,
  };
};

describe('RemoteGetAllProperties', () => {
  test('Should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url();

    const { sut, httpGetClientSpy } = makeSut(url);
    await sut.getAll();

    expect(httpGetClientSpy.url).toBe(url);
  });

  test('Should throw InvalidCredentialsError if HttpGetClient returns 401', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    };

    const promise = sut.getAll();

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  test('Should throw UnexpectedError if HttpGetClient returns 400', async () => {
    const { sut, httpGetClientSpy } = makeSut();

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };

    const promise = sut.getAll();

    await expect(promise).rejects.toThrow(new BadRequestError());
  });

  test('Should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { sut, httpGetClientSpy } = makeSut();

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };

    const promise = sut.getAll();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should return an list of PropertyModel if HttpGetClient returns 200', async () => {
    const { sut, httpGetClientSpy } = makeSut();

    const httpResult = [mockProperty(), mockProperty()];

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const properties = await sut.getAll();

    expect(properties).toEqual(httpResult);
  });
});
