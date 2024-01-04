import { useTodosContext } from "@/context/TodosContext";
import { Todo as TodoModel } from "@/models/todo";
import { useState } from "react";
import { MdDelete } from 'react-icons/md';
import style from "../styles/todo.module.css";
import { CheckButton } from "./CheckButton";
import UpdateTodoDialog from "./UpdateTodoDialog";

interface TodoProps {
    todo: TodoModel
    todoModalOff: () => void
    todoModalOn: () => void
}

const Todo = ({ todo, todoModalOff, todoModalOn }: TodoProps) => {
    const [showUpdateTodoModal, setShowUpdateTodoModal] = useState(false);
    const { checkTodo, deleteTodo, updateTodo } = useTodosContext();
    const { text } = todo;

    return(
        <>
            <div 
                className={style.todo}
                onClick={() => {setShowUpdateTodoModal(true); todoModalOn();}}
            >
                <div className={style.todoFlex}>
                    <div className={style.todoBody}>
                        <CheckButton 
                            todo={todo}
                            onCheckTodoClick={() => checkTodo(todo)}
                        />
                        <h4 className={style.todoText}>{text}</h4>
                    </div>
                    <div>
                        <MdDelete
                            onClick={(e: Event) => {
                                deleteTodo(todo);
                                e.stopPropagation();
                            }}
                            className={style.trash}
                        />
                    </div>
                </div>
            </div>
            {showUpdateTodoModal &&
                <UpdateTodoDialog 
                    onDismiss={() => {setShowUpdateTodoModal(false); todoModalOff();}}
                    todo={todo}
                    onUpdateTodo={(todoId, todoToUpdate) => updateTodo(todoId, todoToUpdate)}
                />
            }
        </>         
    )
}

export default Todo;