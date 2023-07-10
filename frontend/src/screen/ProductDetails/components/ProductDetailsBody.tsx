import FavoriteButton from '../../../components/Button/FavoriteButton';
import { ColorVariant, Product } from '@/types';
import React from 'react';
import { Text, View , ScrollView} from 'react-native'
import { RadioButton } from 'react-native-paper';

interface ProductDetailsBodyProps {
    product : Product
    setSelectedColor : React.Dispatch<React.SetStateAction<ColorVariant | undefined>> 
    selectedColor ?: ColorVariant
};

function ProductDetailsBody({product,selectedColor,setSelectedColor}:ProductDetailsBodyProps) {
    const description = product?.description??"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex iusto, neque voluptatum ad quae architecto vitae cumque ratione libero atque!"

    return (
        <ScrollView className="flex-1 py-4 px-4">
            {/* Header  */}
            <View className="flex flex-row pb-4 items-center justify-between w-full ">
                <Text className="text-white bg-emerald-500 px-3 py-1 text-[12px] tracking-wide rounded-lg font-bold">Free Shipping</Text>
                <FavoriteButton product={product!} /> 
            </View>  
            {/* Title &&  description   */}
            <View className="flex flex-col pb-4 items-center justify-between w-full ">
                <Text className="w-full py-2 text-zinc-800 text-2xl capitalize font-bold ">{product?.name}</Text>
                <Text className="w-full text-zinc-500 text-[13px] tracking-wider  ">{description}</Text>
            </View>                
            {/* Pricing  colors */}
            <View className="flex flex-row pb-4 items-center justify-between w-full ">
                <Text className="font-bold text-zinc-800 text-2xl">{product?.price}$</Text>
                <View className="flex flex-row items-center gap-y-[2px] ">
                    {
                        product?.colors.map((color)=>(
                            <RadioButton 
                                key={color} 
                                color={color!="white"?color:"#c8c8c8"}
                                onPress={()=>setSelectedColor(color)}
                                value={color}
                                status={(color === selectedColor) ? "checked":"unchecked"}
                            /> 
                        ))
                    }
                </View>
            </View>                
            {/* Likes */}
            <View className="flex flex-row pb-4 items-center justify-between w-full ">
                {
                    product && (
                        product.quantity!= 0? (
                            <Text className='font-bold text-gray-500' > Quantity : <Text className='text-zinc-800'>{product?.quantity}</Text></Text>
                        ):(
                            <View className="bg-red-300 py-2 px-2 rounded "><Text className="text-red-600" >Over</Text></View>
                        )
                    )
                }
        
            </View>                
        </ScrollView>
    );
};

export default ProductDetailsBody;