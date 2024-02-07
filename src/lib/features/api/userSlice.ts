import { LoginFormData } from "@/components/modals/LogInModal";
import { SignUpFormData } from "@/components/modals/SignUpModal";
import { UpdateUserFormData } from "@/components/modals/UpdateUserModal";
import { User } from "@/models/user";
import { apiSlice } from "./apiSlice";

interface VerifyUserQueryParams{
    userId: string,
    verificationCode: string
}

export const extendedApiSliceUser = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.query<User, void>({
            query: () => "/users/me",
            providesTags: ["User"]
        }),
        signup: builder.mutation<User, SignUpFormData>({
            query: (crendentials) => ({
                url: "/users/signup",
                method: "POST",
                body: crendentials
            })
        }),
        login: builder.mutation<User, LoginFormData>({
            query: (credentials) => ({
                url: "/users/login",
                method: "POST",
                body: credentials
            }),
            invalidatesTags: ["User", "Todos"]
        }),
        verifyUser: builder.query<User, VerifyUserQueryParams>({
            query: (searchParams) => `/users/account-verification?userId=${searchParams.userId}&verificationCode=${searchParams.verificationCode}`
        }),
        logout: builder.mutation<unknown, void>({
            query: () => ({
                url: "/users/logout",
                method: "POST",
            }),
            invalidatesTags: ["User", "Todos"]
        }),
        udpateUser: builder.mutation<User, UpdateUserFormData>({
            query: (username) => ({
                url: "/users/change-username",
                method: "PUT",
                body: username
            }),
            invalidatesTags: ["User"]
        }),
        createNewMember: builder.mutation<User, LoginFormData>({
            query: (credentials) => ({
                url: "/users/group/create-member-account",
                method: "POST",
                body: credentials
            })
        })
    })
});

export const { 
    useGetUserQuery,
    useSignupMutation,
    useVerifyUserQuery, 
    useLoginMutation, 
    useLogoutMutation, 
    useCreateNewMemberMutation,
    useUdpateUserMutation
} = extendedApiSliceUser;

