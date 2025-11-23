import { HttpResponse } from './http-response'

export type HttpPatchParams<T> = {
  url: string
  body?: T
}

export interface HttpPatchClient<T, R> {
  patch(params: HttpPatchParams<T>): Promise<HttpResponse<R>>
}
