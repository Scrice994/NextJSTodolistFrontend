"use client"
import Link from "next/link";

export default function Home() {

  return (
    <> 
      <h1>Home Page</h1>
      <hr></hr>
      <Link href="/todolist">Enter in the app</Link>
    </>
  )
}
