import { useEffect } from "react";

export default function useShowAddTodoModal(
    showAddTodoModal: () => void,
    addTodoModal: boolean,
    signUpModal: boolean,
    logInModal: boolean,
    userModal: boolean,
    deleteAllTodoModal: boolean,
    todoModal: boolean,
    createMemberModal: boolean
){
    useEffect(() => {
        const OnEnter = (event: KeyboardEvent) => {
            if (event.key === 'Enter' && !addTodoModal && signUpModal === false && logInModal === false && !userModal && !deleteAllTodoModal && !todoModal && !createMemberModal) {
              showAddTodoModal();
            }
        };
        document.addEventListener('keypress', OnEnter);
        return () => document.removeEventListener('keypress', OnEnter);
    }, [addTodoModal, logInModal, signUpModal, userModal, deleteAllTodoModal, todoModal, createMemberModal, showAddTodoModal]);
}