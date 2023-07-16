import { User , ProviderUser } from '@/types'
import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware'

type GlobalUserType = User |null
interface AuthState {
  user?:  GlobalUserType
  set_user: (user:undefined | User|null) => void
}

const useAuth =  create(
    persist<AuthState>(
        (set:any,get:any)=>({
            user : null, 
            set_user : (user?:GlobalUserType)=>set((prev:AuthState)=>{
                return {...prev,user:user}
            }),
        }), 
        {
            name:"store-auth", 
            storage: createJSONStorage(()=>AsyncStorage)
        }
    )
)



export {
    useAuth
}