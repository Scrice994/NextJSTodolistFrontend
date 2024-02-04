import React from 'react';
import Todolist from './Todolist';
import ToolBar from './ToolBar';
import style from "../../styles/todoList.module.css";

export default function List() {
    return (
        <div className={style.list}>
            <ToolBar />
            <Todolist />
        </div>
    )
}
