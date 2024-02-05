import { Todo } from "@/models/todo";
import { apiSlice } from "./apiSlice";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

interface UpdateTodoArg{
    id: string
    toUpdate: Partial<Todo>
}

export const extendedApiSliceTodo = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTodos: builder.query<Todo[], void>({
            query: () => "/todos",
            providesTags: ["Todos"]
        }),
        addNewTodo: builder.mutation<Todo, Partial<Todo>>({
            query: (initialTodo) => ({
                url: "/todos",
                method: "POST",
                body: initialTodo
            }),
            invalidatesTags: ["Todos"]
        }),
        updateTodo: builder.mutation<Todo, UpdateTodoArg>({
            query: (todoToUpdate) => ({
                url: "/todos/" + todoToUpdate.id,
                method: "PUT",
                body: todoToUpdate.toUpdate
            }),
            async onQueryStarted(todoToUpdate, { dispatch, queryFulfilled }) {
                const patchResult  = dispatch(
                    extendedApiSliceTodo.util.updateQueryData("getTodos", undefined, draft => {
                        return draft.map((todo: Todo) => 
                            todo.id === todoToUpdate.id ? { ...todo, ...todoToUpdate.toUpdate } : todo     
                        )
                    })
                )
                try{
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            }
        }),
        deleteTodo: builder.mutation<Todo, string>({
            query: (todoId) => ({
                url: "/todos/" + todoId,
                method: "DELETE"
            }),
            invalidatesTags: ["Todos"],
        }),
        deleteAllTodos: builder.mutation<unknown, void>({
            query: () => ({
                url: "/todos/delete-todos",
                method: "DELETE"
            }),
            invalidatesTags: ["Todos"]
        })
    }),
    overrideExisting: true
});

export const { useGetTodosQuery, useAddNewTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation, useDeleteAllTodosMutation } = extendedApiSliceTodo