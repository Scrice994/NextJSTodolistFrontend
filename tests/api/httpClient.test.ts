import { HttpClient } from "../../src/network/httpClient/HttpClient";
import * as testUtils from "./utils/mongoTestUtils";

describe("unit", () => {
    describe("httpClient()", () => {

 
        beforeEach(async () => {
            await testUtils.clearDB();
        });
 
        const httpClient = new HttpClient();

        describe("sendRequest()", () => {
            it("should do the http request successfully",async () => {
                const response = await httpClient.sendRequest("/users/signup", { 
                    method: 'post',
                    body: { username: "testUsername", password: "testPassword", email: "testEmail@gmail.com" }
                }).catch(err => console.log(err));
                
                console.log(response);
                expect(response).toBeDefined();
                expect(response).toEqual(expect.objectContaining({
                    username: expect.any(String),
                    email: expect.any(String),
                    status: expect.any(String),
                    id: expect.any(String),
                    updatedAt: expect.any(String),
                    createdAt: expect.any(String),
                }));
            });
        });
    });
});