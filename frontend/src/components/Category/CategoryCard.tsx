import { HomeProps } from '@/routes/types';
import { Category , } from '@/types';
import React, { useMemo } from 'react';
import { Text, View , Image, TouchableOpacity} from 'react-native'

interface CategoryCardProps extends HomeProps {
    category : Category, 
    onPress ?: () => void  
    
};

function CategoryCard({navigation,category,onPress }:CategoryCardProps) {
    const number_products = useMemo(()=>{
        return category?.products?.length ?? 0 
    },[])
    const handlePress= ()=>{
        if(onPress)
            onPress()
        else 
            navigation.navigate("Shop")
    }
    const defaultSrc = "https://img01.ztat.net/article/spp-media-p1/e37890d095c54a87bb9816f2f2f1379e/eb1b66e889354e90b42a0f47f9ce13c5.jpg?imwidth=1800&filter=packshot"
    return (
        <TouchableOpacity onPress={handlePress}>
            <View className='flex flex-row items-center justify-start border-[1px] border-gray-200 rounded  py-1   mr-2   pr-4'>
                <View className=" mr-4 rounded">
                    <Image 
                        className="w-8 h-8 rounded-lg  object-cover  " 
                        source={{
                            uri:number_products!=0
                            ?   category.products[Math.floor(Math.random()*10)%number_products].image
                            :  defaultSrc
                        }} 
                        style={{resizeMode: 'contain',}} 
                    /> 
                </View>
                <Text className="font-bold capitalize text-slate-800 ">{category.name}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default CategoryCard;