import React, { ReactNode } from 'react'
import style from "./header.module.css";

export default function Header ({ children }: {children: ReactNode}){
    return (
        <header 
            className={style.header}
        >
            <ul
                className={style.headerNav}
            >
                { children }
            </ul>
        </header>
    )
}