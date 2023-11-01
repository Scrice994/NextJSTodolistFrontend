import React, { InputHTMLAttributes } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import style from "./input.module.css";

interface CustomInputFieldProps{
    register: UseFormRegisterReturn
    label?: string
    error?: FieldError
}

export default function CustomInputField({ register, label, error, ...props }: CustomInputFieldProps & InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div>
            <input 
                className={!error?.message ? style.input : style.inputError}
                {...register}
                {...props}
            />
            <p className={style.error}>{error?.message}</p>
        </div>
    )
}
