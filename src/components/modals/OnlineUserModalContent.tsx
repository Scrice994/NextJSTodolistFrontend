import { useLogoutMutation } from '@/lib/features/api/userSlice';
import { useAppDispatch } from '@/lib/hooks';
import { User } from '@/models/user';
import style from "../../styles/modals.module.css";
import { apiSlice } from '@/lib/features/api/apiSlice';
import { useAuthModalsContext } from '@/context/AuthModalsProvider';

interface OnlineUserModalContentProps{
    user: User
    onDismiss: () => void
}

export default function OnlineUserModalContent({ user, onDismiss }: OnlineUserModalContentProps) {
    const { showCreateMemberModal } = useAuthModalsContext();
    const [logout] = useLogoutMutation();
    const dispatch = useAppDispatch();

    const isUserGroupAdmin = user.userRole === "Admin" && user.tenantId

    return (
        <>
            <div
                className={style.username}
            >
                <div>{ user?.username }</div>
                <div>{ user?.tenantId }</div> 
            </div>
            <hr style={{ marginTop: "0%" }}></hr>
            {isUserGroupAdmin &&
                <button
                    className={style.button}
                    onClick={() => {
                        showCreateMemberModal();
                        onDismiss();
                    }}
                >
                    Create new member 
                </button>
            }
            <button
                className={style.button}
                onClick={async () => {
                    await logout().unwrap();
                    dispatch(apiSlice.util.resetApiState());
                }}
            >
                Log out
            </button>
        </>
    )
}
