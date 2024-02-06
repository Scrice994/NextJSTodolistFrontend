"use client"
import List from "@/components/todolist/List";
import TodolistModalsProvider from "@/context/TodolistModalsProvider";
import { useShowUpdateUserModal } from "@/hooks/useShowUpdateUserModal";

export default function TodolistApp() {
  useShowUpdateUserModal();

  return (
    <TodolistModalsProvider>
      <div>
        <List />
      </div>
    </TodolistModalsProvider>
  )
}
