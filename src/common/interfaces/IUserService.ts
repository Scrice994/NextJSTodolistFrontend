import { User } from "@/models/user"

export interface SignUpValues{
    username: string,
    email: string,
    password: string,
    verificationCode?: string
}

export interface LoginValues{
    username: string,
    password: string
}

export interface IUserService{
    getAuthenticatedUser(): Promise<any>
    signUp(credentials: SignUpValues): Promise<User>
    verifyUser(userId: string, verificationCode: string): Promise<any>
    login(credentials: LoginValues): Promise<User>
    createNewGroupMember(credentials: LoginValues): Promise<User>
    logout(): Promise<any>
}