import { useBasket } from '../../../context/store';
import React from 'react';
import { View ,  Text, TouchableOpacity } from 'react-native'
import ProductBasket from './ProductBasket';
import { SwipeListView  } from 'react-native-swipe-list-view';
import { Feather } from '@expo/vector-icons'; 
import { colors } from '../../../styles';
import { BasketProps } from '@/routes/types';


function BasketProducts({navigation,route}:BasketProps) {
    const {basket,remove_all} = useBasket();
    return (
    <View className="flex-1 flex flex-col  ">
        <SwipeListView
            data={basket}
            className='flex-1 '
            renderItem={ (data, rowMap) => (
                <ProductBasket 
                    product={data.item} rowMap={rowMap} 
                    isLast={data.index == basket.length-1} 
                    navigation={navigation} route={route}
                /> 
            )}
            renderHiddenItem={ (data, rowMap) => (
                <View className="h-[120px] flex flex-col items-start justify-center px-4 py-4 ">
                    <TouchableOpacity onPress={()=>remove_all(data.item.id)} >
                        <Feather name="trash" size={24} color={colors.heartColor} />
                    </TouchableOpacity>
                </View>
            )}
            leftOpenValue={0}
            rightOpenValue={60}
        />            
    </View>
    );
};

export default BasketProducts;