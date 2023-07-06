import { ShopProps } from '../../routes/types';
import KeyboardLayout from '../../Layout/KeyBoardLayout';
import React from 'react';
import { Text, View  , Button} from 'react-native'



function Shop({navigation,route}:ShopProps) {
    return (
    <KeyboardLayout>
    
        <View className="flex-1 border-[1px] bg-white border-red-500">
           <Text>Shop</Text>
           <Button
                title="Product Details" 
                onPress={()=>navigation.navigate("ProductDetailsScreen",{productId:"12"})}
           />
        </View>
    </KeyboardLayout>
    );
};

export default Shop;