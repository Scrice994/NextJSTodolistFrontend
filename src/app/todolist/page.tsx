"use client"
import List from "@/components/todolist/List";
import { useAuthModalsContext } from "@/context/AuthModalsProvider";
import { useTodolistModalsContext } from "@/context/TodolistModalsProvider";
import useShowAddTodoModal from "@/hooks/useShowAddTodoModal";

export default function TodolistApp() {
  const { logInModal, signUpModal, userModal, createMemberModal } = useAuthModalsContext();
  const { addTodoModal, showAddTodoModal, deleteAllTodoModal, updateTodoModal  } = useTodolistModalsContext();
  const onKeyEnter = useShowAddTodoModal(showAddTodoModal, addTodoModal, signUpModal, logInModal, userModal, deleteAllTodoModal, updateTodoModal, createMemberModal);

  return (
    <div>
      <List />
    </div>
  )
}
