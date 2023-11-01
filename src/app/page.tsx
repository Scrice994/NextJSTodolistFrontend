"use client"
import ShowLoggedUser from "@/components/auth/ShowLoggedUser";
import Link from "next/link";

export default function Home() {

  return (
    <> 
      <h1>Home Page</h1>
      <ShowLoggedUser />
      <Link href="/authentication/login">Log In to enter in the App</Link>
      <hr></hr>
      <Link href="/todolist">Enter in app if already logged in</Link>
    </>
  )
}
