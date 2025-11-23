import { NextResponse } from 'next/server'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { BadRequestError } from '@/domain/errors/bad-request-error'

type MakeUsecase<T = unknown> = () => { findById: (id: string) => Promise<T> }

export const createFindHandler = <T = unknown>(makeUsecase: MakeUsecase<T>) => {
  return async function GET(req: Request) {
    try {
      const url = new URL(req.url)
      const parts = url.pathname.split('/').filter(Boolean)
      const id = parts[parts.length - 1]

      const usecase = makeUsecase()
      const result = await usecase.findById(id)

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
