import { Todo as TodoModel } from "@/models/todo";

export interface CreateTodoPostValues{
    text: string;
    description?: string;
};
export interface newTodoValues{
    id: string;
    text?: string;
    description?: string;
    completed?: boolean;
};

export interface ITodoService{
    createTodo(todo: CreateTodoPostValues): Promise<TodoModel>
    getTodos(): Promise<TodoModel[]>
    deleteTodo(id: string): Promise<TodoModel>
    updateTodo(todoToUpdate: newTodoValues): Promise<TodoModel>
    deleteTodos(): Promise<TodoModel[]>
};