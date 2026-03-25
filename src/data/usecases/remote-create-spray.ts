import { CreateSpray } from '@/domain/usecases/create-spray';
import { CreateSprayParams, SprayModel } from '@/domain/models/spray-model';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import { throwProblemDetails } from '@/domain/errors/throw-problem-details';
import { HttpPostClient } from '../protocols/http/http-post-client';

export class RemoteCreateSpray implements CreateSpray {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<CreateSprayParams, SprayModel>
  ) {}

  async create(data: CreateSprayParams): Promise<SprayModel> {
    const response = await this.httpPostClient.post({ url: this.url, body: data });

    console.log('Response from create spray API:', response);

    switch (response.statusCode) {
      case 201:
      case 200:
        return response.body!;
      case 401:
        throw new InvalidCredentialsError();
      case 400:
      case 404:
      case 500:
        throwProblemDetails(response.body);
        break;
      default:
        throw new UnexpectedError();
    }
  }
}
