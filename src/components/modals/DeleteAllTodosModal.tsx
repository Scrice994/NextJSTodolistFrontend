import { IoAlertCircleOutline } from "react-icons/io5";
import ModalContainer from "./ModalContainer";
import style from "../../styles/modals.module.css";

interface DeleteAllTodosModalProps{
    onDismiss: () => void
}

export default function DeleteAllTodosModal({ onDismiss }: DeleteAllTodosModalProps) {
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
                    onClick={() => {
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
