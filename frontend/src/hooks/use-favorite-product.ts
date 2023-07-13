import { Product } from "@/types"
import { useAuth } from "../context/store"
import { SERVER_URL } from "../env"
import { UseMutateAsyncFunction, useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError, AxiosRequestConfig } from "axios"

type DataResponse ={
    favorite_products ? : Product[],
    error?:{message:string} 
}
interface  useFavoriteMutationType {

    mutateAsync : UseMutateAsyncFunction<any, unknown, void, unknown>
    error: unknown 
    data ?: DataResponse
    isLoading : boolean
}
const useFavoriteProduct = (productId:string)=>{
    const {user,set_user} = useAuth(); 
    const queryClient = useQueryClient(); 
    const config:AxiosRequestConfig<{}> = {headers:{authorization:`Bearer ${user?.tokens?.access.token??""}`}}
    const {data:dataIsAdding,isLoading:isLoadingAdding,error:errorAdding,mutateAsync:add} : useFavoriteMutationType = useMutation({
        mutationKey:["post","products","favorite","productId"], 
        mutationFn:async()=>{
            const response = await axios.post(`${SERVER_URL}/products/favorite/${productId}`,{},config)
            const data = await response.data
            return data;
        },
        onSuccess:(data:DataResponse)=>{
            const {favorite_products} = data; 
            if(!favorite_products|| !user)
                return null ; 
            set_user({...user!,favorite_products}) 
            queryClient.setQueryData(["products",productId],(prev:any)=>{
                if(!prev?.product?._count )
                    return prev ; 
                const prev_number_likes = prev.product._count.liked_by; 
                const updated = {
                    ...prev,
                    product:{
                        ...prev.product
                        ,_count:{liked_by:prev_number_likes+1}
                    }
                }
                return updated ; 
            })
        },
        onError:(err:any)=>{
            console.log(err)
        }

    }) 
    const {data:dataIsRemoving,isLoading:isLoadingRemoving,error:errorRemoving,mutateAsync:remove} : useFavoriteMutationType = useMutation({
        mutationKey:["delete","products","favorite","productId"], 
        mutationFn:async()=>{
            const response = await axios.delete(`${SERVER_URL}/products/favorite/${productId}`,config)
            const data = await response.data
            return data;
        },
        onSuccess:(data:DataResponse)=>{
            const {favorite_products} = data; 
            if(!favorite_products|| !user)
                return null ; 
            set_user({...user!,favorite_products})
            queryClient.setQueryData(["products",productId],(prev:any)=>{
                if(!prev?.product?._count )
                    return prev ; 
                const prev_number_likes = prev.product._count.liked_by; 
                const updated = {
                    ...prev,
                    product:{
                        ...prev.product
                        ,_count:{liked_by:prev_number_likes-1}
                    }
                }
                return updated ; 
            })
        },
        onError:(err:any)=>{
            console.log(err)
        }

    }) 

    return {
        adding : {
            data: {
                ...dataIsAdding,
                error:(((errorAdding as AxiosError<unknown, any>)?.response )?.data as DataResponse)?.error?? undefined , 
            },
            isLoading:isLoadingAdding,
            error:errorAdding, 
            add
        }, 
        removing : {
            data: {
                ...dataIsRemoving, 
                error:(((errorRemoving as AxiosError<unknown, any>)?.response )?.data as DataResponse)?.error?? undefined , 

            },
            isLoading:isLoadingRemoving,
            error:errorRemoving, 
            remove
        }, 
        
    }
}

export {
    useFavoriteProduct
}