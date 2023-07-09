import { HomeNavigationHeaderProps, ShopNavigationHeaderProps } from '@/routes/types';
import { useStoreBasket } from '../../context/store/use-store-basket';
import { Product as ProductType } from '@/types';
import FavoriteButton from '../Button/FavoriteButton';
import React from 'react';
import { Text, View , Image,  TouchableOpacity} from 'react-native'
import ProductControlCart from './components/ProductControlCart';
type ProductProps =   {
    product:ProductType 
    small? : boolean
    className : string 

    hide_favorite ? : boolean 
    hide_description ? : boolean 
}& HomeNavigationHeaderProps& ShopNavigationHeaderProps
const possiblesColors = [
    "bg-blue-400/30", 
    "bg-purple-400/30",
    "bg-zinc-400/30"
]


function Product({navigation,product,small=false, className, hide_description = false,  hide_favorite= false}:ProductProps) {
    const defaultSrc = "https://d13o3tuo14g2wf.cloudfront.net/thumbnails%2Flarge%2F_default_upload_bucket%2FWH1000XM4B_0000_001_406fdd3cc9e49e28002ad8baef9185c8_1.png.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kMTNvM3R1bzE0ZzJ3Zi5jbG91ZGZyb250Lm5ldC90aHVtYm5haWxzJTJGbGFyZ2UlMkZfZGVmYXVsdF91cGxvYWRfYnVja2V0JTJGV0gxMDAwWE00Ql8wMDAwXzAwMV80MDZmZGQzY2M5ZTQ5ZTI4MDAyYWQ4YmFlZjkxODVjOF8xLnBuZy5wbmciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjIxNDU3NjIwMDB9fX1dfQ__&Signature=K9Dw9fhXmMEyfPonCK3vOAxZ9NDmx4mYB7ZgLwdN2RYLLwEy0Oe663JnZiuWBWo19S6~eyaYIKgTgAZ79bL63YJYJjgv5hAAvlBlGsBbT4K4PDrfygiy25haUof4UVAbHDM~dp3ZwgQOP-GraSoCY5EDfR5wy9ekhTeYXLmap1lSyb70P-eZyACBzsN5LaiGDhAGigbc3HCyBByLhbjMJz9w~~pC2PN1v4ndPQveQ2gcnqLSPBYnnZfDRbJtx1YjRR8q7tXD7sYXYDLQgZw2aJuXqT7FnvdF7lYmzWm6TAktwD0FOtvn2QHMXZimmAu5igDpFcBCfFR5btt-TV7zlA__&Key-Pair-Id=K37BLT9C6HMMJ0"
    const defaultSrc2 = "https://www.pakmobizone.pk/wp-content/uploads/2021/05/HUAWEI-FreeBuds-4i-Red-6.png"
    const defaultDescription = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex iusto, neque voluptatum ad quae architecto vitae cumque ratione libero atque!"
    const random = Math.floor(Math.random() * 10) %(possiblesColors.length)
    const description = `${defaultDescription.length<40?defaultDescription:defaultDescription.slice(0,40)+"...."}`
    const productName = `${product.name.length<13? product.name: product.name.slice(0,13)+"..."}`
    return (
    <TouchableOpacity onPress={()=>navigation.navigate("ProductDetailsScreen",{productId: product.id})} >
        <View className={`flex flex-col py-4 px-2 w-[90%] ${small ? "min-w-[150px] max-w-[200px]": "min-w-[230px] max-w-[250px]"} drop-shadow-lg border-[1px] border-gray-200 rounded-lg ${className}`}>
            {/* Image */}
            <View className={` flex flex-col items-center  justify-center w-full py-4  bg-violet-500/30 rounded-lg 
                ${
                    random==0?"bg-blue-400/30": random==1?"bg-violet-400/30": "bg-zinc-400/30"
                }
            `}>
                <Image className="w-[80%] h-32 rounded-lg object-cover " source={{uri:product?.image??defaultSrc2}} /> 
            </View>
            {/* informations : name */}
            <View className=" flex flex-col items-start py-4 ">
                {/* Bg */}
                <View className="flex flex-row items-center ">
                    <Text  className={`flex-1  font-bold capitalize ${small ?"text-[15px]" : "text-lg"}`}>{productName} </Text>
                    {
                        !hide_favorite&&(
                            <FavoriteButton product={product} /> 
                        )
                    }
                </View>
                {/* description */}
                {
                    !hide_description&& (
                        <View >
                            <Text className="text-gray-400 text-[13px]">{description}</Text>
                        </View>
                    )
                }
            </View>

            <View className="flex flex-row items-center justify-between">
                {/* Price  */}
                <Text className={`${small ?"text-[15px]" :"text-[18px]"} font-normal text-emerald-500 `}>{product.price}$</Text>
                <ProductControlCart product={product}   /> 
            </View>
        </View>
    </TouchableOpacity>
    );
};

export default Product;