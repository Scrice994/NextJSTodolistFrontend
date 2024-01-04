import { useTodosContext } from "@/context/TodosContext";
import { CreateTodoPostValues } from "@/network/services/TodoService";
import { requiredStringSchema } from "@/utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { GrClose } from 'react-icons/gr';
import * as yup from "yup";
import LoadingButton from "../LoadingButton";
import CustomInputField from "../utils/CustomInputField";
import CustomTextAreaField from "../utils/CustomTextAreaField";
import ModalContainer from "./ModalContainer";
import style from "./modals.module.css";

const validationSchema = yup.object({
    text: requiredStringSchema,
    description: yup.string()
})

interface AddTodoModalProps{
    onDismiss: () => void
}

export default function AddTodoModal({ onDismiss }: AddTodoModalProps){

    const { addTodo } = useTodosContext();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateTodoPostValues>({
        resolver: yupResolver(validationSchema)
    });

    async function onSubmit(input: CreateTodoPostValues){
        try {
            await addTodo(input);
            onDismiss();
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
 