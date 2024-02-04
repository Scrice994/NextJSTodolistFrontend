import { Todo } from "@/models/todo";
import { apiSlice } from "./apiSlice";

export const extendedApiSliceTodo = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTodos: builder.query({
            query: () => "/todos",
            providesTags: ["Todos"]
        }),
        addNewTodo: builder.mutation({
            query: (initialTodo) => ({
                url: "/todos",
                method: "POST",
                body: initialTodo
            }),
            invalidatesTags: ["Todos"]
        }),
        updateTodo: builder.mutation({
            query: (todoToUpdate) => ({
                url: "/todos/" + todoToUpdate.id,
                method: "PUT",
                body: todoToUpdate.toUpdate
            }),
            async onQueryStarted(todoToUpdate, { dispatch, queryFulfilled }) {
                const patchResult  = dispatch(
                    extendedApiSliceTodo.util.updateQueryData("getTodos", {}, draft => {
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
        deleteTodo: builder.mutation({
            query: (todoId) => ({
                url: "/todos/" + todoId,
                method: "DELETE"
            }),
            invalidatesTags: ["Todos"]
        })
    }),
    overrideExisting: true
});

export const { useGetTodosQuery, useAddNewTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = extendedApiSliceTodo