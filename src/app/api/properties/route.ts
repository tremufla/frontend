import { createCreateHandler } from '@/app/api/_handlers/create-handler'
import { makeRemoteCreateProperty } from '@/main/factories/usecases/remote-create-property-factory'

export const POST = createCreateHandler(makeRemoteCreateProperty)
