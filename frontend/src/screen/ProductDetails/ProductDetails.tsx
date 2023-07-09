import {useState} from 'react';
import { Text, View , ScrollView , Image } from 'react-native'
import { ProductDetailsProps } from '@/routes/types';
import { useProduct } from './hooks/use-product';
import FavoriteButton from '../../components/Button/FavoriteButton';
import { ColorVariant } from '@/types';
import { RadioButton } from 'react-native-paper';
import ProductControlCart from '../../components/Product/components/ProductControlCart';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ErrorComponent , Loader } from '../../components';

const possiblesColors = [
    "bg-blue-400/30", 
    "bg-purple-400/30",
    "bg-zinc-400/30"
]

function ProductDetails({navigation,route}:ProductDetailsProps) {
    const {productId} = route.params;
    const {data , isLoading,error} = useProduct(productId);
    const {product} =data; 
    const random = Math.floor(Math.random() * 10) %(possiblesColors.length)
    const defaultSrc = "https://d13o3tuo14g2wf.cloudfront.net/thumbnails%2Flarge%2F_default_upload_bucket%2FWH1000XM4B_0000_001_406fdd3cc9e49e28002ad8baef9185c8_1.png.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kMTNvM3R1bzE0ZzJ3Zi5jbG91ZGZyb250Lm5ldC90aHVtYm5haWxzJTJGbGFyZ2UlMkZfZGVmYXVsdF91cGxvYWRfYnVja2V0JTJGV0gxMDAwWE00Ql8wMDAwXzAwMV80MDZmZGQzY2M5ZTQ5ZTI4MDAyYWQ4YmFlZjkxODVjOF8xLnBuZy5wbmciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjIxNDU3NjIwMDB9fX1dfQ__&Signature=K9Dw9fhXmMEyfPonCK3vOAxZ9NDmx4mYB7ZgLwdN2RYLLwEy0Oe663JnZiuWBWo19S6~eyaYIKgTgAZ79bL63YJYJjgv5hAAvlBlGsBbT4K4PDrfygiy25haUof4UVAbHDM~dp3ZwgQOP-GraSoCY5EDfR5wy9ekhTeYXLmap1lSyb70P-eZyACBzsN5LaiGDhAGigbc3HCyBByLhbjMJz9w~~pC2PN1v4ndPQveQ2gcnqLSPBYnnZfDRbJtx1YjRR8q7tXD7sYXYDLQgZw2aJuXqT7FnvdF7lYmzWm6TAktwD0FOtvn2QHMXZimmAu5igDpFcBCfFR5btt-TV7zlA__&Key-Pair-Id=K37BLT9C6HMMJ0"
    const defaultSrc2 = "https://www.pakmobizone.pk/wp-content/uploads/2021/05/HUAWEI-FreeBuds-4i-Red-6.png"
    const description = product?.description??"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex iusto, neque voluptatum ad quae architecto vitae cumque ratione libero atque!"
    const [selectedColor, setSelectedColor] = useState<ColorVariant|undefined>(product?.colors[0]??undefined);
    if(error||data?.error)return(
        <ErrorComponent data={data} /> 
    )
    if(isLoading)return (<Loader /> )  
    return (
        <View className="flex-1 flex w-full bg-white">
            {/* Image */}
            <View className={` flex flex-col items-center h-[40%]  justify-center w-full py-4  bg-violet-500/30 rounded-lg 
                ${
                    random==0?"bg-blue-400/30": random==1?"bg-violet-400/30": "bg-zinc-400/30"
                }
            `}>
                <Image className="w-[80%] h-full  rounded-lg object-cover " source={{uri:product?.image??defaultSrc2}} /> 
            </View>
            {/* Body */}
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
            <View className="flex flex-row px-4 py-8 items-center justify-between border-t-[1px]  border-t-gray-300 ">
                <TouchableOpacity onPress={()=>navigation.navigate("BasketScreen")}>
                    <View className="flex flex-col items-center justify-center py-3 px-10 bg-emerald-400 rounded-lg text-white font-bold text-3xl">
                        <Text className="font-bold  text-white text-lg ">Continue</Text>
                    </View>
                </TouchableOpacity>
                <ProductControlCart product={product!} /> 
            </View>
           
        </View>
    );
};

export default ProductDetails;