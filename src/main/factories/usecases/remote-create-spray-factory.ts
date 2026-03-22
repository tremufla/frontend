import { RemoteCreateSpray } from '@/data/usecases/remote-create-spray';
import { CreateSpray } from '@/domain/usecases/create-spray';
import { makeApiUrl } from '../http/axios-http-client-factory';
import { apiRoutes } from '@/main/routes/api-routes';
import { makeAxiosHttpClient } from '../http/api-url-factory';
import { CreateSprayParams, SprayModel } from '@/domain/models/spray-model';

export const makeRemoteCreateSpray = (): CreateSpray =>
  new RemoteCreateSpray(
    makeApiUrl(apiRoutes.createSpray),
    makeAxiosHttpClient<CreateSprayParams, SprayModel>()
  )
