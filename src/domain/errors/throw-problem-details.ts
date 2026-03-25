import { isProblemDetails } from './problem-details'
import { ValidationError } from './validation-error'
import { BusinessRuleError } from './business-rule-error'
import { NotFoundError } from './not-found-error'
import { UnexpectedError } from './unexpected-error'

/**
 * Analisa um corpo de resposta de erro no formato RFC 7807 e lança
 * o erro de domínio correspondente.
 */
export function throwProblemDetails(body: unknown): never {
  if (!isProblemDetails(body)) {
    throw new UnexpectedError()
  }

  const { status, title, detail, errors } = body

  if (status === 400 && title === 'Dados inválidos') {
    throw new ValidationError(errors ?? {})
  }

  if (status === 400 && title === 'Regra de negócio violada') {
    throw new BusinessRuleError(detail ?? 'Operação não permitida.')
  }

  if (status === 404) {
    throw new NotFoundError()
  }

  throw new UnexpectedError()
}
