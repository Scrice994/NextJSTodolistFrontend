import { useGetUserQuery } from "@/lib/features/api/userSlice";
import ModalContainer from "./ModalContainer";
import OnlineUserModalContent from "./OnlineUserModalContent";
import style from "../../styles/modals.module.css";
import OfflineUserModalContent from "./OfflineUserModalContent";

interface UserModalProps{
    openLogInModal: () => void
    openSignUpModal: () => void
    onDismiss: () => void
}

export default function UserModal({ openLogInModal, openSignUpModal, onDismiss }: UserModalProps) {
    const { data: user } = useGetUserQuery({});

    return (
        <ModalContainer
            onDismiss={onDismiss}
            overlayStyle={style.lightOverlay}
            modalStyle={style.userModal}
        >
            {user ?
                <OnlineUserModalContent 
                    user={user}
                    onDismiss={onDismiss}
                />
                :
                <OfflineUserModalContent
                    openLogInModal={openLogInModal}
                    openSignUpModal={openSignUpModal}
                    onDismiss={onDismiss}
                />
            }
        </ModalContainer>
    )
}
