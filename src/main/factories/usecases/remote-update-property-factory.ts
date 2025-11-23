import { RemoteUpdateProperty } from '@/data/usecases/remote-update-property'
import { UpdateProperty } from '@/domain/usecases/update-property'
import { makeApiUrl } from '../http/axios-http-client-factory'
import { apiRoutes } from '@/main/routes/api-routes'
import { makeAxiosHttpClient } from '../http/api-url-factory'

export const makeRemoteUpdateProperty = (): UpdateProperty =>
  new RemoteUpdateProperty(
    makeApiUrl(apiRoutes.updateProperty),
    makeAxiosHttpClient()
  )
