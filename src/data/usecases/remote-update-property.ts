import { UpdateProperty } from '@/domain/usecases/update-property'
import { PropertyModel } from '@/domain/models/property-model'
import { HttpPatchClient } from '@/data/protocols/http/http-patch-client'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { BadRequestError } from '@/domain/errors/bad-request-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { faker } from '@faker-js/faker'

export class RemoteUpdateProperty implements UpdateProperty {
  constructor(private readonly url: string, private readonly httpPatchClient: HttpPatchClient<Partial<PropertyModel>, PropertyModel>) {}

  async update(id: string, data: Partial<PropertyModel>): Promise<PropertyModel> {
    const isDev = process.env.IS_DEV === 'true'

    if (isDev) {
      return {
        id: id,
        name: data.name ?? 'Updated',
        city: data.city,
        state: data.state,
        latitude: data.latitude ?? 0,
        longitude: data.longitude ?? 0,
      } as PropertyModel
    }

    const response = await this.httpPatchClient.patch({ url: `${this.url}/${id}`, body: data })

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body!
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      case HttpStatusCode.badRequest:
        throw new BadRequestError()
      default:
        throw new UnexpectedError()
    }
  }
}
