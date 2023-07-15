 import axios, { AxiosError } from "axios"

import {
    useMutation,
    UseMutateFunction, UseMutateAsyncFunction, 
    useQueryClient,
  } from '@tanstack/react-query'
import { useEffect } from "react"
import { Category, Product } from "../types"
import { SERVER_URL } from "../env"
import { useToast } from "react-native-toast-notifications"
  
interface useProductsType  {
    data ?:{
        products: Product[], 
        error?:{message:string}

    } 
    error : unknown
    isLoading : boolean 
    mutate : UseMutateFunction<any, unknown, {
        name?: string | undefined;
        categories?: Category[] | undefined;
    }, unknown>
    mutateAsync : UseMutateAsyncFunction<any, unknown, {
        name?: string | undefined;
        categories?: Category[] | undefined;
    }, unknown>

}   
const useProducts= ()=>{
    const toast = useToast(); 
    const {data,error,isLoading,mutate:getProducts,mutateAsync:getAsyncProducts}:useProductsType= useMutation({
        mutationKey:["products"], 
        mutationFn:async({name,categories}:{name?:string,categories?:Category[]})=>{
            const response = await axios.post(SERVER_URL+'/products',{name,categories:categories??[]})
            const data = await response.data
            return data;
        }, 
        onError:(err)=>{
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
    useEffect(()=>{
        getProducts({})
    },[getProducts])
    return {
        data:{
            products: data?.products?data.products:[],
            error:data?.error??undefined
        }, 
        error,
        isLoading,
        getProducts, 
        getAsyncProducts
    }
}


export {useProducts}