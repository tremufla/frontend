import { CreateSpray } from '@/domain/usecases/create-spray';
import { CreateSprayParams, SprayModel } from '@/domain/models/spray-model';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { BadRequestError } from '@/domain/errors/bad-request-error';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import { faker } from '@faker-js/faker';
import { HttpPostClient } from '../protocols/http/http-post-client';

export class RemoteCreateSpray implements CreateSpray {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<CreateSprayParams, SprayModel>
  ) {}

  async create(data: CreateSprayParams): Promise<SprayModel> {
    const isDev = process.env.IS_DEV === 'true';

    if (isDev) {
      return {
        id: faker.string.uuid(),
        ...data,
      };
    }

    const response = await this.httpPostClient.post({ url: this.url, body: data });

    switch (response.statusCode) {
      case 201:
      case 200:
        return response.body!;
      case 401:
        throw new InvalidCredentialsError();
      case 400:
        throw new BadRequestError();
      default:
        throw new UnexpectedError();
    }
  }
}
