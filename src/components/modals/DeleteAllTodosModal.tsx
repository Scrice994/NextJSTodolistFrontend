import ModalContainer from "./ModalContainer";
import style from "./modals.module.css";
import { IoAlertCircleOutline } from "react-icons/io5";

interface DeleteAllTodosModalProps{
    onDeleteAllTodos: () => void
    onDismiss: () => void
}

export default function DeleteAllTodosModal({ onDeleteAllTodos, onDismiss }: DeleteAllTodosModalProps) {
    return (
        <ModalContainer
            modalStyle={style.modalWithAnimation}
            onDismiss={onDismiss}
        >   
            <div className={style.verticalHeader}>
                <IoAlertCircleOutline size={150} color="red"/>
                <h3>This operation<strong> will delete all your todos</strong>. Are you sure?</h3>
            </div>  
            <div className={style.buttonContainer}>
                <button
                    className={style.deleteAllTodoYesButton}
                    onClick={() => {
                        onDeleteAllTodos();
                        onDismiss();
                    }}
                >
                    Yes, delete all
                </button>
                <button
                    className={style.deleteAllTodoCancelButton}
                    onClick={onDismiss}
                >
                    Cancel
                </button>
            </div>
        </ModalContainer>
    )
}
