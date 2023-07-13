

import { UseMutateFunction, UseMutateAsyncFunction, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { SERVER_URL } from "../../../../env"
import { Product } from "../../../../types"
import { onError } from "../../../../utils"
import { useEffect } from "react"

interface DataResponse {
    favorite_products ?: Product[], 
    error ?:{message:string}
}
interface  useFavoriteProductsType {
    error: unknown 
    data : DataResponse|undefined
    isLoading : boolean
    mutate:UseMutateFunction<any, unknown, void, unknown>
    mutateAsync:UseMutateAsyncFunction<any, unknown, void, unknown>
}

const useFavoriteProducts = ()=>{
    const queryClient = useQueryClient();
    const {data,isLoading,error,mutate,mutateAsync}:useFavoriteProductsType  = useMutation({
        mutationKey:["products","favorites"], 
        mutationFn:async()=>{
            const response = await axios.get(SERVER_URL+`/products/favorites`)
            const data = await response.data
            return data;
        },
        onError:(err)=>onError(err,["products","favorites"],queryClient)
    }) 
    useEffect(()=>{
        mutate()
    },[mutate]); 
    const refresh = mutateAsync; 
    return {
        data:{
            favorite_products:data?.favorite_products??[],
            error:(((error as AxiosError<unknown, any>)?.response )?.data as DataResponse)?.error?? undefined 
        },
        refresh,
        isLoading,
        error
    }
}

export {
    useFavoriteProducts
}