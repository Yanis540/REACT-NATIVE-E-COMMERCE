import {useMemo, useState} from 'react';
import { Text, View , TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../../styles';
import { Product } from '@/types';
import { useAuth } from '../../context/store';
import { useFavoriteProduct } from '../../hooks/use-favorite-product';
interface FavoriteButtonProps {
    product : Product
};

function FavoriteButton({product}:FavoriteButtonProps) {
    const {user} = useAuth();
    const {adding:{add,data},removing:{remove}} = useFavoriteProduct(product?.id??"");
    const isFavorite = useMemo(()=>{
        if(!user?.favorite_products)
            return false ; 
        return user.favorite_products.some((favorite_product)=>product.id == favorite_product.id)
    },[user?.favorite_products])
    const toggleFavorite = async()=>{
        if(isFavorite)
            remove()
        else 
            add()
    }
    if(!user) 
        return null ; 
    return (
        <TouchableOpacity onPress={toggleFavorite} >
            <View className='flex flex-row items-center justify-center '>
                <AntDesign name={isFavorite?"heart": "hearto"} size={20} color={isFavorite ?colors.heartColor:colors.grayishBlack} />
                <Text className={`ml-[4px] text-md ${isFavorite ? "text-red-400":"text-gray-400" } `}>{product?._count?.liked_by}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default FavoriteButton;