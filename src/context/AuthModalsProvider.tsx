"use client"
import DropDownDialog from "@/components/modals/UserModal";
import LogInModal from "@/components/modals/LogInModal";
import SignUpModal from "@/components/modals/SignUpModal";
import { createContext, useContext, useState } from "react";
import CreateMemberModal from "@/components/modals/CreateMemberModal";

interface IAuthModalsContext{
    signUpModal: boolean
    showSignUpModal: () => void
    logInModal: boolean
    showLogInModal: () => void
    userModal: boolean
    toggleUserModal: () => void
    createMemberModal: boolean
    showCreateMemberModal: () => void
}

export const AuthModalsContext = createContext<IAuthModalsContext | null>(null);

interface AuthModalsProviderProps{
    children: React.ReactNode
}

export default function AuthModalsProvider({ children }: AuthModalsProviderProps) {
    const [userModal, setUserModal] = useState(false);
    const [signUpModal, setSignUpModal] = useState(false);
    const [logInModal, setLogInModal] = useState(false);
    const [createMemberModal, setCreateMemberModal] = useState(false);

    const value = {
        signUpModal,
        showSignUpModal: () => setSignUpModal(true),
        logInModal,
        showLogInModal: () => setLogInModal(true),
        userModal,
        toggleUserModal: () => setUserModal(!userModal),
        createMemberModal,
        showCreateMemberModal: () => setCreateMemberModal(true)
    }
    
    return(
        <AuthModalsContext.Provider value={value}>
            {children}
            { signUpModal &&
                <SignUpModal
                    openLogInModal={() => setLogInModal(true)}     
                    onDismiss={() => setSignUpModal(false)} 
                />
            }
            { logInModal && 
                <LogInModal
                    openSignUpModal={() => setSignUpModal(true)}       
                    onDismiss={() => setLogInModal(false)} 
                />
            }
            { userModal && 
                <DropDownDialog
                    openLogInModal={() => setLogInModal(true)}
                    openSignUpModal={() => setSignUpModal(true)} 
                    onDismiss={() => setUserModal(false)}
                />
            }
            { createMemberModal &&
                <CreateMemberModal
                    onDismiss={() => setCreateMemberModal(false)}
                />
            }
        </AuthModalsContext.Provider>
    );
}

export function useAuthModalsContext(){
    const context = useContext(AuthModalsContext)
    if(!context){
        throw new Error("useAuthModalsContext must be used within a AuthModalsProvider");
    }
    return context;
}