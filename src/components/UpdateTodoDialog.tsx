import { Todo as TodoModel } from "@/models/todo";
import modalStyle from '@/styles/updateTodoDialog.module.css';
import { formatDate } from "@/utils/formatDate";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import CustomInputField from "./utils/CustomInputField";
import CustomTextAreaField from "./utils/CustomTextAreaField";
import { requiredStringSchema } from "@/utils/validation";
import LoadingButton from "./LoadingButton";

const validationSchema = yup.object({
    text: requiredStringSchema,
    description: yup.string()
})

export type UpdateTodoValues = yup.InferType<typeof validationSchema>;

interface UpdateTodoDialogProps{
    todo: TodoModel
    onUpdateTodo: (todoId: string, todoToUpdate: UpdateTodoValues) => void
    onDismiss: () => void
}

const UpdateTodoDialog = ({ todo, onDismiss, onUpdateTodo }: UpdateTodoDialogProps) => {
    const { text, description, createdAt } = todo;

    const todoCreatedAt = formatDate(createdAt);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UpdateTodoValues>({
        defaultValues: { text, description },
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (formValues: UpdateTodoValues) => {
        try {
            onUpdateTodo(todo.id, formValues);
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className={modalStyle.modal}>
            <div className={modalStyle.overlay} onClick={onDismiss}></div>
            <div className={modalStyle.window}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CustomInputField 
                    autoFocus
                    type="text"
                    register={register("text")}
                    error={errors.text}
                />
                <CustomTextAreaField 
                    register={register("description")}
                    rows={2}
                />
                <div className={modalStyle.footer}>
                    <span>{todoCreatedAt}</span>
                    <LoadingButton
                        type="submit"
                        isLoading={isSubmitting}
                        style={modalStyle.button}
                    >
                        Update
                    </LoadingButton>
                    <button 
                        onClick={onDismiss}
                        className={modalStyle.done}
                    >
                        Done
                    </button>
                </div>
            </form>
            </div>
        </div>
    )
}

export default UpdateTodoDialog;