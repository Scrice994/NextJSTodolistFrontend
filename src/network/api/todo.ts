import { Todo } from "@/models/todo";
import { UnauthorizedError } from "../http-errors";
import { HttpClient } from "../httpClient/HttpClient";

const httpClient = new HttpClient();

export interface CreateTodoPostValues {
    text: string;
    description?: string;
    userId?: string;
}

export async function createTodo(todo: CreateTodoPostValues): Promise<Todo> {
    const response = await httpClient.sendRequest("/todos", { 
        method: 'post', 
        headers: {
            "Content-Type": "application/json"
        },
        body: todo 
    });
    console.log(response)
    return response;
}

export async function getTodos(): Promise<Todo[]> {
    try {
        const response = await httpClient.sendRequest("/todos", {
            method: 'get'
        });
        return response;
    } catch (error) {
        if(error instanceof UnauthorizedError){
            return [];
        } else {
            throw error;
        }
    }
}

export async function deleteTodo(id: string): Promise<Todo>{
    const response = await httpClient.sendRequest("/todos/" + id, {
        method: 'delete'
    });
    return response;
}

interface updateTodoValues{
    id: string;
    text?: string;
    description?: string;
    completed?: boolean;
}

export async function updateTodo(todo: updateTodoValues){
    const { id, ...toUpdate } = todo;
    const response = await httpClient.sendRequest("/todos/" + id, {
        method: 'put',
        headers: {
            "Content-Type": "application/json"
        },
        body: toUpdate
    });
    return response;
}

export async function deleteTodos(){
    const response = await httpClient.sendRequest("/todos/delete-todos", {
        method: 'delete',
    });
    return response;
}