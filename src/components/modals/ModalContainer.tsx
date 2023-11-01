import { ReactNode } from "react";
import style from "./modals.module.css";

interface ModalContainerProps{
    children: ReactNode,
    modalStyle: string,
    onDismiss: () => void
}

export default function ModalContainer({children, modalStyle, onDismiss}:ModalContainerProps) {
    return (
        <div className={style.window}>
            <div className={style.overlay} onClick={onDismiss}></div>
                <div className={modalStyle}>
                    {children}
                </div>
        </div>
    )
}
