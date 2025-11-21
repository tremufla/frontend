import { HttpResponse } from "./http-response"

export type HttpGetParams<T> = {
  url: string
  body?: T
}

export interface HttpGetClient<T, R> {
  get (params: HttpGetParams<T>): Promise<HttpResponse<R>>
}
