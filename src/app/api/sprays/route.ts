import { createCreateHandler } from '@/app/api/_handlers/create-handler'
import { makeRemoteCreateSpray } from '@/main/factories/usecases/remote-create-spray-factory'

export const POST = createCreateHandler(makeRemoteCreateSpray)
