import { RemoteGetApplicationScheduleMapByRisk } from '@/data/usecases/remote-get-application-schedule-map-by-risk'
import { GetApplicationScheduleMapByRisk, Location } from '@/domain/usecases/get-application-schedule-map-by-risk'
import { makeApiUrl } from '../http/axios-http-client-factory'
import { apiRoutes } from '@/main/routes/api-routes'
import { ApplicationScheduleByRiskDto } from '@/lib/types/ApplicationScheduleByRiskDto'
import { makeAxiosHttpClient } from '../http/api-url-factory'

export const makeRemoteGetApplicationScheduleMapByRisk = (): GetApplicationScheduleMapByRisk =>
  new RemoteGetApplicationScheduleMapByRisk(
    makeApiUrl(apiRoutes.applicationScheduleMapByRisk),
    makeAxiosHttpClient<Location, ApplicationScheduleByRiskDto>()
  )
