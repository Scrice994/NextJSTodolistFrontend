"use client"
import { useShowUpdateUserModal } from "@/hooks/useShowUpdateUserModal";
import Link from "next/link";

export default function Home() {
  useShowUpdateUserModal();
  
  return (
    <> 
      <h1>Home Page</h1>
      <hr></hr>
      <Link href="/todolist">Enter in the app</Link>
    </>
  )
}
