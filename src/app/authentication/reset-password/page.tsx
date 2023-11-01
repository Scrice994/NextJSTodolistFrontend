"use client"
import { useForm } from 'react-hook-form';
import * as UsersApi from '@/network/api/users';
import loginStyle from "./login.module.css";
import { useState } from 'react';
import LoadingButton from '@/components/LoadingButton';
import Link from 'next/link';
import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError } from '@/network/http-errors';
import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { emailSchema, passwordSchema, requiredStringSchema } from '@/utils/validation';
import SocialSignInSection from '@/components/auth/SocialSignInSection';
import { useRouter } from 'next/navigation';
import useCountdown from '@/hooks/useCountdown';

const validationSchema = yup.object({
    email: emailSchema.required("Required"),
    password: passwordSchema.required("Required"),
    verificationCode: requiredStringSchema
})

type ResetPasswordFormData = yup.InferType<typeof validationSchema>;

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [errorText, setErrorText] = useState<string|null>(null);
    const [verificationCodeRequestPending, setVerificationCodeRequestPending] = useState(false);
    const [showVerificationCodeSentText, setShowVerificationCodeSentText] = useState(false);
    
    const { secondsLeft: verificationCodeCooldown, start: startVerificationCodeCooldown } = useCountdown();
    const { mutateUser } = useAuthenticatedUser();

    const router = useRouter();

    const { register, handleSubmit, trigger, getValues, formState: { errors, isSubmitting } } = useForm<ResetPasswordFormData>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (credentials: ResetPasswordFormData) => {
        try {
            setErrorText(null);
            const logUser = await UsersApi.resetPassword(credentials);
            mutateUser(logUser);
            console.log(logUser);
            router.push("/todolist")    
        } catch (error) {
            if (error instanceof ConflictError || error instanceof BadRequestError){
                setErrorText("Invalid credentials");
            } else {
                console.error(error);
                alert(error);
            }
        }
    }

    async function requestVerificationCode(){
        const validEmailInput = await trigger("email"); //fa il check della mail come se mandassimo il submit
        if(!validEmailInput) return;
        const emailInput = getValues("email");
        setErrorText(null);
        setShowVerificationCodeSentText(false);
        setVerificationCodeRequestPending(true);

        try {
            await UsersApi.requestEmailVerificationCode(emailInput);
            setShowVerificationCodeSentText(true);
            startVerificationCodeCooldown(60);
        } catch (error) {
            if(error instanceof NotFoundError){
                setErrorText(error.message);
            } else {
                console.error(error);
                alert(error);
            }
        } finally {
            setVerificationCodeRequestPending(false);
        }
    }

    return (
        <div>
            <h1>My todolist</h1>
            <h2>reach your goals</h2>
            { errorText && 
                <p style={{ color: 'red' }}>{ errorText }</p>
            }
            <form 
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >
                <input 
                    {...register("email")}
                    placeholder="Email..."
                    type="email"
                    className={loginStyle.inputSignup}
                />
                <p style={{ color: "red" }}>{errors.email?.message}</p>
                <input 
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="password"
                    className={loginStyle.inputSignup}
                />
                <p style={{ color: "red" }}>{errors.password?.message}</p>
                <input 
                    type={showPassword ? "text" : "password"}
                    {...register("verificationCode")}
                    placeholder="verification code..."
                    className={loginStyle.inputSignup}
                />
                <button
                    disabled={verificationCodeRequestPending || verificationCodeCooldown > 0}
                    onClick={requestVerificationCode}
                >Send code { verificationCodeCooldown > 0 && `(${verificationCodeCooldown})`}</button>
                <p style={{ color: "red" }}>{errors.verificationCode?.message}</p>
                <LoadingButton
                    type="submit"
                    isLoading={isSubmitting}
                >
                    Reset password
                </LoadingButton>
            </form>
        </div>
    ) 
}

export default ResetPassword;