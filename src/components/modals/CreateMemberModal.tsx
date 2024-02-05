import { requiredStringSchema } from "@/utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import LoadingButton from "../utils/LoadingButton";
import CustomInputField from "../utils/CustomInputField";
import PasswordInput from "../utils/PasswordInput";
import ModalContainer from "./ModalContainer";
import style from "../../styles/modals.module.css";
import { useCreateNewMemberMutation } from "@/lib/features/api/userSlice";
import { hasCustomErrorMessage } from "@/utils/hasCustomErrorMessage";

const validationSchema = yup.object({
    username: requiredStringSchema,
    password: requiredStringSchema,
})

type CreateMemberFormData = yup.InferType<typeof validationSchema>;

interface CreateMemberModalProps{
    onDismiss: () => void
}

export default function CreateMemberModal({ onDismiss }: CreateMemberModalProps) {
    const [errorText, setErrorText] = useState<string|null>(null);
    const [successfullMessage, setSuccessfullMessage] = useState(false);
    const [createNewMember,{ error }] = useCreateNewMemberMutation();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateMemberFormData>({
        resolver: yupResolver(validationSchema),
    });

    console.log(errorText)

    const onSubmit = async (credentials: CreateMemberFormData) => {
        try {
            setSuccessfullMessage(false);
            setErrorText(null);
            await createNewMember(credentials).unwrap();
            setSuccessfullMessage(true)  
        } catch (err) {
            if(hasCustomErrorMessage(err)){
                setErrorText(err.data.error);
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
                <h2 className={style.header}>Create new member</h2>
                { errorText && <p style={{ color: 'red' }}>{ errorText }</p>}
                { successfullMessage && !errorText && 
                    <div className={style.successAlert}>Member account created with success!</div>
                }
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
                    Create
                </LoadingButton>
                </form>
        </ModalContainer>
    )
}
