import { NextResponse } from 'next/server'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { ValidationError } from '@/domain/errors/validation-error'
import { BusinessRuleError } from '@/domain/errors/business-rule-error'
import { NotFoundError } from '@/domain/errors/not-found-error'
import { toProblemDetails } from '@/app/api/_handlers/to-problem-details'

type MakeUsecase<T = unknown> = () => { create: (data: T) => Promise<unknown> }

export const createCreateHandler = <T = unknown>(makeUsecase: MakeUsecase<T>) => {
  return async function POST(req: Request) {
    try {
      const body = await req.json()

      const usecase = makeUsecase()
      const result = await usecase.create(body)

      return NextResponse.json(result, { status: 201 })
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
