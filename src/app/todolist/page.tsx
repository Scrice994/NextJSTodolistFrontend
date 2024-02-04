"use client"
import List from "@/components/todolist/List";
import { useAuthModalsContext } from "@/context/AuthModalsProvider";
import { useTodolistModalsContext } from "@/context/TodolistModalsProvider";
import { useGetUserQuery } from "@/lib/features/api/userSlice";
import { useState } from "react";

export default function TodolistApp() {
  const { data: user } = useGetUserQuery({})     
  const [todoModal, setTodoModal] = useState(false)    
  const { logInModal, signUpModal, showLogInModal, showSignUpModal } = useAuthModalsContext();
  const { addTodoModal, showAddTodoModal, deleteAllTodoModal, showDeleteAllTodoModal } = useTodolistModalsContext();
  //const onKeyEnter = useShowAddTodoModal(showAddTodoModal, addTodoModal, signUpModal, logInModal, userModal, deleteAllTodoModal, todoModal, createMemberModal)     
  return (
    <div>
      <List />
    </div>
  )
}
