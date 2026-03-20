import { RemoteCreatePulverizacao } from '@/data/usecases/remote-create-pulverizacao';
import { CreatePulverizacao } from '@/domain/usecases/create-pulverizacao';
import { makeApiUrl } from '../http/axios-http-client-factory';
import { apiRoutes } from '@/main/routes/api-routes';
import { makeAxiosHttpClient } from '../http/api-url-factory';
import { CreatePulverizacaoParams, PulverizacaoModel } from '@/domain/models/pulverizacao-model';

export const makeRemoteCreatePulverizacao = (): CreatePulverizacao =>
  new RemoteCreatePulverizacao(
    makeApiUrl(apiRoutes.createPulverizacao),
    makeAxiosHttpClient<CreatePulverizacaoParams, PulverizacaoModel>()
  )
