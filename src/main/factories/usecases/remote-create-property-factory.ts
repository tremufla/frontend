import { RemoteCreateProperty } from '@/data/usecases/remote-create-property'
import { CreateProperty } from '@/domain/usecases/create-property'
import { makeApiUrl } from '../http/axios-http-client-factory'
import { apiRoutes } from '@/main/routes/api-routes'
import { makeAxiosHttpClient } from '../http/api-url-factory'
import { CreatePropertyParams, PropertyModel } from '@/domain/models/property-model'

export const makeRemoteCreateProperty = (): CreateProperty =>
  new RemoteCreateProperty(
        makeApiUrl(apiRoutes.listAllProperties),
        makeAxiosHttpClient<CreatePropertyParams, PropertyModel>()
  )
