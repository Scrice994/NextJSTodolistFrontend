import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080",
        credentials: "include"
    }),
    tagTypes: ["Todos", "User"],
    endpoints: () => ({}) 
});

