import { useLogoutMutation } from '@/lib/features/api/userSlice';
import { useAppDispatch } from '@/lib/hooks';
import { User } from '@/models/user';
import style from "../../styles/modals.module.css";
import { apiSlice } from '@/lib/features/api/apiSlice';

interface OnlineUserModalContentProps{
    user: User
    onDismiss: () => void
}

export default function OnlineUserModalContent({ user, onDismiss }: OnlineUserModalContentProps) {

    const [logout] = useLogoutMutation();
    const dispatch = useAppDispatch()

    return (
        <>
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
                        onDismiss();
                    }}
                >
                    Create new member 
                </button>
            }
            <button
                className={style.button}
                onClick={async () => {
                    await logout({}).unwrap();
                    dispatch(apiSlice.util.resetApiState());
                }}
            >
                Log out
            </button>
        </>
    )
}
