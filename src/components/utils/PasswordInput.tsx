import { InputHTMLAttributes, useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import style from "../../styles/input.module.css";

interface PasswordInputProps{
    register: UseFormRegisterReturn
    error?: FieldError
}

export default function PasswordInput({ error, register, ...props }: PasswordInputProps & InputHTMLAttributes<HTMLInputElement>) {

    const [showPassword, setShowPassword] = useState(false);
    
    return (
        <div>
            <div 
                className={!error?.message ? style.inputPasswordContainer : style.inputPasswordContainerError}
            >
            <input 
                {...register}
                type={showPassword ? "text" : "password"}
                {...props}
                className={!error?.message ? style.inputPassword : style.inputPasswordError}
            />
            {!showPassword ?
                <div 
                    className={style.showHidePasswordButton}
                    onClick={() => {setShowPassword(!showPassword)}}
                >
                    <AiFillEye
                        className={style.passwordIcon}
                    />
                </div> 
                :
                <div 
                className={style.showHidePasswordButton}
                onClick={() => {setShowPassword(!showPassword)}}
                >
                    <AiFillEyeInvisible
                        className={style.passwordIcon}
                    />
                </div>  
            }
            </div>
            <p className={style.error}>{error?.message}</p>
        </div>
    )
}
