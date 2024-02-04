import CustomIcon from '../utils/CustomIcon';
import { FcDeleteDatabase } from 'react-icons/fc';
import { HiMiniPlus } from 'react-icons/hi2';
import style from "../../styles/todoList.module.css";
import { useTodolistModalsContext } from '@/context/TodolistModalsProvider';

export default function ToolBar() {
    const {showAddTodoModal, showDeleteAllTodoModal} = useTodolistModalsContext()

    return (
        <div className={style.toolBar}>
            <CustomIcon 
                icon={<HiMiniPlus />}
                iconContainerStyle={style.listIconContainer}
                iconStyle={style.listIcon}
                iconFunction={showAddTodoModal}
            />
            <CustomIcon 
                icon={<FcDeleteDatabase />}
                iconContainerStyle={style.listIconContainer}
                iconStyle={style.listIcon}
                iconFunction={showDeleteAllTodoModal}
            />  
        </div>
    )
}
