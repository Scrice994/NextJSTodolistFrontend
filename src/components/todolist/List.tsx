import React from 'react';
import Todolist from './Todolist';
import ToolBar from './ToolBar';
import style from "../../styles/todoList.module.css";
import useShowAddTodoModal from '@/hooks/useShowAddTodoModal';
import { useAuthModalsContext } from '@/context/AuthModalsProvider';
import { useTodolistModalsContext } from '@/context/TodolistModalsProvider';

export default function List() {
    const { logInModal, signUpModal, userModal, createMemberModal } = useAuthModalsContext();
    const { addTodoModal, showAddTodoModal, deleteAllTodoModal, updateTodoModal  } = useTodolistModalsContext();
    const onKeyEnter = useShowAddTodoModal(showAddTodoModal, addTodoModal, signUpModal, logInModal, userModal, deleteAllTodoModal, updateTodoModal, createMemberModal);
    
    return (
        <div className={style.list}>
            <ToolBar />
            <Todolist />
        </div>
    )
}
