import { HttpGetClient, HttpGetParams } from '@/data/protocols/http/http-get-client';
import { HttpPostClient, HttpPostParams } from '@/data/protocols/http/http-post-client';
import { HttpResponse } from '@/data/protocols/http/http-response';
import axios from 'axios';

export class AxiosHttpClient<Req = unknown, Res = unknown>
  implements HttpGetClient<Req, Res>, HttpPostClient<Req, Res>
{
  async get(params: HttpGetParams<Req>): Promise<HttpResponse<Res>> {
    const httpResponse = await axios.get(params.url);

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data as Res,
    };
  }

  async post(params: HttpPostParams<Req>): Promise<HttpResponse<Res>> {
    const httpResponse = await axios.post(params.url, params.body);

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data as Res,
    };
  }
}
