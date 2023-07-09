import { HomeProps } from '@/routes/types';
import { Category , } from '@/types';
import React from 'react';
import { Text, View , Image, TouchableOpacity} from 'react-native'

interface CategoryCardProps extends HomeProps {
    category : Category, 
    
};

function CategoryCard({navigation,category}:CategoryCardProps) {
    const defaultSrc = "https://img01.ztat.net/article/spp-media-p1/e37890d095c54a87bb9816f2f2f1379e/eb1b66e889354e90b42a0f47f9ce13c5.jpg?imwidth=1800&filter=packshot"
    return (
        <TouchableOpacity onPress={()=>navigation.navigate("Shop")}>
            <View className='flex flex-row items-center justify-start border-[1px] border-gray-200 rounded  py-1   mr-2   pr-4'>
                <View className=" mr-4 rounded">
                    <Image className="w-8 h-8 rounded-lg  object-contain  " source={{uri:category?.image??defaultSrc}} /> 
                </View>
                <Text className="font-bold capitalize text-slate-800 ">{category.name}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default CategoryCard;