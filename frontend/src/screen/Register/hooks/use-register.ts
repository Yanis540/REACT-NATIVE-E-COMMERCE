import { SERVER_URL } from "../../../env"
import { useMutation , UseMutateAsyncFunction } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { RegisterSchema } from "../types"
import { useToast } from "react-native-toast-notifications";
import { useAuthNavigation } from "../../../routes";
import axios from "axios"

interface DataResponse {
    error?: {message: string}, 
    message? : string, 
}

interface useLoginMutation  {
    data ?: DataResponse
    isLoading : boolean 
    error : unknown 
    mutateAsync : UseMutateAsyncFunction<any, unknown,RegisterSchema, unknown>
}




const useRegister = ()=>{
    const toast = useToast();
    const {navigation} = useAuthNavigation();
    const {data,isLoading,error,mutateAsync:register}:useLoginMutation = useMutation({
        mutationKey:["register"],
        mutationFn:async(registerData:RegisterSchema)=>{
            const response= await axios.post(SERVER_URL+"/auth/register",{...registerData}); 
            const data = await response.data ; 
            return data; 
        }, 
        onSuccess:(data:DataResponse)=>{
            const {message} = data ; 
            if(!message ) 
                return ;
            toast.show(message,{type:"success",animationType:"slide-in",duration:4000,placement:"top"}) 
            navigation.navigate("LoginScreen")
        }, 
        onError:(err)=>{
            console.log(err)
        }
        
    }); 

    return {
        data: {
            error: (((error as AxiosError<unknown, any>)?.response )?.data as DataResponse)?.error?? undefined , 
        } , isLoading , 
        error , register
    }
}


export {
    useRegister 
}


