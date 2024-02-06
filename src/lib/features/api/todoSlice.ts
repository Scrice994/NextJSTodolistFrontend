import { Todo } from "@/models/todo";
import { apiSlice } from "./apiSlice";

interface UpdateTodoArg{
    id: string
    toUpdate: Partial<Todo>
}

export const extendedApiSliceTodo = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTodos: builder.query<Todo[], void>({
            query: () => "/todos",
            providesTags: (result) =>
            result
              ? [
                  ...result.map(({ id }) => ({ type: 'Todos' as const, id })),
                  { type: 'Todos', id: 'LIST' },
                ]
              : [{ type: 'Todos', id: 'LIST' }],
        }),
        getTodo: builder.query<Todo[], string>({
            query: (todoId) => "/todos/" + todoId,
            providesTags: (result, error, arg) => [{ type: 'Todos', id: arg }]
        }),
        addNewTodo: builder.mutation<Todo, Partial<Todo>>({
            query: (initialTodo) => ({
                url: "/todos",
                method: "POST",
                body: initialTodo
            }),
            invalidatesTags: [{type: 'Todos', id: 'LIST'}]
        }),
        toggleTodo: builder.mutation<Todo, string>({
            query: (todoId) => ({
                url: "/todos/toggle/" + todoId,
                method: "PUT",
            }),
            async onQueryStarted(todoId, { dispatch, queryFulfilled }) {
                const patchResult  = dispatch(
                    extendedApiSliceTodo.util.updateQueryData("getTodos", undefined, draft => {
                        return draft.map((todo: Todo) => 
                            todo.id === todoId ? { ...todo, completed: !todo.completed } : todo     
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
        updateTodo: builder.mutation<Todo, UpdateTodoArg>({
            query: (todoToUpdate) => ({
                url: "/todos/update/" + todoToUpdate.id,
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
            },
            invalidatesTags: (result, error, arg) => [{ type: 'Todos', id: arg.id }]
        }),
        deleteTodo: builder.mutation<Todo, string>({
            query: (todoId) => ({
                url: "/todos/" + todoId,
                method: "DELETE"
            }),
            invalidatesTags: [{type: 'Todos', id: 'LIST'}],
        }),
        deleteAllTodos: builder.mutation<unknown, void>({
            query: () => ({
                url: "/todos/delete-todos",
                method: "DELETE"
            }),
            invalidatesTags: [{type: 'Todos', id: 'LIST'}]
        })
    }),
    overrideExisting: true
});

export const { 
    useGetTodosQuery,
    useGetTodoQuery,
    useAddNewTodoMutation, 
    useUpdateTodoMutation, 
    useDeleteTodoMutation, 
    useDeleteAllTodosMutation, 
    useToggleTodoMutation 
} = extendedApiSliceTodo