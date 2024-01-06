import { User } from "@/models/user";
import { UserService } from "../common/services/UserService";
import { UnauthorizedError } from "../common/services/http-errors";
import useSWR from "swr";
import { IHttpClient } from "@/common/interfaces/IHttpClient";

/** da testare */
export default function useAuthenticatedUser(httpClient: IHttpClient){

    const userService = new UserService(httpClient);

    const { data, isLoading, error, mutate } = useSWR("user", 
        async (): Promise<User | null> => {
            try {
                return await userService.getAuthenticatedUser();
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
        await userService.logout();
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