import { RemoteGetAllProperties } from '@/data/usecases/remote-get-all-properties'
import { GetAllProperties } from '@/domain/usecases/get-all-properties'
import { makeApiUrl } from '../http/axios-http-client-factory'
import { makeAxiosHttpClient } from '../http/api-url-factory'
import { apiRoutes } from '@/main/routes/api-routes'
import { PropertyModel } from '@/domain/models/property-model'

export const makeRemoteGetAllProperties = (): GetAllProperties =>
  new RemoteGetAllProperties(
    makeApiUrl(apiRoutes.propertyLean),
    makeAxiosHttpClient<void, PropertyModel[]>()
  )
