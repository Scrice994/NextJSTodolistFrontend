import { Todo } from "@/models/todo";
import { CreateTodoPostValues, createTodo } from "@/network/api/todo";
import { requiredStringSchema } from "@/utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { GrClose } from 'react-icons/gr';
import * as yup from "yup";
import LoadingButton from "../LoadingButton";
import style from "./modals.module.css";
import ModalContainer from "./ModalContainer";
import CustomInputField from "../utils/CustomInputField";
import CustomTextAreaField from "../utils/CustomTextAreaField";

const validationSchema = yup.object({
    text: requiredStringSchema,
    description: yup.string()
})

interface AddTodoModalProps{
    onDismiss: () => void
    onTodoCreated: (todo: Todo) => void
}

export default function AddTodoModal({onDismiss, onTodoCreated}: AddTodoModalProps){

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateTodoPostValues>({
        resolver: yupResolver(validationSchema)
    });

    async function onSubmit(input: CreateTodoPostValues){
        try {
            const response = await createTodo(input);
            onTodoCreated(response);
        } catch (error) {
            console.log(error);
            alert(error);
        }
    };

    return (
        <ModalContainer
            modalStyle={style.modal}
            onDismiss={onDismiss}
        >
            <div className={style.header}>
                <h2>Add task</h2>
                <GrClose 
                    onClick={onDismiss}
                    className={style.close}
                />
            </div>
            <form  onSubmit={handleSubmit(onSubmit)}>
                <CustomInputField 
                    autoFocus
                    type="text"
                    placeholder="Enter task..."
                    register={register("text")}
                    error={errors.text}
                />
                <CustomTextAreaField 
                    register={register("description")}
                    placeholder="Enter description..."
                    rows={5}
                />
                <hr/>
                <LoadingButton 
                    isLoading={isSubmitting}
                    style={style.addTodoButton}
                    type="submit"
                >
                    Create
                </LoadingButton>
            </form>
        </ModalContainer>
    );
}
 