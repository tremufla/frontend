import { toast } from 'sonner'
import { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form'
import { ValidationError } from '@/domain/errors/validation-error'
import { BusinessRuleError } from '@/domain/errors/business-rule-error'
import { NotFoundError } from '@/domain/errors/not-found-error'

/**
 * Trata erros de API no padrão RFC 7807 na camada de UI.
 *
 * - ValidationError   → associa cada mensagem ao campo do formulário via setError
 * - BusinessRuleError → exibe o detail como toast de erro
 * - NotFoundError     → exibe mensagem genérica de "não encontrado"
 * - qualquer outro    → exibe mensagem genérica de erro interno
 *
 * @param error    O erro capturado no catch
 * @param setError Função setError do react-hook-form (opcional, necessária para ValidationError)
 */
export function handleApiError<T extends FieldValues>(
  error: unknown,
  setError?: UseFormSetError<T>
): void {
  if (error instanceof ValidationError) {
    console.log('Validation errors:', error.errors)

    if (setError) {
      for (const [field, message] of Object.entries(error.errors)) {
        setError(field as FieldPath<T>, { type: 'server', message })
      }
    } else {
      // Fallback quando não há formulário: lista os erros em um toast
      const messages = Object.values(error.errors).join('\n')
      toast.error('Dados inválidos', { description: messages })
    }
    return
  }

  if (error instanceof BusinessRuleError) {
    toast.error('Operação não permitida', { description: error.detail })
    return
  }

  if (error instanceof NotFoundError) {
    toast.error('Não encontrado', {
      description: 'O recurso solicitado não foi encontrado.',
    })
    return
  }

  toast.error('Erro interno', {
    description: 'Ocorreu um erro inesperado. Tente novamente em breve.',
  })
}
