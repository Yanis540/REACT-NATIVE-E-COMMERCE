import { BasketProps } from '@/routes/types';
import ProductControlCart from '../../../components/Product/components/ProductControlCart';
import { Product } from '@/types';
import React from 'react';
import { Text, View , Image, TouchableOpacity } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view';
type ProductBasketProps= {
    product:Product
    rowMap:any
    isLast:boolean
}&BasketProps;

const possiblesColors = [
    "bg-blue-400/30", 
    "bg-purple-400/30",
    "bg-zinc-400/30"
]

function ProductBasket({product, rowMap,isLast,navigation}:ProductBasketProps) {
    const defaultSrc = "https://d13o3tuo14g2wf.cloudfront.net/thumbnails%2Flarge%2F_default_upload_bucket%2FWH1000XM4B_0000_001_406fdd3cc9e49e28002ad8baef9185c8_1.png.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kMTNvM3R1bzE0ZzJ3Zi5jbG91ZGZyb250Lm5ldC90aHVtYm5haWxzJTJGbGFyZ2UlMkZfZGVmYXVsdF91cGxvYWRfYnVja2V0JTJGV0gxMDAwWE00Ql8wMDAwXzAwMV80MDZmZGQzY2M5ZTQ5ZTI4MDAyYWQ4YmFlZjkxODVjOF8xLnBuZy5wbmciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjIxNDU3NjIwMDB9fX1dfQ__&Signature=K9Dw9fhXmMEyfPonCK3vOAxZ9NDmx4mYB7ZgLwdN2RYLLwEy0Oe663JnZiuWBWo19S6~eyaYIKgTgAZ79bL63YJYJjgv5hAAvlBlGsBbT4K4PDrfygiy25haUof4UVAbHDM~dp3ZwgQOP-GraSoCY5EDfR5wy9ekhTeYXLmap1lSyb70P-eZyACBzsN5LaiGDhAGigbc3HCyBByLhbjMJz9w~~pC2PN1v4ndPQveQ2gcnqLSPBYnnZfDRbJtx1YjRR8q7tXD7sYXYDLQgZw2aJuXqT7FnvdF7lYmzWm6TAktwD0FOtvn2QHMXZimmAu5igDpFcBCfFR5btt-TV7zlA__&Key-Pair-Id=K37BLT9C6HMMJ0"
    const defaultSrc2 = "https://www.pakmobizone.pk/wp-content/uploads/2021/05/HUAWEI-FreeBuds-4i-Red-6.png"
    const defaultDescription = product?.description ??"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex iusto, neque voluptatum ad quae architecto vitae cumque ratione libero atque!"
    const description = `${defaultDescription.length<40?defaultDescription:defaultDescription.slice(0,40)+"...."}`

    const random = Math.floor(Math.random() * 10) %(possiblesColors.length)
    return (
    <TouchableOpacity onPress={()=>navigation.navigate("ProductDetailsScreen",{productId:product.id})}>
        <View className={`flex flex-row items-center px-4 py-4 gap-x-[8px] h-[120px] bg-white  border-t-[1px] ${isLast && "border-b-[1px]"} border-gray-200 z-50  `}>
            {/* Image */}
            <View className={` flex flex-col items-center justify-center  px-2  py-4  bg-violet-500/30 rounded-lg 
                ${
                    random==0?"bg-blue-400/30": random==1?"bg-violet-400/30": "bg-zinc-400/30"
                }
            `}>
                <Image className='h-[60px] w-[60px] object-contain rounded-xl' source={{uri:product.image}}/>
            </View>
            {/*  description  */}
            <View className="flex-1 flex flex-col items-start justify-around h-full   ">

                <Text className="text-[15px] capitalize font-semibold">{product.name}</Text>
                <Text className="text-[10px] text-gray-400   ">{description}</Text>
                <Text className="text-[17px] text-zinc-900 font-bold   ">{product.price} $</Text>
            </View>
            {/* add/ remove button */}
            <View className="h-full flex flex-col items-center justify-end ">
                <ProductControlCart product={product} /> 
            </View>
        </View>
    </TouchableOpacity>
    );
};

export default ProductBasket;