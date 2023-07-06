import React from 'react';
import { Text, View } from 'react-native'
import { ProductDetailsProps } from '@/routes/types';



function ProductDetails({navigation,route}:ProductDetailsProps) {
    return (
        <View>
           <Text>ProductDetails</Text>
        </View>
    );
};

export default ProductDetails;