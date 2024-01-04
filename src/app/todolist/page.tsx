"use client"
import Todo from "@/components/Todo";
import DropDownDialog from "@/components/header/DropDownDialog";
import Header from "@/components/header/Header";
import { useAuthModalsContext } from "@/context/AuthModalsProvider";
import { useTodolistModalsContext } from "@/context/TodolistModalsProvider";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import useShowAddTodoModal from "@/hooks/useShowAddTodoModal";
import { useTodosContext } from "@/context/TodosContext";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { FcDeleteDatabase } from "react-icons/fc";
import { HiMiniPlus } from "react-icons/hi2";
import style from "./todolist.module.css";


export default function Todolist(){
    const { user, logout } = useAuthenticatedUser();

    const [userModal, setUserModal] = useState(false);
    const [createMemberModal, setCreateMemberModal] = useState(false);
    const [todoModal, setTodoModal] = useState(false);

    const { todos, whenUserLogout } = useTodosContext();
    const { logInModal, signUpModal, showLogInModal, showSignUpModal } = useAuthModalsContext();
    const { addTodoModal, showAddTodoModal, deleteAllTodoModal, showDeleteAllTodoModal } = useTodolistModalsContext();
    const onKeyEnter = useShowAddTodoModal(showAddTodoModal, addTodoModal, signUpModal, logInModal, userModal, deleteAllTodoModal, todoModal, createMemberModal);

    return (
        <div>
            <div
                className={style.canvas} 
                onClick={() => {
                    if(userModal === true){
                        setUserModal(false);
                    }
                }}
            >
                <Header>
                    <li className={style.headerButton}>
                        <div
                            onClick={() => showAddTodoModal()}
                            className={style.plusIcon}
                        >
                            <HiMiniPlus />
                        </div>
                    </li>
                    <li
                        className={style.headerButton}
                        onClick={() => showDeleteAllTodoModal()}
                    >
                        <div className={style.userIcon}>
                            <FcDeleteDatabase />
                        </div>
                    </li>
                    <li 
                        className={user ? style.headerButtonOnline : style.headerButton}
                        onClick={() => setUserModal(!userModal)}
                    >
                        <div className={style.userIcon}>
                            <FaUser />
                        </div>
                    </li>
                </Header>
                { user ? 
                    <div className={style.todosContainer}>
                        {todos.map(todo => (
                            <Todo 
                                todo={todo}
                                key={todo.id}
                                todoModalOff={() => setTodoModal(false)}
                                todoModalOn={() => setTodoModal(true)}
                            />
                        ))}
                    </div>
                    :
                    <Spinner style={{ display: "flex", justifyContent: "center", alignItems: "center" }}/>
                }
            </div>
            { userModal && 
                <DropDownDialog 
                    logOutUser={() => {logout(); whenUserLogout();}}
                    onDismiss={() => setUserModal(false)}
                    openSignUpModal={() => showSignUpModal()}
                    openLogInModal={() => showLogInModal()}
                    openCreateMemberModal={() => setCreateMemberModal(true)}
                />
            }
        </div>
    )
}