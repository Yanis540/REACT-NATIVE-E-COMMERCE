import {useMemo} from 'react';
import { Text, View , TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import { Product } from '@/types';
import { useBasket } from '../../../context/store';

interface ProductControlCartProps {
    product : Product
    big? :boolean
};

function ProductControlCart({product, big = false }:ProductControlCartProps) {
    const {add,basket, remove,remove_all} = useBasket();
    const handleLongRemovePress= ()=>{
        remove(product)
    }
    const handleLongAddPress= ()=>{
        add(product)

    }
    const existsInBasket = useMemo(()=>{
        return basket.find((prodBask)=>prodBask.id == product.id)
    },[basket])
    return (
    <View className={`flex flex-row items-center ${big?"gap-x-[25px]":"gap-x-[10px]"} justify-around`} >
        {
            existsInBasket&& (
                <TouchableOpacity 
                    onPress={()=>remove(product)} 
                    onLongPress={handleLongRemovePress}
                >
                    <View className="flex flex-col items-center justify-center  border-[1px] border-emerald-400  rounded-lg p-2 ">
                        <AntDesign name="minus" size={big ?15:10} color="rgb(52, 211,153)" className='font-extrabold'  />
                    </View>
                </TouchableOpacity>
            )
        }
        {
            existsInBasket && (
                <View>
                    <Text className="font-bold" >{existsInBasket.ordered_quantity}</Text>
                </View>
            )
        }
        <TouchableOpacity 
            onPress={()=>add(product)} 
            onLongPress={handleLongAddPress}
        >
            <View className={`flex flex-col items-center justify-center  bg-emerald-400  rounded-lg p-2 ${(product.quantity == 0 || existsInBasket?.ordered_quantity == product.quantity )&& "cursor-not-allowed"} `}>
                
                <AntDesign name="plus" size={big ?15:10} color="white" className='font-extrabold'  />
            </View>
        </TouchableOpacity>
    </View>
    
    );
};

export default ProductControlCart;