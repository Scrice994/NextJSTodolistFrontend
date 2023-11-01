import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { BadRequestError, ConflictError } from "@/network/http-errors";
import { emailSchema, passwordSchema, usernameSchema } from "@/utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import * as UserAPI from "../../network/api/users";
import LoadingButton from "../LoadingButton";
import CustomInputField from "../utils/CustomInputField";
import PasswordInput from "../utils/PasswordInput";
import ModalContainer from "./ModalContainer";
import style from "./modals.module.css";

const validationSchema = yup.object({
    username: usernameSchema.required("Username is required"),
    email: emailSchema.required("Email is required"),
    password: passwordSchema.required("Password is required"),
    // verificationCode: requiredStringSchema
})

type SignUpFormData = yup.InferType<typeof validationSchema>

interface SignUpModalProps{
    openLogInModal: () => void
    onDismiss: () => void
}

const AddTodoDialog = ({ openLogInModal, onDismiss }: SignUpModalProps) => {

    const [errorText, setErrorText] = useState<string|null>(null);
    const [formSubmitted, setFormSubmitted] = useState(false);
    
    const { register, handleSubmit, getValues, trigger, formState: { errors, isSubmitting } } = useForm<SignUpFormData>({
        resolver: yupResolver(validationSchema)
    });

    async function onSubmit(credentials: SignUpFormData){
        try {
            setErrorText(null);
            await UserAPI.signUp(credentials);
            setFormSubmitted(true);
        } catch (error) {
            if(error instanceof BadRequestError || error instanceof ConflictError){
                setErrorText(error.message);
            } else {
                console.error(error);
                alert(error);
            }   
        }
    };

    return (
        <ModalContainer
            modalStyle={style.modalWithAnimation}
            onDismiss={onDismiss}
        >   
            <header>
                <h2 className={style.header}>Create an account:</h2>
                { errorText && <p className={style.error}>{errorText}</p> }
                { formSubmitted && !errorText && 
                    <div className={style.successAlert}> We sent you a verfication email. Please check your inbox!</div>
                }
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CustomInputField
                    type="text" 
                    register={register("username")}
                    error={errors.username}
                    placeholder="Username..."
                />
                <CustomInputField
                    type="email"
                    register={register("email")}
                    error={errors.email}
                    placeholder="Email..."
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
                    Sign Up
                </LoadingButton>
            </form>
            <div>
                Already have an account?
                <a
                    className={style.link}
                    onClick={() => {
                        openLogInModal();
                        onDismiss();
                    }}
                >
                    Log In
                </a>
            </div>
        </ModalContainer>
    );
}
 
export default AddTodoDialog;