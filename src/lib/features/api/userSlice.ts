import { User } from "@/models/user";
import { apiSlice } from "./apiSlice";
import { LoginValues } from "@/common/interfaces/IUserService";
import { hasCustomErrorMessage } from "@/utils/hasCustomErrorMessage";
import { UpdateUserFormData } from "@/components/modals/UpdateUserModal";

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
        udpateUser: builder.mutation<User, UpdateUserFormData>({
            query: (username) => ({
                url: "/users/change-username",
                method: "PUT",
                body: username
            }),
            invalidatesTags: ["User"]
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

export const { 
    useGetUserQuery, 
    useLoginMutation, 
    useLogoutMutation, 
    useCreateNewMemberMutation,
    useUdpateUserMutation
} = extendedApiSliceUser;

