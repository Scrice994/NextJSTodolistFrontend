import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import style from "./dropDownDialog.module.css";
interface DropDownDialogProps{
    logOutUser: () => void
    openSignUpModal: () => void
    openLogInModal: () => void
    openCreateMemberModal: () => void
    onDismiss: () => void
}

export default function DropDownDialog({ logOutUser, openSignUpModal, openLogInModal, openCreateMemberModal, onDismiss }: DropDownDialogProps) {

    const { user } = useAuthenticatedUser();

    return (
        <>
            {user &&
                <div
                    className={style.dropdown}
                >
                    <div
                        className={style.username}
                    >
                    <div>{ user?.username }</div>
                    <div>{ user?.tenantId }</div> 
                    </div>
                    <hr style={{ marginTop: "0%" }}></hr>
                    {user.userRole === "Admin" &&
                        <button
                            className={style.button}
                            onClick={() => {
                                openCreateMemberModal();
                                onDismiss();
                            }}
                        >
                            Create new member 
                        </button>
                    }
                    <button
                        className={style.button}
                        onClick={logOutUser}
                    >
                        Log out
                    </button>
                </div>
            }
            {!user &&
                <div
                    className={style.dropdown}
                >
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
                </div>
            }
        </>
    )
}
