import { IHttpClient } from "../../src/common/interfaces/IHttpClient";

export class HttpClientMock implements IHttpClient{
    sendRequest=jest.fn()
}