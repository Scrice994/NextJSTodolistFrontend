import { useGetTodosQuery } from '@/lib/features/api/todoSlice';
import React from 'react'
import { Todo as TodoModel } from "@/models/todo";
import Todo from "@/components/todolist/Todo";

export default function Todolist() {
    const { data, isLoading, isSuccess, isError, error } = useGetTodosQuery();
    console.log(useGetTodosQuery());
    let todosRender;

    if (isLoading) {
        todosRender = <h2>Loading...</h2>
    } else if (isSuccess) {
        todosRender = data.map((todo: TodoModel) => 
            <Todo 
                todo={todo}
                key={todo.id}
            />
        )
    } else if (isError) {
        todosRender = <h2>Error 😖</h2>
    }

    return (
        <div className="todosContainer">
            {todosRender}
        </div>
    )
}
