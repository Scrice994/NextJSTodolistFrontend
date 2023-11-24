import * as UserAPI from "@/network/api/users";
import { BadRequestError, ConflictError, HttpError, TooManyRequestError, UnauthorizedError, isCustomError } from "@/network/http-errors";
import { requiredStringSchema } from "@/utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import LoadingButton from "../LoadingButton";
import CustomInputField from "../utils/CustomInputField";
import PasswordInput from "../utils/PasswordInput";
import ModalContainer from "./ModalContainer";
import style from "./modals.module.css";

const validationSchema = yup.object({
    username: requiredStringSchema,
    password: requiredStringSchema,
})

type CreateMemberFormData = yup.InferType<typeof validationSchema>;

interface CreateMemberModalProps{
    openCreateMemberModal: () => void
    onDismiss: () => void
}

export default function CreateMemberModal({ openCreateMemberModal, onDismiss }: CreateMemberModalProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [errorText, setErrorText] = useState<string|null>(null);
    const [successfullMessage, setSuccessfullMessage] = useState(false);


    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateMemberFormData>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (credentials: CreateMemberFormData) => {
        try {
            setSuccessfullMessage(false);
            setErrorText(null);
            const logUser = await UserAPI.createNewGroupMember(credentials);
            setSuccessfullMessage(true)  
        } catch (error) {
            if (error instanceof ConflictError || error instanceof BadRequestError){
                setErrorText(error.message);
            } else {
                setErrorText("Uknown error!")
            } 
        }
    }

    return (
        <ModalContainer
            modalStyle={style.modalWithAnimation}
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
