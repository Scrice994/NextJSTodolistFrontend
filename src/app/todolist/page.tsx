"use client"
import AddTodoModal from "@/components/modals/AddTodoModal";
import Todo from "@/components/Todo";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { Todo as TodoModel } from "@/models/todo";
import * as todoAPI from "@/network/api/todo";
import * as usersAPI from "@/network/api/users";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { HiMiniPlus } from "react-icons/hi2";
import { FcDeleteDatabase } from "react-icons/fc";
import DropDownDialog from "@/components/header/DropDownDialog";
import Header from "@/components/header/Header";
import style from "./todolist.module.css";
import SignUpModal from "@/components/modals/SignUpModal";
import LogInModal from "@/components/modals/LogInModal";
import { Spinner } from "react-bootstrap";


export default function Todolist(){
    const [todos, setTodos] = useState<TodoModel[]>([]);
    const [addTodoModal, setAddTodoModal] = useState(false);
    const [userModal, setUserModal] = useState(false);
    const [signUpModal, setSignUpModal] = useState(false);
    const [logInModal, setLogInModal] = useState(false);

    const { user, userLoading, mutateUser } = useAuthenticatedUser();

    useEffect(() => {
        async function getTodos(){
            const response = await todoAPI.getTodos();
            setTodos(response);
        }
        getTodos();
    }, []);

    useEffect(() => {
        const OnEnter = (event: KeyboardEvent) => {
            if (event.key === 'Enter' && !addTodoModal && !signUpModal && !logInModal && !userModal) {
              setAddTodoModal(true);
            }
        };
        document.addEventListener('keypress', OnEnter);
        return () => document.removeEventListener('keypress', OnEnter);
    }, [addTodoModal, logInModal, signUpModal, userModal]);

    async function logOut(){
        await usersAPI.logout();
        mutateUser(null);
        setTodos([]);
        console.log("USER LOGOUT");
    }

    async function deleteTodo(todo: TodoModel){
        try {
            await todoAPI.deleteTodo(todo.id);
            setTodos(prevTodos => prevTodos.filter(existingTodo => existingTodo.id !== todo.id));
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    async function checkTodo(todo: TodoModel){
        try {
            await todoAPI.updateTodo({ id: todo.id, completed: !todo.completed });
            setTodos(prevTodos => prevTodos.map(existingTodo => 
                existingTodo.id === todo.id ? { ...existingTodo, completed: !existingTodo.completed } : existingTodo
            ));
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    async function deleteAllTodos(){
        try {
            const todos = await todoAPI.deleteTodos();
            console.log(todos);
            setTodos([]);
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

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
                            onClick={() => setAddTodoModal(true)}
                            className={style.plusIcon}
                        >
                            <HiMiniPlus />
                        </div>
                    </li>
                    <li
                        className={style.headerButton}
                        onClick={() => deleteAllTodos()}
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
                                onDeleteTodoClick={(todo) => deleteTodo(todo)}
                                onCheckTodoClick={(todo) => checkTodo(todo)}
                            />
                        ))}
                    </div>
                    :
                    <Spinner style={{ display: "flex", justifyContent: "center", alignItems: "center" }}/>
                }
            </div>
            { addTodoModal && 
                <AddTodoModal 
                    onDismiss={() => setAddTodoModal(false)}
                    onTodoCreated={(newNote) => {
                        setTodos([...todos, newNote])
                        setAddTodoModal(false);
                    }}
                />
            }
            { userModal && 
                <DropDownDialog 
                    logOutUser={() => logOut()}
                    onDismiss={() => setUserModal(false)}
                    openSignUpModal={() => setSignUpModal(true)}
                    openLogInModal={() => setLogInModal(true)}
                />
            }
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
        </div>
    )
}