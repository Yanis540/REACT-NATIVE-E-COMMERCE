import React from 'react';
import { Text, View  ,TextInput,TouchableOpacity} from 'react-native'
import { ShopNavigationHeaderProps  } from '../../../types';
import {Dimensions} from 'react-native';
import { Ionicons , AntDesign , EvilIcons } from '@expo/vector-icons'; 
import KeyboardLayout from '../../../../Layout/KeyBoardLayout';

interface ShopHeaderProps  extends ShopNavigationHeaderProps{

};

function ShopHeader({navigation,route}:ShopHeaderProps) {
    const ScreenWidth = Dimensions.get('window').width;
    return (
    <KeyboardLayout>
        <View style={{width:ScreenWidth-20}} className="mt-[40px] flex-1 flex  flex-row items-center gap-[5px] w-screen h-full  ">
            {
                route.name == "ShopScreen" ?(
                    <Text className='font-bold text-teal-400 text-2xl'>Shop</Text>
                ):(
                    <TouchableOpacity onPress={()=>navigation.goBack()} className="flex-1">
                        <AntDesign name="arrowleft" size={24} color="black"  />
                    </TouchableOpacity>
                )
            }
            {
                route.name=="ShopScreen" && (
                    <View className="flex-1 flex flex-row items-center py-1 px-2 bg-gray-100  rounded   ">
                        <TextInput placeholder="Search" className="flex-1  " />
                        <EvilIcons name="search" size={20} color="black" className="mb-2" />
                    </View> 
                )
            }
            {
                route.name != "BasketScreen"&& (
                    <TouchableOpacity onPress={()=>navigation.navigate("BasketScreen")}>
                        <Ionicons name="basket-outline" size={24} color="rgba(45, 212, 191,1)" />
                    </TouchableOpacity>
                )
            }
        </View>
    </KeyboardLayout>
    );
};

export default ShopHeader;