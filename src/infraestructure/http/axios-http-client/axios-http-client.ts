import { HttpGetClient, HttpGetParams } from '@/data/protocols/http/http-get-client'
import { HttpResponse } from '@/data/protocols/http/http-response'
import axios from 'axios'

export class AxiosHttpClient<Req = unknown, Res = unknown> implements HttpGetClient<Req, Res> {
  async get (params: HttpGetParams<Req>): Promise<HttpResponse<Res>> {
    const httpResponse = await axios.get(params.url)
    return {
      statusCode: httpResponse.status,
      // cast here is safe because caller will type the client appropriately
      body: httpResponse.data as Res
    }
  }
}
