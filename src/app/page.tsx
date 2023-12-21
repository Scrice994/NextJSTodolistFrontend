"use client"
import ShowLoggedUser from "@/components/auth/ShowLoggedUser";
import Link from "next/link";

export default function Home() {

  return (
    <> 
      <h1>Home Page</h1>
      <ShowLoggedUser />
      <hr></hr>
      <Link href="/todolist">Enter in the app</Link>
    </>
  )
}
