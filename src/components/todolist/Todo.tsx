import { useDeleteTodoMutation } from "@/lib/features/api/todoSlice";
import { Todo as TodoModel } from "@/models/todo";
import { MdDelete } from 'react-icons/md';
import style from "../../styles/todoList.module.css";
import { CheckButton } from "./CheckButton";
import { useTodolistModalsContext } from "@/context/TodolistModalsProvider";

interface TodoProps {
    todo: TodoModel
}

const Todo = ({ todo }: TodoProps) => {
    const { setTodoToUpdate, showUpdateTodoModal} = useTodolistModalsContext()
    const [deleteTodo] = useDeleteTodoMutation();
    const { text } = todo;

    return(
        <>
            <div 
                className={style.todo}
                onClick={() => {
                    showUpdateTodoModal();
                    setTodoToUpdate(todo);
                }}
            >
                <div className={style.todoFlex}>
                    <div className={style.todoBody}>
                        <CheckButton 
                            todo={todo}
                        />
                        <h4 className={style.todoText}>{text}</h4>
                    </div>
                    <div>
                        <MdDelete
                            onClick={(e: Event) => {
                                deleteTodo(todo.id);
                                e.stopPropagation();
                            }}
                            className={style.trash}
                        />
                    </div>
                </div>
            </div>
        </>         
    )
}

export default Todo;