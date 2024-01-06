import { User } from "@/models/user";
import { IHttpClient } from "../interfaces/IHttpClient";
import { IUserService, LoginValues, SignUpValues } from "../interfaces/IUserService";
import { UnauthorizedError } from "./http-errors";

export class UserService implements IUserService{
    constructor(private httpClient: IHttpClient){}

    async getAuthenticatedUser(){
        try {
            const response = await this.httpClient.sendRequest("/users/me", {
                method: 'get',
            })
            console.log(response);
            return response;  
        } catch (error) {
            if(error instanceof UnauthorizedError){
                return null;
            } else {
                throw error;
            }
        }
    };

    async signUp(credentials: SignUpValues): Promise<User> {
        const response = await this.httpClient.sendRequest("/users/signup", {
            method: 'post',
            body: credentials
        })
        return response;
    };

    async verifyUser(userId: string, verificationCode: string) {
        const response = await this.httpClient.sendRequest(`/users/account-verification?userId=${userId}&verificationCode=${verificationCode}`, {
            method: 'get',
        });
        return response;
    };

    async login(credentials: LoginValues): Promise<User> {
        const response = await this.httpClient.sendRequest("/users/login", {
            method: 'post',
            body: credentials
        });
        return response;
    };

    async createNewGroupMember(credentials: LoginValues): Promise<User>{
        const response = await this.httpClient.sendRequest("/users/group/create-member-account", {
            method: "post",
            body: credentials
        });
        return response;
    };

    async logout(){
        await this.httpClient.sendRequest("/users/logout", { method: 'post' });
    };
}

