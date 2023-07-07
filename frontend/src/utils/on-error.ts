import { QueryClient  , useQueryClient} from "@tanstack/react-query"

const queryClient = useQueryClient()

export const onError = (err:any,key:any[],queryClient:QueryClient)=>{
    if(err.response?.data?.error?.message ){
        queryClient.setQueryData(key,{error:err.response.data.error,product:undefined})
        return 
    }
}