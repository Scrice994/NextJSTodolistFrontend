import { User } from "@/models/user";
import * as usersAPI from "@/network/services/UserService";
import { UnauthorizedError } from "@/network/http-errors";
import useSWR from "swr";

/** da testare */
export default function useAuthenticatedUser(){

    const { data, isLoading, error, mutate } = useSWR("user", 
        async (): Promise<User | null> => {
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

    async function logout(){
        await usersAPI.logout();
        mutate(null);
        console.log("User logout");
    }

    return {
        user: data,
        userLoading: isLoading,
        userLoadingError: error,
        mutateUser: mutate,
        logout
    }
}