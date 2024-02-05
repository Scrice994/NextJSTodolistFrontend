import { IoAlertCircleOutline } from "react-icons/io5";
import ModalContainer from "./ModalContainer";
import style from "../../styles/modals.module.css";
import { useDeleteAllTodosMutation } from "@/lib/features/api/todoSlice";

interface DeleteAllTodosModalProps{
    onDismiss: () => void
}

export default function DeleteAllTodosModal({ onDismiss }: DeleteAllTodosModalProps) {
    const [deleteAllTodos] = useDeleteAllTodosMutation()

    return (
        <ModalContainer
            modalStyle={style.modalWithAnimation}
            overlayStyle={style.darkOverlay}
            onDismiss={onDismiss}
        >   
            <div className={style.verticalHeader}>
                <IoAlertCircleOutline size={150} color="red"/>
                <h3>This operation<strong> will delete all your todos</strong>. Are you sure?</h3>
            </div>  
            <div className={style.buttonContainer}>
                <button
                    className={style.deleteAllTodoYesButton}
                    onClick={async () => {
                        await deleteAllTodos().unwrap();
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
