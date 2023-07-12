import { AuthCredentials, BasketProduct, ColorVariant, Product, SizeVariant, User } from '@/types'
import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware'
interface AuthState {
  user?: User&AuthCredentials |null 
  set_user: (user:undefined | User&AuthCredentials|null) => void
}

const useAuth =  create(
    persist<AuthState>(
        (set:any,get:any)=>({
            user : null, 
            set_user : (user?:null| User&AuthCredentials)=>set((prev:AuthState)=>{
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