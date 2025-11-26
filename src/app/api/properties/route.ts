import { createCreateHandler } from '@/app/api/_handlers/create-handler'
import { makeRemoteCreateProperty } from '@/main/factories/usecases/remote-create-property-factory'
import { makeRemoteGetAllProperties } from '@/main/factories/usecases/remote-get-all-properties-factory'
import { NextResponse } from 'next/server'

export const POST = createCreateHandler(makeRemoteCreateProperty)

export async function GET() {
	try {
		const getAll = makeRemoteGetAllProperties()
		const properties = await getAll.getAll()

		return NextResponse.json(properties, { status: 200 })
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err)
		return NextResponse.json({ error: message || 'unknown error' }, { status: 500 })
	}
}
