import { useToast } from "react-native-toast-notifications"
import { useAuth } from "../../../context/store"
import { SERVER_URL } from "../../../env"
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useQuery } from "@tanstack/react-query"
import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { Order } from "@/types"


interface DataResponse {
    error?: {message: string}, 
    orders? : Order[], 
}


interface useOrdersQuery  {
    data ?: DataResponse
    isLoading : boolean 
    error : unknown 
    refetch:<TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, AxiosError<unknown, any>>>
}


const userOrders = ()=>{
    const {user} = useAuth();
    const toast = useToast(); 
    const config :AxiosRequestConfig<{}>={headers:{authorization:`Bearer ${user?.tokens?.access?.token}`}} 
    const {data,isLoading,error,refetch}:useOrdersQuery = useQuery({
        queryKey:["orders"],
        queryFn:async()=>{
            const response = await axios.get(`${SERVER_URL}/orders`,config); 
            const data = await response.data ; 
            return data ; 
        }, 
        onError:(err:AxiosError)=>{
            toast.show((err.response?.data as any )?.error.message??"Unexpected Error"); 
        }
    }); 
    return {
        data:{
            orders:data?.orders??[] , 
            error: (((error as AxiosError<unknown, any>)?.response )?.data as DataResponse)?.error?? undefined , 
        }, 
        isLoading,error , refetch
    }
}


export {
    userOrders
}