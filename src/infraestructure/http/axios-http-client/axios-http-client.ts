import { HttpGetClient, HttpGetParams } from '@/data/protocols/http/http-get-client';
import { HttpPostClient, HttpPostParams } from '@/data/protocols/http/http-post-client';
import { HttpPatchClient, HttpPatchParams } from '@/data/protocols/http/http-patch-client';
import { HttpResponse } from '@/data/protocols/http/http-response';
import axios, { AxiosError } from 'axios';

function extractHttpResponse<Res>(error: unknown): HttpResponse<Res> {
  if (error instanceof AxiosError && error.response) {
    return {
      statusCode: error.response.status,
      body: error.response.data as Res,
    };
  }
  throw error;
}

export class AxiosHttpClient<Req = unknown, Res = unknown>
  implements HttpGetClient<Req, Res>, HttpPostClient<Req, Res>, HttpPatchClient<Req, Res>
{
  async get(params: HttpGetParams<Req>): Promise<HttpResponse<Res>> {
    try {
      const httpResponse = await axios.get(params.url, { data: params.body as unknown });
      return { statusCode: httpResponse.status, body: httpResponse.data as Res };
    } catch (error) {
      return extractHttpResponse<Res>(error);
    }
  }

  async post(params: HttpPostParams<Req>): Promise<HttpResponse<Res>> {
    try {
      const httpResponse = await axios.post(params.url, params.body);
      return { statusCode: httpResponse.status, body: httpResponse.data as Res };
    } catch (error) {
      return extractHttpResponse<Res>(error);
    }
  }

  async patch(params: HttpPatchParams<Req>): Promise<HttpResponse<Res>> {
    try {
      const httpResponse = await axios.patch(params.url, params.body);
      return { statusCode: httpResponse.status, body: httpResponse.data as Res };
    } catch (error) {
      return extractHttpResponse<Res>(error);
    }
  }
}
