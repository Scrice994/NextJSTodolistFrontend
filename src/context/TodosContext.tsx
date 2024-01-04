"use client"
import { UpdateTodoValues } from "@/components/UpdateTodoDialog";
import useTodos from "@/hooks/useTodos";
import { Todo as TodoModel } from "@/models/todo";
import { CreateTodoPostValues } from "@/network/services/interfaces/ITodoService";
import { createContext, useContext } from "react";
import { HttpClient } from "@/network/httpClient/HttpClient";

interface ITodosContext{
    todos: TodoModel[]
    whenUserLogout: () => void
    deleteTodo: (todo: TodoModel) => void
    checkTodo: (todo: TodoModel) => void
    updateTodo: (todoId: string, todoToUpdate: UpdateTodoValues) => void
    deleteAllTodos: () => void
    addTodo: (todo: CreateTodoPostValues) => void
}

export const TodosContext = createContext<ITodosContext | null>(null);

interface TodosProviderProps{
    children: React.ReactNode
}


export default function TodosProvider({ children }: TodosProviderProps){
    const httpClient = new HttpClient();
    const value = useTodos(httpClient);

    return(
        <TodosContext.Provider value={value}>
            {children}
        </TodosContext.Provider>
    )
}

export function useTodosContext(){
    const context = useContext(TodosContext)
    if(!context){
        throw new Error("useTodosContext must be used within a TodosProvider");
    }
    return context;
}