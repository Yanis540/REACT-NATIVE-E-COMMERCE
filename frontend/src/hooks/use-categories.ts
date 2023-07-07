
import { UseMutateFunction, useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { SERVER_URL } from "../env"
import { Category } from "../types"
import { useEffect } from "react"


interface  useCategoriesType {
    error: unknown 
    data : {
        categories : Category[]
    }|undefined
    isLoading : boolean
    mutate:UseMutateFunction<any, unknown, void, unknown>
}

const useCategories = ()=>{
    const {data,isLoading,error,mutate}:useCategoriesType  = useMutation({
        mutationKey:["categories"], 
        mutationFn:async()=>{
            const response = await axios.get(SERVER_URL+`/products/categories`)
            const data = await response.data
            return data;
        },
    }) 
    useEffect(()=>{
        mutate()
    },[mutate])
    return {
        categories:data?.categories??[],
        isLoading,
        error
    }
}

export {
    useCategories
}