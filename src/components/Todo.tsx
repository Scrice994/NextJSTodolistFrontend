import { Todo as TodoModel } from "@/models/todo";
import { useState } from "react";
import { MdDelete } from 'react-icons/md';
import style from "../styles/todo.module.css";
import { CheckButton } from "./CheckButton";
import UpdateTodoDialog, { UpdateTodoValues } from "./UpdateTodoDialog";

interface TodoProps {
    todo: TodoModel
    onDeleteTodoClick: (todo: TodoModel) => void
    onCheckTodoClick: (todo: TodoModel) => void
    onUpdateTodo: (todoId: string, todoToUpdate: UpdateTodoValues) => void
}

const Todo = ({ todo, onDeleteTodoClick, onCheckTodoClick, onUpdateTodo }: TodoProps) => {
    const [showUpdateTodoDialog, setShowUpdateTodoDialog] = useState(false);
    const { text } = todo;

    return(
        <>
            <div 
                className={style.todo}
                onClick={() => setShowUpdateTodoDialog(true)}
            >
                <div className={style.todoFlex}>
                    <div className={style.todoBody}>
                        <CheckButton 
                            todo={todo}
                            onCheckTodoClick={() => onCheckTodoClick(todo)}
                        />
                        <h4 className={style.todoText}>{text}</h4>
                    </div>
                    <div>
                        <MdDelete
                            onClick={(e: Event) => {
                                onDeleteTodoClick(todo);
                                e.stopPropagation();
                            }}
                            className={style.trash}
                        />
                    </div>
                </div>
            </div>
            {showUpdateTodoDialog &&
                <UpdateTodoDialog 
                    onDismiss={() => setShowUpdateTodoDialog(false)}
                    todo={todo}
                    onUpdateTodo={(todoId, todoToUpdate) => onUpdateTodo(todoId, todoToUpdate)}
                />
            }
        </>         
    )
}

export default Todo;