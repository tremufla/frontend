import { AxiosHttpClient } from "@/infraestructure/http/axios-http-client/axios-http-client";

export const makeAxiosHttpClient = <Req = unknown, Res = unknown>(): AxiosHttpClient<Req, Res> =>
	new AxiosHttpClient<Req, Res>()
