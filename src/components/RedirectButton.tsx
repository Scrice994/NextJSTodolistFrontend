"use client"
import { useRouter } from 'next/navigation'
import React, { ButtonHTMLAttributes, ReactNode } from 'react'

interface RedirectButtonProps{
    children: ReactNode
}

export default function RedirectButton({ children, ...props }: RedirectButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
    const router = useRouter();

    return (
      <button
        onClick={() => router.push("/todolist")}
        {...props}
      >
        { children }
    </button>
    )
}
