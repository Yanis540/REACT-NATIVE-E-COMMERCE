import { BasketProduct, ColorVariant, Product, SizeVariant } from '@/types'
import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware'
interface BasketState {
  basket: BasketProduct[] 
  add: (product:Product,options?:undefined|{color?:ColorVariant, size?: SizeVariant}) => void
}

const useAuth =  create(
    persist<BasketState>(
        (set:any,get:any)=>({
            basket : [], 
            add : (product:Product,options?:undefined|{color?:ColorVariant, size?: SizeVariant} )=>set((prev:BasketState)=>{
                const {color,size} = options||{}

                const index = prev.basket.map((prod:Product)=>prod.id).indexOf(product.id); 
                const exists = index !==-1;
                const updated_basket:BasketProduct[] = 
                    !exists
                    ?   [{...product,ordered_quantity:1,size,color:color??product.colors[0]},...prev.basket]
                    :   prev.basket.map((prod:BasketProduct)=>
                            prod.id!==product.id 
                            ? prod
                            : {
                                ...prod,
                                ordered_quantity:prod.ordered_quantity+1
                            }
                        )
                return {basket:updated_basket}
            }),
            
    
        }), 
        {
            name:"store-basket", 
            storage: createJSONStorage(()=>AsyncStorage)
        }
    )
)



export {
    useAuth
}