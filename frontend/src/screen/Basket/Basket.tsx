import { useStoreBasket } from '../../context/store/use-store-basket';
import { BasketProps } from '@/routes/types';
import React from 'react';
import { Text, View } from 'react-native'



function Basket({navigation,route}:BasketProps) {
    const {basket} = useStoreBasket();
    return (
        <View>
           <Text>You have  {basket.length} products in your basket !  </Text>
        </View>
    );
};

export default Basket;