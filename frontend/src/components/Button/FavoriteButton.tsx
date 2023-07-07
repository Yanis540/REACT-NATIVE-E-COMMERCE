import {useState} from 'react';
import { Text, View , TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../../styles';
import { Product } from '@/types';
interface FavoriteButtonProps {
    product : Product
};

function FavoriteButton({product}:FavoriteButtonProps) {
    const [isFavorite,setIsFavorite] =  useState<boolean>(false) ; 

    return (
        <TouchableOpacity onPress={()=>setIsFavorite(prev=>!prev)} >
            <View className='flex flex-row items-center justify-center '>
                <AntDesign name={isFavorite?"heart": "hearto"} size={20} color={isFavorite ?colors.heartColor:colors.grayishBlack} />
                <Text className={`ml-[4px] text-md ${isFavorite ? "text-red-400":"text-gray-400" } `}>{product?._count?.liked_by}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default FavoriteButton;