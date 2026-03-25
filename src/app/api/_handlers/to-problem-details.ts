import { ProblemDetails } from '@/domain/errors/problem-details'

export function toProblemDetails(
  status: number,
  title: string,
  extra?: Partial<Pick<ProblemDetails, 'detail' | 'errors'>>
): ProblemDetails {
  return { type: 'about:blank', title, status, ...extra }
}
