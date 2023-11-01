import { HttpClient } from "../../../src/network/httpClient/HttpClient";
import * as testUtils from "../mongoTestUtils";

describe("unit", () => {
    describe("httpClient()", () => {

        beforeAll(async () => {
            await testUtils.databaseConnection();
        });
 
         beforeEach(async () => {
            await testUtils.clearDB();
        });
 
         afterAll(async () => {
            await testUtils.clearDB();
            await testUtils.closeDatabaseConnection();
        });

        const httpClient = new HttpClient();

        describe("sendRequest()", () => {
            it("should do the http request successfully",async () => {
                const response = await httpClient.sendRequest("/todos", { 
                    method: 'get'
                });

                expect(response.response).toEqual([]);
            });
        });
    });
});