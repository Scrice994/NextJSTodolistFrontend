import { useTodolistModalsContext } from "@/context/TodolistModalsProvider";
import { useDeleteTodoMutation } from "@/lib/features/api/todoSlice";
import { Todo as TodoModel } from "@/models/todo";
import { GrClose } from 'react-icons/gr';
import style from "../../styles/todoList.module.css";
import { CheckButton } from "./CheckButton";

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
                        <h3 className={todo.completed ? style.completedTodoText : style.todoText}>
                            {text}
                        </h3>
                    </div>
                    <div>
                        <GrClose
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