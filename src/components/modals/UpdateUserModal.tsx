import { TooManyRequestError, UnauthorizedError } from "@/common/services/http-errors";
import { requiredStringSchema, usernameSchema } from "@/utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import style from "../../styles/modals.module.css";
import CustomInputField from "../utils/CustomInputField";
import LoadingButton from "../utils/LoadingButton";
import ModalContainer from "./ModalContainer";
import { useUdpateUserMutation } from "@/lib/features/api/userSlice";

const validationSchema = yup.object({
    username: usernameSchema.required("Username is required"),
})

export type UpdateUserFormData = yup.InferType<typeof validationSchema>;

interface UpdateUserModalProps{
    onDismiss: () => void
}

export default function UpdateUserModal({ onDismiss }: UpdateUserModalProps) {
    const [errorText, setErrorText] = useState<string|null>(null);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UpdateUserFormData>({
        resolver: yupResolver(validationSchema),
    });

    const [updateUser] = useUdpateUserMutation();

    const onSubmit = async (credentials: UpdateUserFormData) => {
        try {
            setErrorText(null);
            updateUser(credentials).unwrap();
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
            overlayStyle={style.darkOverlay}
        >
            <header>
                <h2 className={style.header}>Choose username</h2>
                { errorText && <p style={{ color: 'red' }}>{ errorText }</p>}
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CustomInputField 
                    register={register("username")}
                    error={errors.username}
                    placeholder="Username..."
                />
                <LoadingButton
                    type="submit"
                    isLoading={isSubmitting}
                    style={style.button}
                >
                    Update
                </LoadingButton>
                </form>
        </ModalContainer>
    )
}
