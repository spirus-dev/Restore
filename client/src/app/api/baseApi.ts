import { fetchBaseQuery, type BaseQueryApi, type FetchArgs } from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../layout/uiSlice";
import { toast } from "react-toastify/unstyled";
import { router } from "../route/routes";

const customBaseQuery = fetchBaseQuery({
    baseUrl: "https://localhost:7022/api",
})

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

type ErrorResponse = | string | { title: string } | { title: string, errors: string[] };

export const baseQueryWithErrorHandling = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    api.dispatch(startLoading());
    await sleep();
    api.dispatch(stopLoading());
    const result = await customBaseQuery(args, api, extraOptions);
    if (result.error) {
        const {status, data} = result.error;
        
        console.log(result.error);

        const errorData = data as ErrorResponse;

        switch (status) {
            case 400:
                if(typeof errorData === 'string')
                    toast.error(errorData as string);
                else if('errors' in errorData)
                {
                    throw Object.values(errorData.errors).flat().join(', ');
                }
                else
                    toast.error(errorData.title);
                break;
            case 401:
                if(typeof errorData === 'object' && 'title' in errorData)
                    toast.error(errorData.title);
                break;
            case 404:
                if(typeof errorData === 'object' && 'title' in errorData)
                    router.navigate('/not-found');
                break;
            case 500:
                if(typeof errorData === 'object')
                    router.navigate('/server-error', {state: {error: errorData}});
                break;
            default:
                break;
        }
    }

    return result;
}