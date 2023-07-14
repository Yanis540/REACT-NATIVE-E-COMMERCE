import {useEffect, useState} from "react"
import { UseMutateAsyncFunction, useMutation } from "@tanstack/react-query"
import {BasketProduct} from '@/types'
import { SERVER_URL } from "../../../env"
import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { useAuth } from "../../../context/store"
import { useStripe } from "@stripe/stripe-react-native"
import { useToast } from "react-native-toast-notifications"
import { useInitPaymentIntent } from "./use-init-payment-intent"
import { useConfirmOrder } from "./use-confirm-order"




 
const useStripePayment= ({basket}:{basket:BasketProduct[]})=>{
    const toast = useToast()
    const [isPaying,setIsPaying] = useState<boolean>(false); 
    const { presentPaymentSheet } = useStripe();
    const {initializePaymentSheet} = useInitPaymentIntent({basket});
    const {confirm} = useConfirmOrder(); 
    
    const openPaymentSheet = async () => {
        try{
            setIsPaying(true)
            const {paymentIntent_id}=await initializePaymentSheet()||{};
            if(!paymentIntent_id)
                throw new Error("An error occured"); 
            const { error } = await presentPaymentSheet();
            if (error) 
                throw new Error(error.message)
            toast.show(`Order payed ! `,{type:"success"} );
            await confirm({paymentIntent_id})
        }
        catch(err:any|AxiosError){
            if(!(err instanceof AxiosError)|| (!err.response?.data?.error)){
                toast.show(`Error occured : ${err.message}`,{type:"danger"} );
            }
            else {
                toast.show(`${err.response.data.error.message}`,{type:"danger"})
            }
        }
        finally{
            setIsPaying(false); 
        }
    };

    return {
        pay: openPaymentSheet , 
        isPaying
    }
    
    
}


export {
    useStripePayment
}

