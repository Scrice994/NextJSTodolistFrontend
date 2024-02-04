import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import style from "../../styles/input.module.css";

interface CustomTextAreaFieldProps{
    register: UseFormRegisterReturn
    label?: string
    error?: FieldError
}

export default function CustomTextAreaField({ register, label, error, ...props }: CustomTextAreaFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <div>
            <textarea 
                className={!error?.message ? style.input : style.inputError}
                {...register}
                {...props}
            />
        </div>
    )
}
