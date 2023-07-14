




import { UseMutateAsyncFunction, useMutation } from "@tanstack/react-query"
import {BasketProduct} from '@/types'
import { SERVER_URL } from "../../../env"
import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { useAuth, useBasket } from "../../../context/store"
import { useToast } from "react-native-toast-notifications"
import { useBasketNavigation } from "../../../routes"


interface DataResponse {
    error?: {message: string}, 
    message: string 
}

interface useStripePaymentMutation  {
    data ?: DataResponse
    isLoading : boolean 
    error : unknown 
    mutateAsync : UseMutateAsyncFunction<any, unknown,{paymentIntent_id:string}, unknown>
}


const useConfirmOrder=()=>{
    const toast = useToast(); 
    const {basket,clear_basket} = useBasket(); 
    const {navigation} = useBasketNavigation(); 
    const {user} = useAuth(); 
    const {data,mutateAsync, error,isLoading}:useStripePaymentMutation = useMutation({
        mutationKey:["orders","confirm"], 
        mutationFn:async({paymentIntent_id}:{paymentIntent_id:string})=>{
            const config:AxiosRequestConfig<{}> = {
                headers:{
                    authorization:`Bearer ${user?.tokens?.access?.token??""}`
                }
            }
            const response = await axios.put(`${SERVER_URL}/orders/confirm`,{paymentIntent_id},config); 
            const data = await response.data ; 
            return data ; 
        }, 
        onSuccess:(data)=>{
            // remove the basket and redirect to the account page 
            toast.show("Order Confirmed ! ",{type:"success",placement:"top",normalColor:"rgb(52, 211,153)"}); 
            clear_basket(); 
            navigation.navigate("Content",{screen:"Account"})

        }
    }); 
    
    return {
        data:{
            error: (((error as AxiosError<unknown, any>)?.response )?.data as DataResponse)?.error?? undefined , 
            message: data?.message?? undefined
        }, 
        error,isLoading, 
        confirm : mutateAsync
    }
}


export {
    useConfirmOrder
}
