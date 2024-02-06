import { ReactNode } from "react";
import style from "../../styles/modals.module.css";

interface ModalContainerProps{
    children: ReactNode,
    modalStyle: string,
    overlayStyle: string,
    onDismiss?: () => void
}

export default function ModalContainer({children, modalStyle, overlayStyle, onDismiss}:ModalContainerProps) {
    return (
        <div className={style.window}>
            <div className={overlayStyle} onClick={onDismiss}></div>
                <div className={modalStyle}>
                    {children}
                </div>
        </div>
    )
}
