 import axios from "axios"

import {
    useMutation,
    UseMutateFunction,
  } from '@tanstack/react-query'
import { useEffect } from "react"
import { Category, Product } from "../types"
import { SERVER_URL } from "../env"
  
interface useProductsType  {
    data ?:{
        products: Product[]
    } 
    error : unknown
    isLoading : boolean 
    mutate : UseMutateFunction<any, unknown, {
        name?: string | undefined;
        categories?: Category[] | undefined;
    }, unknown>
}   
const useProducts= ()=>{
    const {data,error,isLoading,mutate:getProducts}:useProductsType= useMutation({
        mutationKey:["products"], 
        mutationFn:async({name,categories}:{name?:string,categories?:Category[]})=>{
            const response = await axios.post(SERVER_URL+'/products',{name,categories:categories??[]})
            const data = await response.data
            return data;
        }
       
    })
    useEffect(()=>{
        getProducts({})
    },[getProducts])
    return {
        products: data?.products?data.products:[],
        error,
        isLoading,
        getProducts
    }
}


export {useProducts}