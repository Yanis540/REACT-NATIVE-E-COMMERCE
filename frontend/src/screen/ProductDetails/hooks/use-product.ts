import axios from "axios"

import {
    useQuery, useQueryClient, 
  } from '@tanstack/react-query'
import { Product } from "../../../types"
import { SERVER_URL } from "../../../env"
import { onError } from "../../../utils"
interface useProductType  {
    data ?:{
        product: Product
        error ? :{message:string}
    }
    error : unknown
    isLoading : boolean 
   
}   
export const useProduct= (productId: string )=>{
    const queryClient = useQueryClient()

    const {data,error,isLoading}:useProductType= useQuery({
        queryKey:["products",productId], 
        queryFn:async()=>{
            const response = await axios.get(SERVER_URL+'/products/'+productId)
            const data = await response.data
            return data;
          
        }, 
        onError:(err:any)=>onError(err,["products",productId],queryClient)

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
