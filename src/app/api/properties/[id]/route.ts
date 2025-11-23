import { createFindHandler } from '@/app/api/_handlers/find-handler'
import { createUpdateHandler } from '@/app/api/_handlers/update-handler'
import { makeRemoteFindPropertyById } from '@/main/factories/usecases/remote-find-property-by-id-factory'
import { makeRemoteUpdateProperty } from '@/main/factories/usecases/remote-update-property-factory'

export const GET = createFindHandler(makeRemoteFindPropertyById)
export const PATCH = createUpdateHandler(makeRemoteUpdateProperty)
