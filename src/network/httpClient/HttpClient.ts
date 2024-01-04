import axios from "axios";
import { BadRequestError, ConflictError, NotFoundError, TooManyRequestError, UnauthorizedError } from "../http-errors";

export interface Request {
    method: string;
    headers?: any;
    body?: any;
}

export interface IHttpClient {
    sendRequest(url: string, request: Request): Promise<any> 
}

export class HttpClient implements IHttpClient {

    async sendRequest(url: string, request: Request): Promise<any> {
        axios.interceptors.response.use(
            (res) => {
                if(res.data){
                    res = res.data;
                }
                return res;
            }, 
            (error) => {
            if(axios.isAxiosError(error)){
                const errorMessage = error.response?.data?.error;
                switch (error.response?.status){
                    case 400: throw new BadRequestError(errorMessage);
                    case 401: throw new UnauthorizedError(errorMessage);
                    case 404: throw new NotFoundError(errorMessage);
                    case 409: throw new ConflictError(errorMessage);
                    case 429: throw new TooManyRequestError(errorMessage);
                }
            }
            throw error;
        })

        return (await axios('http://localhost:8080' + url, { ...this.requestToFetch(request), withCredentials: true }));
    }

    private requestToFetch(request: Request){
        return {
            method: request.method,
            headers: request.headers,
            data: request.body
        }
    }
}