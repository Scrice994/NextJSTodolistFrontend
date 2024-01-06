import { Todo as TodoModel } from "@/models/todo";
import { IHttpClient } from "../interfaces/IHttpClient";
import { CreateTodoPostValues, ITodoService, newTodoValues } from "../interfaces/ITodoService";

export class TodoService implements ITodoService{
    constructor(private httpClient: IHttpClient){}

    async createTodo(todo: CreateTodoPostValues): Promise<TodoModel> {
        const response = await this.httpClient.sendRequest("/todos", { 
            method: 'post', 
            headers: {
                "Content-Type": "application/json"
            },
            body: todo 
        });
        console.log(response);
        return response;
    };

    async getTodos(): Promise<TodoModel[]> {
        const response = await this.httpClient.sendRequest("/todos", {
            method: 'get'
        });
        return response;
    };

    async deleteTodo(id: string): Promise<TodoModel> {
        const response = await this.httpClient.sendRequest("/todos/" + id, {
            method: 'delete'
        });
        return response;
    };

    async updateTodo(newTodo: newTodoValues): Promise<TodoModel> {
        const { id, ...toUpdate } = newTodo;
        const response = await this.httpClient.sendRequest("/todos/" + id, {
            method: 'put',
            headers: {
                "Content-Type": "application/json"
            },
            body: toUpdate
        });
        return response;
    };

    async deleteTodos(): Promise<TodoModel[]> {
        const response = await this.httpClient.sendRequest("/todos/delete-todos", {
            method: 'delete',
        });
        return response;
    };
}

