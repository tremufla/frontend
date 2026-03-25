export type ProblemDetails = {
  type?: string
  title: string
  status: number
  detail?: string
  instance?: string
  errors?: Record<string, string>
}

export function isProblemDetails(value: unknown): value is ProblemDetails {
  return (
    typeof value === 'object' &&
    value !== null &&
    'title' in value &&
    'status' in value
  )
}
