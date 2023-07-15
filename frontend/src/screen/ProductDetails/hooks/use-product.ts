import axios, { AxiosError } from "axios"

import {
    useQuery, 
  } from '@tanstack/react-query'
import { Product } from "../../../types"
import { SERVER_URL } from "../../../env"
import { useToast } from "react-native-toast-notifications"

interface useProductType  {
    data ?:{
        product: Product
        error ? :{message:string}
    }
    error : unknown
    isLoading : boolean 
   
}   
export const useProduct= (productId: string )=>{
    const toast = useToast()
    const {data,error,isLoading}:useProductType= useQuery({
        queryKey:["products",productId], 
        queryFn:async()=>{
            const response = await axios.get(SERVER_URL+'/products/'+productId)
            const data = await response.data
            return data;
          
        }, 
        onError:(err:any)=>{
            if(err instanceof AxiosError){
                return toast.show(
                    err?.response?.data?.error?.message?
                    err?.response?.data?.error?.message
                    :err.status == 401 ? "Unauthorized" : "Internal Server Error please try again",
                    {type:"danger"})
            }
            toast.show("Unexpected error",{type:"danger"})
        }

    })
    return {
        data:{
            product: data?.product ?? undefined,
            error: data?.error?? undefined
        },
        error,
        isLoading,
    }
}
