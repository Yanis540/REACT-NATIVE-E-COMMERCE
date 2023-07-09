import React from 'react';
import { Text, View  ,TextInput,TouchableOpacity} from 'react-native'
import { ShopNavigationHeaderProps  } from '../../../types';
import {Dimensions} from 'react-native';
import { Ionicons , AntDesign , EvilIcons , Entypo } from '@expo/vector-icons'; 
import KeyboardLayout from '../../../../Layout/KeyboardLayout';

interface ShopHeaderProps  extends ShopNavigationHeaderProps{

};

function ShopHeader({navigation,route}:ShopHeaderProps) {
    const ScreenWidth = Dimensions.get('window').width;
    return (
    <KeyboardLayout>
        <View style={{width:ScreenWidth-20}} className="mt-[40px] flex-1 flex  flex-row items-center gap-[5px] w-screen h-full  ">
            {
                route.name == "ShopScreen" ?(
                    <Text className='font-bold text-emerald-400 text-2xl'>Shop</Text>
                ):(
                    <TouchableOpacity onPress={()=>navigation.goBack()} className="">
                        <AntDesign name="arrowleft" size={24} color="rgba(52, 211,153,1)"  />
                    </TouchableOpacity>
                )
            }
            {
                route.name=="ShopScreen" ? (
                    <View className="flex-1 flex flex-row items-center justify-end gap-x-[10px]  ">
                        <TouchableOpacity onPress={()=>navigation.navigate("BasketScreen")}>
                            <Ionicons name="basket-outline" size={24} color="rgba(52, 211,153,1)" />
                        </TouchableOpacity>
                    </View>
                   
                ):(
                    <View className="flex-1 flex flex-row items-center ">
                        <View className='flex-1 flex flex-row items-center justify-center '>
                            <Text className="font-bold text-xl text-zinc-900">{route.name == "ProductDetailsScreen"?"Details Product":"Basket"}</Text>
                        </View>
                   
                        <Entypo name="dots-three-horizontal" size={24} color="rgba(52, 211,153,1)" />
                    </View>
                )
            }
    
        </View>
    </KeyboardLayout>
    );
};

export default ShopHeader;