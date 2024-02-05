import { Todo as TodoModel } from "@/models/todo";
import style from '../../styles/modals.module.css';
import { formatDate } from "@/utils/formatDate";
import { requiredStringSchema } from "@/utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import LoadingButton from "../utils/LoadingButton";
import CustomInputField from "../utils/CustomInputField";
import CustomTextAreaField from "../utils/CustomTextAreaField";
import { useUpdateTodoMutation } from "@/lib/features/api/todoSlice";
import ModalContainer from "./ModalContainer";

const validationSchema = yup.object({
    text: requiredStringSchema,
    description: yup.string()
})

export type UpdateTodoValues = yup.InferType<typeof validationSchema>;

interface UpdateTodoModalProps{
    todo: TodoModel | null
    onDismiss: () => void
}

const UpdateTodoModal = ({ todo, onDismiss }: UpdateTodoModalProps) => {
    const { text, description, createdAt } = {...todo};

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UpdateTodoValues>({
        defaultValues: { text, description },
        resolver: yupResolver(validationSchema),
    });

    const [updateTodo] = useUpdateTodoMutation();

    const todoCreatedAt = formatDate(createdAt!);

    const onSubmit = async (formValues: UpdateTodoValues) => {
        try {
            if(todo){
                await updateTodo({
                    id: todo.id,
                    toUpdate: formValues
                }).unwrap();
                onDismiss();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ModalContainer 
            modalStyle={style.modal} 
            overlayStyle={style.darkOverlay} 
            onDismiss={onDismiss}            
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <CustomInputField 
                    type="text"
                    register={register("text")}
                    error={errors.text}
                />
                <CustomTextAreaField 
                    register={register("description")}
                    rows={2}
                />
                <div className={style.footer}>
                    <p style={{marginBottom: "1em"}}>{todoCreatedAt}</p>
                    <div className={style.buttonContainer}>   
                        <LoadingButton
                            type="submit"
                            isLoading={isSubmitting}
                            style={style.button}
                        >
                            Update
                        </LoadingButton>
                        <button 
                            onClick={onDismiss}
                            className={style.button}
                        >
                            Done
                        </button>
                    </div>
                </div>
            </form>
        </ModalContainer>
    )
}

export default UpdateTodoModal;