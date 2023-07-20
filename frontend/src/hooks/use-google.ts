import { AuthCredentials, User } from '@/types';
import { useAuth } from '../context/store';
import { SERVER_URL } from '../env';
import { GoogleSignin,User as GoogleUser,statusCodes, } from '@react-native-google-signin/google-signin';

import {
    useMutation,
    UseMutateFunction, UseMutateAsyncFunction, 
  } from '@tanstack/react-query'
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useToast } from "react-native-toast-notifications"
  
interface useGoogleSignInType  {
    data ?:GoogleUser|null
    error : unknown
    isLoading : boolean 
    mutate : UseMutateFunction<any, unknown,any, unknown>
    mutateAsync : UseMutateAsyncFunction<any, unknown, any, unknown>
}   

interface ServerDataResponse {
    error?: {message: string}, 
    user? : User, 
    tokens ? :AuthCredentials
}

interface useServerLoginMutation  {
    data ?: ServerDataResponse
    isLoading : boolean 
    error : unknown 
    mutate : UseMutateFunction<any, unknown,{userInfo:GoogleUser}, unknown>
}

const useGoogle = ()=>{
    const toast = useToast(); 
    const {set_user} = useAuth(); 
    // SERVER STUFF 
    const {data:serverData,isLoading:isLoadingServer,mutate:login_server}:useServerLoginMutation = useMutation({
        mutationKey:["auth","login","provider","google"], 
        mutationFn:async({userInfo}:{userInfo:GoogleUser})=>{
            const config :AxiosRequestConfig<{}>= {headers:{authorization:`Bearer ${userInfo.idToken}`}}
            const response = await axios.post(`${SERVER_URL}/auth/login/provider/google`,{userInfo},config); 
            const data = await response.data; 
            return data; 
        }, 
        onSuccess:(data:ServerDataResponse)=>{
            const {user,tokens} = data ; 
            if(!user || !tokens) 
                return ; 
            set_user({...user,tokens},"google")
        },
        onError:(err:any)=>{
            if(err instanceof AxiosError){
                return toast.show(
                    err?.response?.data?.error?.message?
                    err?.response?.data?.error?.message
                    :err.status == 401 ? "Unauthorized" : "Internal Server Error please try again",
                    {type:"danger"})
            }
            toast.show("Unexpected error",{type:"danger"})
        }, 
    });
    // GOOGLE STUFF 
    const {data:googleGoogle,isLoading:isLoadingGoogle,mutate:google}:useGoogleSignInType= useMutation({
        mutationKey:["google",], 
        mutationFn:async({service}:{service:"login"|"logout"|"current"})=>{
           switch(service){
                case "login": 
                    return await signIn()
                ;
                case "logout":
                    return await signOut()
                ;
                case "current":
                    return await getCurrentUser()
                ;
           }
        }, 
        onSuccess:(data:any,{service})=>{
            console.log(data); 
            // if(service=="logout")
            //     return set_user(null); 
            // if(service =="login" )
            //     return login_server({userInfo:data as GoogleUser}); 
            // return //user 
            
        },
        onError:(error:any)=>{
            toast.show(
                error.code === statusCodes.SIGN_IN_CANCELLED
                ?   "Cancelled login flow"
                :   error.code === statusCodes.IN_PROGRESS
                    ?   "Login in progress"
                    :   error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
                        ?   "Play services not available or outdated"
                        :   "Unknown error occured"
                ,
                {type:"danger"}
            )
        }
       
    })
    return { isLoading:isLoadingGoogle|| isLoadingServer,google,}
}
const signIn = async()=>{
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
}
const signOut = async()=>{
    await GoogleSignin.signOut();
}
const getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    return currentUser; 
};
export {useGoogle}