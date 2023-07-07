import React from 'react';
import { Text, View ,TouchableOpacity } from 'react-native'
import { HomeNavigationHeaderProps } from '../../../types';
import {Dimensions} from 'react-native';
import { Ionicons , AntDesign } from '@expo/vector-icons'; 
function HomeHeader({navigation,route}:HomeNavigationHeaderProps) {
    const ScreenWidth = Dimensions.get('window').width;
    return (
        <View style={{width:ScreenWidth-20}} className="mt-[40px]  flex-1 flex  flex-row items-center gap-[5px] w-screen h-full ">
            {
                route.name == "HomeScreen" ? (

                    <Text className='flex-1 font-bold text-emerald-400 text-2xl'>Yanis</Text>
                ):(
                    <TouchableOpacity onPress={()=>navigation.goBack()} className="flex-1">
                        <AntDesign name="arrowleft" size={24} color="black"  />
                    </TouchableOpacity>
                )
            }
            {
                route.name != "BasketScreen"&& (
                    <TouchableOpacity onPress={()=>navigation.navigate("BasketScreen")} className="mr-[15px]">
                        <Ionicons name="basket-outline" size={24} color="rgba(52, 211,153,1)" />
                    </TouchableOpacity>
                )
            }
        </View>
    );
};

export default HomeHeader;