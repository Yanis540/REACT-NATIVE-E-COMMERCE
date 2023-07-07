import {useMemo} from 'react';
import { Text, View , TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import { Product } from '@/types';
import { useStoreBasket } from '../../../context/store/use-store-basket';

interface ProductControlCartProps {
    product : Product
};

function ProductControlCart({product}:ProductControlCartProps) {
    const {add,basket, remove,remove_all} = useStoreBasket();
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
    <View className="flex flex-row items-center gap-x-[10px] justify-around" >
        {
            existsInBasket&& (
                <TouchableOpacity 
                    onPress={()=>remove(product)} 
                    onLongPress={handleLongRemovePress}
                >
                    <View className="flex flex-col items-center justify-center  border-[1px] border-emerald-400  rounded-lg p-2 ">
                        <AntDesign name="minus" size={15} color="rgb(52, 211,153)" className='font-extrabold'  />
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
            <View className="flex flex-col items-center justify-center  bg-emerald-400  rounded-lg p-2 ">
                
                <AntDesign name="plus" size={15} color="white" className='font-extrabold'  />
            </View>
        </TouchableOpacity>
    </View>
    
    );
};

export default ProductControlCart;