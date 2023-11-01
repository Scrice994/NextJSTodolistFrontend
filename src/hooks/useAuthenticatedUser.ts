import * as usersAPI from "@/network/api/users";
import { UnauthorizedError } from "@/network/http-errors";
import useSWR from "swr";

/** da testare */
export default function useAuthenticatedUser(){

    const { data, isLoading, error, mutate } = useSWR("user", 
        async () => {
            try {
                return await usersAPI.getAuthenticatedUser();
            } catch (error) {
                if(error instanceof UnauthorizedError){
                    return null;
                } else {
                    throw error;
                }
            }
        }
    );

    return{
        user: data,
        userLoading: isLoading,
        userLoadingError: error,
        mutateUser: mutate
    }
}