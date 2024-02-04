import { apiSlice } from "./apiSlice";

export const extendedApiSliceUser = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.query({
            query: () => "/users/me",
            providesTags: ["User"]
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: "/users/login",
                method: "POST",
                body: credentials
            }),
            invalidatesTags: ["User", "Todos"]
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/users/logout",
                method: "POST",
            }),
            invalidatesTags: ["User", "Todos"]
        })
    })
});

export const { useGetUserQuery, useLoginMutation, useLogoutMutation } = extendedApiSliceUser;

