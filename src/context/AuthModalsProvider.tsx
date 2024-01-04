"use client"
import LogInModal from "@/components/modals/LogInModal";
import SignUpModal from "@/components/modals/SignUpModal";
import { createContext, useContext, useState } from "react";

interface IAuthModalsContext{
    signUpModal: boolean
    showSignUpModal: () => void
    logInModal: boolean
    showLogInModal: () => void
}

export const AuthModalsContext = createContext<IAuthModalsContext | null>(null);

interface AuthModalsProviderProps{
    children: React.ReactNode
}

export default function AuthModalsProvider({ children }: AuthModalsProviderProps) {
    
    const [signUpModal, setSignUpModal] = useState(false);
    const [logInModal, setLogInModal] = useState(false);

    const value = {
        signUpModal,
        showSignUpModal: () => setSignUpModal(true),
        logInModal,
        showLogInModal: () => setLogInModal(true)
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