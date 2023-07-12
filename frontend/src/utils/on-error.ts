import { QueryClient  } from "@tanstack/react-query"


export const onError = (err:any,key:any[],queryClient:QueryClient)=>{
    if(err.response?.data?.error?.message){
        queryClient.setQueryData(key,{error:err.response.data.error})
        return 
    }
}