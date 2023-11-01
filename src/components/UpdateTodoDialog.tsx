import { Todo as TodoModel } from "@/models/todo";
import modalStyle from '@/styles/updateTodoDialog.module.css';
import { formatDate } from "@/utils/formatDate";

interface UpdateTodoDialogProps{
    todo: TodoModel
    onDismiss: () => void 
}

const UpdateTodoDialog = ({ todo, onDismiss }: UpdateTodoDialogProps) => {
    const { text, description, createdAt } = todo;

    const todoCreatedAt = formatDate(createdAt);

    return (
        <div className={modalStyle.modal}>
            <div className={modalStyle.overlay} onClick={onDismiss}></div>
            <div className={modalStyle.window}>
            <h3>{text}</h3>
            <p>{description}</p>
            <div className={modalStyle.footer}>
                <span>{todoCreatedAt}</span>
                <button 
                    onClick={onDismiss}
                    className={modalStyle.done}
                >
                    Done
                </button>
            </div>
            </div>
        </div>
    )
}

export default UpdateTodoDialog;