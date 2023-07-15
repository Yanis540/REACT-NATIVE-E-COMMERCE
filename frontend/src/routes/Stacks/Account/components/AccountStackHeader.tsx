import React from 'react';
import { Text, View ,TouchableOpacity } from 'react-native'
import {  useAccountNavigation } from '../../..';
import {Dimensions} from 'react-native';
import { Ionicons , AntDesign , Entypo } from '@expo/vector-icons'; 
import { useAuth } from '../../../../context/store';
function AccountStackHeader() {
    const ScreenWidth = Dimensions.get('window').width;
    const {user} = useAuth(); 
    const {navigation,route} = useAccountNavigation(); 
    const nameScreen = (()=>{
        switch(route.name){
            case "FavoritesScreen": return "Favorites" 
            case "OrdersScreen": return "Orders" 
            case "OrderScreen": return "Order Details" 
            case "SettingsScreen": return "Settings" 
            default: return "" 
        }
    })()
    return (
        <View style={{width:ScreenWidth-20}} className="mt-[40px]  flex-1 flex  flex-row items-center gap-[5px] w-full h-full border-b-[0.5px] border-b-gray-300">
         
            <TouchableOpacity onPress={()=>navigation.goBack()} className="">
                <AntDesign name="arrowleft" size={24} color="rgba(52, 211,153,1)"  />
            </TouchableOpacity>

            <View className="flex-1 flex flex-row items-center ">
                <View className='flex-1 flex flex-row items-center justify-center '>
                    <Text className="font-bold text-xl text-zinc-900">{nameScreen}</Text>
                </View>
                <Entypo name="dots-three-horizontal" size={24} className="opacity-0" color="rgba(52, 211,153,1)" />
            </View>
        </View>
    );
};

export default AccountStackHeader;