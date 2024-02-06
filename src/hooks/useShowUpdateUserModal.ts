import { useAuthModalsContext } from "@/context/AuthModalsProvider";
import { useGetUserQuery } from "@/lib/features/api/userSlice";
import { useEffect } from "react";

export function useShowUpdateUserModal(){
    const { data: user } = useGetUserQuery();
    const { showUpdateUserModal } = useAuthModalsContext();

    useEffect(() => {
        if(user && !user.username){
            showUpdateUserModal();
        }
    },[user]);
}