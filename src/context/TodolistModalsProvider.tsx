"use client"
import AddTodoModal from "@/components/modals/AddTodoModal";
import DeleteAllTodosModal from "@/components/modals/DeleteAllTodosModal";
import { createContext, useContext, useState } from "react";

interface ITodolistModalsContext{
    addTodoModal: boolean,
    showAddTodoModal: () => void
    deleteAllTodoModal: boolean
    showDeleteAllTodoModal: () => void
}

export const TodolistModalsContext = createContext<ITodolistModalsContext | null>(null);

interface TodolistModalsProviderProps{
    children: React.ReactNode
}

export default function TodolistModalsProvider({ children }: TodolistModalsProviderProps) {

    const [addTodoModal, setAddTodoModal] = useState(false);
    const [deleteAllTodoModal, setDeleteAllTodoModal] = useState(false);

    const value = {
        addTodoModal,
        showAddTodoModal: () => setAddTodoModal(true),
        deleteAllTodoModal,
        showDeleteAllTodoModal: () => setDeleteAllTodoModal(true)
    }
    
    return(
        <TodolistModalsContext.Provider value={value}>
            {children}
            { addTodoModal && 
                <AddTodoModal 
                    onDismiss={() => setAddTodoModal(false)}
                />
            }
            { deleteAllTodoModal &&
                <DeleteAllTodosModal
                    onDismiss={() => setDeleteAllTodoModal(false)}
                />
            }
        </TodolistModalsContext.Provider>
    );
}

export function useTodolistModalsContext(){
    const context = useContext(TodolistModalsContext);
    if(!context){
        throw new Error("useTodolistModalsContext must be used within a TdolistMoldalsProvider")
    }
    return context;
}