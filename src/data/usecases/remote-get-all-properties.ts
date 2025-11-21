import { PropertyModel } from '@/domain/models/property-model';
import { GetAllProperties } from '@/domain/usecases/get-all-properties';
import { HttpGetClient } from '../protocols/http/http-get-client';
import { HttpStatusCode } from '../protocols/http/http-response';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { BadRequestError } from '@/domain/errors/bad-request-error';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import { mockProperty } from '../../../test/data/usecases/mock-property';

export class RemoteGetAllProperties implements GetAllProperties {
  constructor(private readonly url: string, private readonly httpGetClient: HttpGetClient<void, PropertyModel[]>) {}

  async getAll(): Promise<PropertyModel[]> {
    const isDev = process.env.IS_DEV === "true";

    if (isDev) {
      const items: PropertyModel[] = Array.from({ length: 6 }).map(mockProperty);

      return items;
    }

    const httpResponse = await this.httpGetClient.get({
      url: this.url,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body!;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      case HttpStatusCode.badRequest:
        throw new BadRequestError();
      default:
        throw new UnexpectedError();
    }
  }
}
