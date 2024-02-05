"use client"
import AddTodoModal from "@/components/modals/AddTodoModal";
import DeleteAllTodosModal from "@/components/modals/DeleteAllTodosModal";
import UpdateTodoDialog from "@/components/modals/UpdateTodoModal";
import { Todo } from "@/models/todo";
import { createContext, useContext, useState } from "react";

interface ITodolistModalsContext{
    addTodoModal: boolean,
    showAddTodoModal: () => void
    deleteAllTodoModal: boolean
    showDeleteAllTodoModal: () => void
    updateTodoModal: boolean
    showUpdateTodoModal: () => void
    setTodoToUpdate: (todo: Todo) => void
}

export const TodolistModalsContext = createContext<ITodolistModalsContext | null>(null);

interface TodolistModalsProviderProps{
    children: React.ReactNode
}

export default function TodolistModalsProvider({ children }: TodolistModalsProviderProps) {

    const [addTodoModal, setAddTodoModal] = useState(false);
    const [deleteAllTodoModal, setDeleteAllTodoModal] = useState(false);
    const [updateTodoModal, setUpdateTodoModal] = useState(false);
    const [todoToUpdate, setTodoToUpdate] = useState<Todo | null>(null);

    const value = {
        addTodoModal,
        showAddTodoModal: () => setAddTodoModal(true),
        deleteAllTodoModal,
        showDeleteAllTodoModal: () => setDeleteAllTodoModal(true),
        updateTodoModal,
        showUpdateTodoModal: () => setUpdateTodoModal(true),
        setTodoToUpdate: (todo: Todo) => setTodoToUpdate(todo)
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
            { updateTodoModal &&
                <UpdateTodoDialog 
                    onDismiss={() => setUpdateTodoModal(false)}
                    todo={todoToUpdate}
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