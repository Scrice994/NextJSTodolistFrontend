import { DataDistributor } from "../../../src/network/httpClient/DataDistributor";
import { HttpClientMock } from "../../__mocks__/httpClient.mock"

describe("unit", () => {
    describe("dataDistributor", () => {
        describe("fetchData()", () => {

            const httpClientMock = new HttpClientMock();
            const dataDistributor = new DataDistributor(httpClientMock);
            const successFakeRespone = { response: {
                text: 'testText',
                completed: false,
                userId: 'testUserId'
            }};

            const errorFakeResponse = { response: {
                message: 'New Error'
            }};

            it("Should return correct data when api request runs successfully",async () => {
                httpClientMock.sendRequest.mockImplementationOnce(() => Promise.resolve(successFakeRespone));

                const response = await dataDistributor.fetchData('/fakeUrl', { method: 'get' });

                expect(response).toEqual(successFakeRespone.response);
            });

            it("Should return a message when an error occour",async () => {
                httpClientMock.sendRequest.mockImplementationOnce(() => Promise.resolve(errorFakeResponse));

                const response = await dataDistributor.fetchData('/fakeUrl', { method: 'get' });

                expect(response).toEqual({ message: 'New Error' });
            })
        });
    });
});