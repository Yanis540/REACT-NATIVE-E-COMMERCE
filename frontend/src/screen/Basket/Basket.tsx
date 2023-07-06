import { BasketProps } from '@/routes/types';
import React from 'react';
import { Text, View } from 'react-native'



function Basket({navigation,route}:BasketProps) {
    return (
        <View>
           <Text>Basket</Text>
        </View>
    );
};

export default Basket;