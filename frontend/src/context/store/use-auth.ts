import { AuthProvider, User } from '@/types'
import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware'

type GlobalUserType = User |null
interface AuthState {
  user?:  GlobalUserType
  provider?: AuthProvider
  set_user: (user:undefined | User|null, provider?:AuthProvider) => void
}

const useAuth =  create(
    persist<AuthState>(
        (set:any,get:any)=>({
            user : null, 
            set_user : (user?:GlobalUserType, provider?:AuthProvider)=>set((prev:AuthState)=>{
                return {...prev,user:user,provider}
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