export class UnexpectedError extends Error {
  constructor () {
    super('Ocorreu um erro interno. Tente novamente em breve.')
    this.name = 'UnexpectedError'
  }
}
