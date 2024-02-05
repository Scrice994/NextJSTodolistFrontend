import { User } from "@/models/user";
import { apiSlice } from "./apiSlice";
import { LoginValues } from "@/common/interfaces/IUserService";
import { hasCustomErrorMessage } from "@/utils/hasCustomErrorMessage";

interface RTKError{
    error: string
}

export const extendedApiSliceUser = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.query<User, void>({
            query: () => "/users/me",
            providesTags: ["User"]
        }),
        login: builder.mutation<User, LoginValues>({
            query: (credentials) => ({
                url: "/users/login",
                method: "POST",
                body: credentials
            }),
            invalidatesTags: ["User", "Todos"]
        }),
        logout: builder.mutation<unknown, void>({
            query: () => ({
                url: "/users/logout",
                method: "POST",
            }),
            invalidatesTags: ["User", "Todos"]
        }),
        createNewMember: builder.mutation<User, LoginValues>({
            query: (credentials) => ({
                url: "/users/group/create-member-account",
                method: "POST",
                body: credentials
            })
        })
    })
});

export const { useGetUserQuery, useLoginMutation, useLogoutMutation, useCreateNewMemberMutation } = extendedApiSliceUser;

