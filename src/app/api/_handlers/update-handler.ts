import { NextResponse } from 'next/server'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { BadRequestError } from '@/domain/errors/bad-request-error'

type MakeUsecase<T = unknown> = () => { update: (id: string, data: T) => Promise<unknown> }

export const createUpdateHandler = <T = unknown>(makeUsecase: MakeUsecase<T>) => {
  return async function PATCH(req: Request) {
    try {
      const url = new URL(req.url)
      const parts = url.pathname.split('/').filter(Boolean)
      const id = parts[parts.length - 1]

      const body = await req.json()

      const usecase = makeUsecase()
      const result = await usecase.update(id, body)

      return NextResponse.json(result, { status: 200 })
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
}
