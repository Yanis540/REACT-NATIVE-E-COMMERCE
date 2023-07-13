import React from 'react';
import { Text, View ,TouchableOpacity } from 'react-native'
import { useHomeNavigation } from '../../..';
import {Dimensions} from 'react-native';
import { Ionicons , AntDesign , Entypo } from '@expo/vector-icons'; 
import { useAuth } from '../../../../context/store';
function HomeHeader() {
    const ScreenWidth = Dimensions.get('window').width;
    const {user} = useAuth(); 
    const {navigation,route} = useHomeNavigation(); 
    return (
        <View style={{width:ScreenWidth-20}} className="mt-[40px]  flex-1 flex  flex-row items-center gap-[5px] w-screen h-full ">
            {
                route?.name == "HomeScreen" ? (

                    <Text className='flex-1 font-bold text-emerald-400 text-2xl'>{user?.name??"welcome"}</Text>
                ):(
                    <TouchableOpacity onPress={()=>navigation.goBack()} className="">
                        <AntDesign name="arrowleft" size={24} color="rgba(52, 211,153,1)"  />
                    </TouchableOpacity>
                )
            }
            {
                route?.name =="HomeScreen"?  (
                    <TouchableOpacity onPress={()=>navigation.navigate("BasketScreen")} className=" flex-1 flex flex-row items-center justify-end mr-[15px]">
                        <Ionicons name="basket-outline" size={24} color="rgba(52, 211,153,1)" />
                    </TouchableOpacity>
                ):(
                    <View className="flex-1 flex flex-row items-center ">
                        <View className='flex-1 flex flex-row items-center justify-center '>
                            <Text className="font-bold text-xl text-zinc-900">{route?.name == "ProductDetailsScreen"?"Details Product":"Basket"}</Text>
                        </View>
                        <Entypo name="dots-three-horizontal" size={24} color="rgba(52, 211,153,1)" />
                    </View>
                )
            }
        </View>
    );
};

export default HomeHeader;