import { UseMutateAsyncFunction, useMutation } from "@tanstack/react-query"
import {BasketProduct} from '@/types'
import { SERVER_URL } from "../../../env"
import axios, { Axios, AxiosError, AxiosRequestConfig } from "axios"
import { useAuth } from "../../../context/store"
import { useStripe } from "@stripe/stripe-react-native"
import { useToast } from "react-native-toast-notifications"


interface DataResponse {
    error?: {message: string}, 
    paymentIntent_id :string 
    client_secret : string 
    ephemeralKey_secret : string 
    customer_id : any 


}

interface useStripePaymentMutation  {
    data ?: DataResponse
    isLoading : boolean 
    error : unknown 
    mutateAsync : UseMutateAsyncFunction<DataResponse, unknown,void, unknown>
}


const useInitPaymentIntent=({basket}:{basket:BasketProduct[]})=>{
    const { initPaymentSheet} = useStripe();
    const toast= useToast()
    const {user} = useAuth(); 
    const {mutateAsync:initServerPaymentIntent}:useStripePaymentMutation = useMutation({
        mutationKey:["payment","stripe","payment-intent"], 
        mutationFn:async()=>{
            const config:AxiosRequestConfig<{}> = {
                headers:{
                    authorization:`Bearer ${user?.tokens?.access?.token??""}`
                }
            }
            const response = await axios.post(`${SERVER_URL}/payment/stripe/payment-intent`,{basket},config); 
            const data = await response.data ; 
            return data ; 
        },
    }); 
    const initializePaymentSheet = async () => {

        const response = await initServerPaymentIntent(); 
        if(!response || response.error){
            throw new Error(response?.error?.message??"Unexpected error")
        }
        const {
            paymentIntent_id, client_secret,
            ephemeralKey_secret,customer_id,
        } = response ; 
        const { error } = await initPaymentSheet({
            merchantDisplayName: "Yanis Shop Inc.",
            customerId:customer_id,
            customerEphemeralKeySecret: ephemeralKey_secret,
            paymentIntentClientSecret:client_secret,
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: user!?.name??"Yanis",
            }
        });
        if(error){
            throw new Error(error.message); 
        }
        return response;
    }
    return {
        initializePaymentSheet
    }
}


export {
    useInitPaymentIntent
}
