import { User } from "@/models/user";
import { UnauthorizedError } from "../http-errors";
import { HttpClient } from "../httpClient/HttpClient";

const httpClient = new HttpClient();

export async function getAuthenticatedUser(){
    try {
        const response = await httpClient.sendRequest("/users/me", {
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
}

interface SignUpValues{
    username: string,
    email: string,
    password: string,
    verificationCode?: string
}

//da testare
export async function signUp(credentials: SignUpValues): Promise<User> {
    const response = await httpClient.sendRequest("/users/signup", {
        method: 'post',
        body: credentials
    })
    return response;
}

export async function verifyUser(userId: string, verificationCode: string) {
    const response = await httpClient.sendRequest(`/users/account-verification?userId=${userId}&verificationCode=${verificationCode}`, {
        method: 'get',
    });
    return response;
}

export async function requestPasswordResetCode(email: string){
    console.log(email)
    await httpClient.sendRequest("/users/reset-password-code", {
        method: 'post',
        body: { email }
    });
}

interface ResetPasswordValues {
    email: string,
    password: string,
    verificationCode: string
}

export async function resetPassword(credentials: ResetPasswordValues){
    const response = await httpClient.sendRequest("/users/reset-password", {
        method: 'post',
        body: credentials
    });

    return response;
}

interface LoginValues{
    username: string,
    password: string
}

//da testare
export async function login(credentials: LoginValues): Promise<User> {
    const response = await httpClient.sendRequest("/users/login", {
        method: 'post',
        body: credentials
    });
    console.log(response);
    return response;
}

export async function createNewGroupMember(credentials: LoginValues): Promise<User>{
    const response = await httpClient.sendRequest("/users/group/create-member-account", {
        method: "post",
        body: credentials
    });
    return response;
}

//da testare
export async function logout(){
    await httpClient.sendRequest("/users/logout", { method: 'post' });
}

