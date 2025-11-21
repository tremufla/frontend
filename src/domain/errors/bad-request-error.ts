export class BadRequestError extends Error {
  constructor (message: string = 'Algo de errado aconteceu. Tente novamente em breve.') {
    super(message)
    this.name = 'BadRequestError'
  }
}
