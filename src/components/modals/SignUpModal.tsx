import { useSignupMutation } from "@/lib/features/api/userSlice";
import { hasCustomErrorMessage } from "@/utils/hasCustomErrorMessage";
import { emailSchema, passwordSchema, tenantIdSchema, usernameSchema } from "@/utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import style from "../../styles/modals.module.css";
import CustomInputField from "../utils/CustomInputField";
import LoadingButton from "../utils/LoadingButton";
import PasswordInput from "../utils/PasswordInput";
import ModalContainer from "./ModalContainer";

const validationSchema = yup.object({
    username: usernameSchema.required("Username is required"),
    email: emailSchema.required("Email is required"),
    password: passwordSchema.required("Password is required"),
    tenantId: tenantIdSchema
})

export type SignUpFormData = yup.InferType<typeof validationSchema>;

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

    const [signup] = useSignupMutation();

    async function onSubmit(credentials: SignUpFormData){
        try {
            setFormSubmitted(false);
            setErrorText(null);
            await signup(credentials).unwrap();
            setFormSubmitted(true);
        } catch (error) {
            if(hasCustomErrorMessage(error)){
                setErrorText(error.data.error);
            } 
        }
    };

    return (
        <ModalContainer
            modalStyle={style.modalWithAnimation}
            overlayStyle={style.darkOverlay}
            onDismiss={onDismiss}
        >   
            <header>
                <h2 className={style.header}>Create an account:</h2>
                { errorText && <p className={style.errorAlert}>{errorText}</p> }
                { formSubmitted && !errorText && 
                    <div className={style.successAlert}> We sent you a verfication email. Please check your inbox!</div>
                }
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CustomInputField
                    type="text" 
                    register={register("username")}
                    error={errors.username}
                    placeholder="Username...*"
                />
                <CustomInputField
                    type="email"
                    register={register("email")}
                    error={errors.email}
                    placeholder="Email...*"
                />
                <PasswordInput 
                    register={register("password")}
                    error={errors.password}
                    placeholder="Password...*"
                />
                <CustomInputField 
                    type="text"
                    register={register("tenantId")}
                    error={errors.tenantId}
                    placeholder="Group name..."
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