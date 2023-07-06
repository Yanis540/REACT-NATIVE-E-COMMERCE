import { HomeProps } from '@/routes/types';
import React from 'react';
import { Text, View , Button} from 'react-native'



function Home({navigation}:HomeProps) {
    return (
        <View className='flex-1 flex border-[1px] border-red-600 text-teal-400 bg-white'>
           <Text>Home</Text>
           <Button
                title="Product Details" 
                onPress={()=>navigation.navigate("ProductDetailsScreen",{productId:"12"})}
           />
        </View>
    );
};

export default Home;