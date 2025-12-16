import { GetApplicationScheduleMapByRisk, Location } from '@/domain/usecases/get-application-schedule-map-by-risk'
import { mapApplicationScheduleDtoToModel } from '@/lib/mappers/applicationScheduleMapper'
import { ApplicationScheduleByRiskModel } from '@/domain/models/application-schedule-by-risk-model'
import { HttpGetClient } from '@/data/protocols/http/http-get-client'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { BadRequestError } from '@/domain/errors/bad-request-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { ApplicationScheduleByRiskDto } from '@/lib/types/ApplicationScheduleByRiskDto'
export class RemoteGetApplicationScheduleMapByRisk implements GetApplicationScheduleMapByRisk {
  constructor(private readonly url: string, private readonly httpGetClient: HttpGetClient<Location | void, ApplicationScheduleByRiskDto>) {}

  async mapView(location?: Location): Promise<ApplicationScheduleByRiskModel> {
    const url = this.url

  const body = location ?? undefined
  const httpResponse = await this.httpGetClient.get({ url, body })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return mapApplicationScheduleDtoToModel(httpResponse.body!)
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      case HttpStatusCode.badRequest:
        throw new BadRequestError()
      default:
        throw new UnexpectedError()
    }
  }
}
