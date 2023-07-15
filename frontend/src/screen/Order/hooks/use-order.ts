import { useToast } from "react-native-toast-notifications"
import { useAuth } from "../../../context/store"
import { SERVER_URL } from "../../../env"
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useQuery } from "@tanstack/react-query"
import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { Order } from "@/types"


interface DataResponse {
    error?: {message: string}, 
    order? : Order, 
}


interface useOrderQuery  {
    data ?: DataResponse
    isLoading : boolean 
    error : unknown 
    refetch:<TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, AxiosError<unknown, any>>>
}


const userOrder = (orderId:string)=>{
    const {user} = useAuth();
    const toast = useToast(); 
    const config :AxiosRequestConfig<{}>={headers:{authorization:`Bearer ${user?.tokens?.access?.token}`}} 
    const {data,isLoading,error,refetch}:useOrderQuery = useQuery({
        queryKey:["orders",orderId],
        queryFn:async()=>{
            const response = await axios.get(`${SERVER_URL}/orders/${orderId}`,config); 
            const data = await response.data ; 
            return data ; 
        }, 
        onError:(err:AxiosError)=>{
            toast.show((err.response?.data as any )?.error.message??"Unexpected Error"); 
        }
    }); 
    return {
        data:{
            order:data?.order??undefined , 
            error: (((error as AxiosError<unknown, any>)?.response )?.data as DataResponse)?.error?? undefined , 
        }, 
        isLoading,error , refetch
    }
}


export {
    userOrder
}