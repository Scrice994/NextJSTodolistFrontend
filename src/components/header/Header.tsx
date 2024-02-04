"use client"
import { useGetUserQuery } from '@/lib/features/api/userSlice';
import { FaUser } from 'react-icons/fa';
import style from "../../styles/header.module.css";
import { useAuthModalsContext } from '@/context/AuthModalsProvider';
import CustomIcon from '../utils/CustomIcon';

export default function Header (){
    const { data: user } = useGetUserQuery({});
    const { toggleUserModal } = useAuthModalsContext();

    return (
        <header 
            className={style.header}
        >
            <div
                className={style.headerNav}
            >
                <h1 className={style.headerTitle}>My Personal Project</h1>
                <CustomIcon 
                    icon={<FaUser/>}
                    iconFunction={toggleUserModal}
                    iconContainerStyle={user ? style.headerButtonOnline : style.headerButton}
                    iconStyle={style.userIcon}
                />
            </div>
        </header>
    )
}