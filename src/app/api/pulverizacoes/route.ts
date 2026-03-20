import { createCreateHandler } from '@/app/api/_handlers/create-handler'
import { makeRemoteCreatePulverizacao } from '@/main/factories/usecases/remote-create-pulverizacao-factory'

export const POST = createCreateHandler(makeRemoteCreatePulverizacao)
