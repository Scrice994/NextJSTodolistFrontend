import { UpdateTodoValues } from "@/components/UpdateTodoDialog";
import { Todo as TodoModel } from "@/models/todo";
import { TodoService } from "../common/services/TodoService";
import { useEffect, useState } from "react";
import useAuthenticatedUser from "./useAuthenticatedUser";
import { IHttpClient } from "@/common/interfaces/IHttpClient";
import { CreateTodoPostValues } from "@/common/interfaces/ITodoService";

export default function useTodos(httpClient: IHttpClient){
    const [todos, setTodos] = useState<TodoModel[]>([]);

    const { user, mutateUser } = useAuthenticatedUser(httpClient);
    const todoService = new TodoService(httpClient);

    useEffect(() => {
        async function getTodos(){
            const res = await todoService.getTodos();
            setTodos(res);
        }
        getTodos();
    }, [user]);

    async function whenUserLogout(){
        setTodos([]);
    }

    async function addTodo(todo: CreateTodoPostValues){
        try {
            const newTodo = await todoService.createTodo(todo);
            setTodos(prevTodos => [...prevTodos, newTodo]);
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    async function deleteTodo(todo: TodoModel){
        try {
            await todoService.deleteTodo(todo.id);
            setTodos(prevTodos => prevTodos.filter(existingTodo => existingTodo.id !== todo.id));
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    async function checkTodo(todo: TodoModel){
        try {
            await todoService.updateTodo({ id: todo.id, completed: !todo.completed });
            setTodos(prevTodos => prevTodos.map(existingTodo => 
                existingTodo.id === todo.id ? { ...existingTodo, completed: !existingTodo.completed } : existingTodo
            ));
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    async function updateTodo(todoId: string, todoToUpdate: UpdateTodoValues){
        try {
            await todoService.updateTodo({ id: todoId, text: todoToUpdate.text, description: todoToUpdate.description});
            setTodos( prevTodos => prevTodos.map(existingTodo => 
                existingTodo.id === todoId ? { ...existingTodo, text: todoToUpdate.text, description: todoToUpdate.description} : existingTodo
            ));    
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    async function deleteAllTodos(){
        try {
            const todos = await todoService.deleteTodos();
            console.log(todos);
            setTodos([]);
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    return {
        todos,
        whenUserLogout,
        addTodo,
        updateTodo,
        checkTodo,
        deleteTodo,
        deleteAllTodos
    }
}