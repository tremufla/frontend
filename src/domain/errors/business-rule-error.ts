export class BusinessRuleError extends Error {
  constructor(public readonly detail: string) {
    super(detail)
    this.name = 'BusinessRuleError'
  }
}
