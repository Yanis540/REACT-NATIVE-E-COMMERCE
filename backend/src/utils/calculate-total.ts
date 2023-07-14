import { ProductBasket } from "../types";

export const calculateTotal = (basket:ProductBasket[])=>{
    let sum = 0 ; 
    basket.map((product)=>{sum+=(product.price*product.ordered_quantity)});
    return sum ; 
}