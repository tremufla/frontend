import { RemoteFindPropertyById } from '@/data/usecases/remote-find-property-by-id'
import { FindPropertyById } from '@/domain/usecases/find-property-by-id'
import { makeApiUrl } from '../http/axios-http-client-factory'
import { apiRoutes } from '@/main/routes/api-routes'
import { makeAxiosHttpClient } from '../http/api-url-factory'
import { PropertyModel } from '@/domain/models/property-model'

export const makeRemoteFindPropertyById = (): FindPropertyById =>
  new RemoteFindPropertyById(
    makeApiUrl(apiRoutes.listAllProperties),
    makeAxiosHttpClient<void, PropertyModel>()
  )
