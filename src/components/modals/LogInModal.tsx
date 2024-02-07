import { useLoginMutation } from "@/lib/features/api/userSlice";
import { hasCustomErrorMessage } from "@/utils/hasCustomErrorMessage";
import { requiredStringSchema } from "@/utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import style from "../../styles/modals.module.css";
import GoogleSignInButton from "../auth/GoogleSignInButton";
import CustomInputField from "../utils/CustomInputField";
import LoadingButton from "../utils/LoadingButton";
import PasswordInput from "../utils/PasswordInput";
import ModalContainer from "./ModalContainer";

const validationSchema = yup.object({
    username: requiredStringSchema,
    password: requiredStringSchema,
})

export type LoginFormData = yup.InferType<typeof validationSchema>;

interface LogInModalProps{
    openSignUpModal: () => void
    onDismiss: () => void
}

export default function LogInModal({ openSignUpModal, onDismiss }: LogInModalProps) {
    const [errorText, setErrorText] = useState<string|null>(null);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
        resolver: yupResolver(validationSchema),
    });

    const [login] = useLoginMutation();

    const onSubmit = async (credentials: LoginFormData) => {
        try {
            setErrorText(null);
            await login(credentials).unwrap();
            onDismiss();   
        } catch (error) {
            if(hasCustomErrorMessage(error)){
                setErrorText(error.data.error);
            }
        }
    }

    return (
        <ModalContainer
            modalStyle={style.modalWithAnimation}
            overlayStyle={style.darkOverlay}
            onDismiss={onDismiss}
        >
            <header>
                <h2 className={style.header}>Login</h2>
                { errorText && <p className={style.errorAlert}>{ errorText }</p>}
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CustomInputField 
                    register={register("username")}
                    error={errors.username}
                    placeholder="Username..."
                />
                <PasswordInput 
                    register={register("password")}
                    error={errors.password}
                    placeholder="Password..."
                />
                <LoadingButton
                    type="submit"
                    isLoading={isSubmitting}
                    style={style.button}
                >
                    Log in
                </LoadingButton>
                </form>
                <GoogleSignInButton />
                <div>
                    Don&apos;t have an account?
                    <a
                        className={style.link}
                        onClick={() => {
                            openSignUpModal();
                            onDismiss();
                        }}
                    >
                        Sign up
                    </a>
                </div>
        </ModalContainer>
    )
}
