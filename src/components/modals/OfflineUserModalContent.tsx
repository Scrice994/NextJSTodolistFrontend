import style from "../../styles/modals.module.css";

interface OnlineUserModalContentProps{
    openLogInModal: () => void
    openSignUpModal: () => void
    onDismiss: () => void
}

export default function OnlineUserModalContent({ openLogInModal, openSignUpModal, onDismiss }: OnlineUserModalContentProps) {
    return (
        <>
        <p
            className={style.username}
        >
            Utente non loggato:
        </p>
        <button
            className={style.button}
            onClick={() => {
                openLogInModal();
                onDismiss();
            }}
        >
            Log In
        </button>
        <hr></hr>
        <button
            className={style.button}
            onClick={() => {
                openSignUpModal();
                onDismiss();
            }}
        >
            Sign up
        </button>
    </>
    )
}
