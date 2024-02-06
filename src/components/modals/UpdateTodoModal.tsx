import { useUpdateTodoMutation } from "@/lib/features/api/todoSlice";
import { Todo } from "@/models/todo";
import { formatDate } from "@/utils/formatDate";
import { requiredStringSchema } from "@/utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import style from '../../styles/modals.module.css';
import CustomInputField from "../utils/CustomInputField";
import CustomTextAreaField from "../utils/CustomTextAreaField";
import LoadingButton from "../utils/LoadingButton";
import ModalContainer from "./ModalContainer";

const validationSchema = yup.object({
    text: requiredStringSchema,
    description: yup.string()
})

export type UpdateTodoValues = yup.InferType<typeof validationSchema>;

interface UpdateTodoModalProps{
    todo: Todo | null
    onDismiss: () => void
}

const UpdateTodoModal = ({ todo, onDismiss }: UpdateTodoModalProps) => {
   //const { data: todo } = useGetTodoQuery(todoId!);     

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UpdateTodoValues>({
        defaultValues: { text: todo?.text, description: todo?.description },
        resolver: yupResolver(validationSchema),
    });

    const [updateTodo] = useUpdateTodoMutation();

    const todoCreatedAt = formatDate(todo?.createdAt!);
    const todoUpdatedAt = formatDate(todo?.updatedAt!)

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
                    <p style={{marginBottom: "1em"}}>{todoUpdatedAt ? todoUpdatedAt : todoCreatedAt}</p>
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