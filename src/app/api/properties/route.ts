import { NextResponse } from 'next/server'
import { makeRemoteCreateProperty } from '@/main/factories/usecases/remote-create-property-factory'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { BadRequestError } from '@/domain/errors/bad-request-error'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const createProperty = makeRemoteCreateProperty()

    const result = await createProperty.create(body)

    return NextResponse.json(result, { status: 201 })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return NextResponse.json({ error: err.message }, { status: 401 })
    }

    if (err instanceof BadRequestError) {
      return NextResponse.json({ error: err.message }, { status: 400 })
    }

    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message || 'unknown error' }, { status: 500 })
  }
}
