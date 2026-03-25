import { NextResponse } from 'next/server'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { ValidationError } from '@/domain/errors/validation-error'
import { BusinessRuleError } from '@/domain/errors/business-rule-error'
import { NotFoundError } from '@/domain/errors/not-found-error'
import { toProblemDetails } from '@/app/api/_handlers/to-problem-details'

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

      if (err instanceof ValidationError) {
        return NextResponse.json(toProblemDetails(400, 'Dados inválidos', { errors: err.errors }), { status: 400 })
      }

      if (err instanceof BusinessRuleError) {
        return NextResponse.json(toProblemDetails(400, 'Regra de negócio violada', { detail: err.detail }), { status: 400 })
      }

      if (err instanceof NotFoundError) {
        return NextResponse.json(toProblemDetails(404, 'Não encontrado'), { status: 404 })
      }

      return NextResponse.json(toProblemDetails(500, 'Erro interno'), { status: 500 })
    }
  }
}
