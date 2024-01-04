import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { TooManyRequestError, UnauthorizedError } from "@/network/http-errors";
import { requiredStringSchema } from "@/utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import * as UserAPI from "../../network/services/UserService";
import LoadingButton from "../LoadingButton";
import ModalContainer from "./ModalContainer";
import CustomInputField from "../utils/CustomInputField";
import PasswordInput from "../utils/PasswordInput";
import style from "./modals.module.css";
import GoogleSignInButton from "../auth/GoogleSignInButton";

const validationSchema = yup.object({
    username: requiredStringSchema,
    password: requiredStringSchema,
})

type LoginFormData = yup.InferType<typeof validationSchema>;

interface LogInModalProps{
    openSignUpModal: () => void
    onDismiss: () => void
}

export default function LogInModal({ openSignUpModal, onDismiss }: LogInModalProps) {

    const [showPassword, setShowPassword] = useState(false);
    const [errorText, setErrorText] = useState<string|null>(null);

    const { mutateUser } = useAuthenticatedUser();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (credentials: LoginFormData) => {
        try {
            setErrorText(null);
            const logUser = await UserAPI.login(credentials);
            mutateUser(logUser);
            onDismiss();   
        } catch (error) {
            if (error instanceof UnauthorizedError){
                setErrorText("Invalid credentials");
            } else if (error instanceof TooManyRequestError){
                setErrorText("You're trying too often")
            } else {
                console.error(error);
                alert(error);
            } 
        }
    }

    return (
        <ModalContainer
            modalStyle={style.modalWithAnimation}
            onDismiss={onDismiss}
        >
            <header>
                <h2 className={style.header}>Login</h2>
                { errorText && <p style={{ color: 'red' }}>{ errorText }</p>}
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
                <div>Forgot password?</div>
        </ModalContainer>
    )
}
