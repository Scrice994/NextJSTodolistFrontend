import { IHttpClient, Request } from "../../src/network/httpClient/HttpClient";

export class HttpClientMock implements IHttpClient<any>{
    sendRequest=jest.fn()
}