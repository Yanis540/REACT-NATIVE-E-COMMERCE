 import axios from "axios"

import {
    useMutation,
    UseMutateFunction,
    useQueryClient,
  } from '@tanstack/react-query'
import { useEffect } from "react"
import { Category, Product } from "../types"
import { SERVER_URL } from "../env"
import { onError } from "../utils"
  
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
}   
const useProducts= ()=>{
    const queryClient = useQueryClient();
    const {data,error,isLoading,mutate:getProducts}:useProductsType= useMutation({
        mutationKey:["products"], 
        mutationFn:async({name,categories}:{name?:string,categories?:Category[]})=>{
            const response = await axios.post(SERVER_URL+'/products',{name,categories:categories??[]})
            const data = await response.data
            return data;
        }, 
        onError:(err)=>onError(err,["products"],queryClient)
       
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
        getProducts
    }
}


export {useProducts}