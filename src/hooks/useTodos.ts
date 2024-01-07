import { UpdateTodoValues } from "@/components/UpdateTodoDialog";
import { Todo as TodoModel } from "@/models/todo";
import { TodoService } from "../common/services/TodoService";
import { useEffect, useState } from "react";
import useAuthenticatedUser from "./useAuthenticatedUser";
import { IHttpClient } from "@/common/interfaces/IHttpClient";
import { CreateTodoPostValues } from "@/common/interfaces/ITodoService";

export default function useTodos(httpClient: IHttpClient){
    const [todos, setTodos] = useState<TodoModel[]>([]);

    const { user } = useAuthenticatedUser(httpClient);
    const todoService = new TodoService(httpClient);

    useEffect(() => {
        async function getTodos(){
            try{
                const res = await todoService.getTodos();
                setTodos([...res]);
            } catch(error){
                console.log(error);
            }
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
        }
    }

    async function deleteTodo(todoId: string){
        try {
            await todoService.deleteTodo(todoId);
            setTodos(prevTodos => prevTodos.filter(existingTodo => existingTodo.id !== todoId));
        } catch (error) {
            console.log(error);
        }
    }

    async function checkTodo(todo: TodoModel){
        try {
            const { id, completed } = todo;
            await todoService.updateTodo({ id, completed: !completed });
            setTodos(prevTodos => prevTodos.map(existingTodo => 
                existingTodo.id === id ? { ...existingTodo, completed: !existingTodo.completed } : existingTodo
            ));
        } catch (error) {
            console.log(error);
        }
    }

    async function changeTodo(todoId: string, todoToUpdate: UpdateTodoValues){
        try {
            await todoService.updateTodo({ id: todoId, text: todoToUpdate.text, description: todoToUpdate.description});
            setTodos( prevTodos => prevTodos.map(existingTodo => 
                existingTodo.id === todoId ? { ...existingTodo, text: todoToUpdate.text, description: todoToUpdate.description} : existingTodo
            ));    
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteAllTodos(){
        try {
            await todoService.deleteTodos();
            setTodos([]);
        } catch (error) {
            console.log(error);
        }
    }

    return {
        todos,
        whenUserLogout,
        addTodo,
        changeTodo,
        checkTodo,
        deleteTodo,
        deleteAllTodos
    }
}