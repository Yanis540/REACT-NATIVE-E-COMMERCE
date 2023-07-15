import React, { useState } from 'react';
import { Text, View , Modal, FlatList , TouchableOpacity } from 'react-native'
import { MaterialIcons , FontAwesome  , Fontisto , Ionicons  } from '@expo/vector-icons';
import { AccountStackList } from '@/routes/Stacks/Account/AccountStack';
import { useAccountNavigation } from '../../../routes';
interface AccountBodyProps {

};
type AccountOption = "orders"| "favorites"|"settings"; 
const account_options:{name:AccountOption,Icon?: any ,screen: keyof AccountStackList}[]= [
    {name:"settings",screen:"SettingsScreen",Icon:()=><MaterialIcons name="settings" size={24} color={"rgb(52, 211,153)"} />},
    {name:"orders",screen:"OrdersScreen",Icon:()=><FontAwesome name="shopping-basket" size={24} color={"rgb(52, 211,153)"} />},
    {name:"favorites",screen:"FavoritesScreen",Icon:()=><Fontisto name="heart"  size={24} color={"rgb(52, 211,153)"} />}
]
function AccountBody({}:AccountBodyProps) {

    const {navigation} = useAccountNavigation();
    return (
        <View className="flex-1 flex px-4 py-2 ">
           {/*  */}
           <FlatList 
                data={account_options}
                keyExtractor={(item)=>(item.name as string)}
                className=''
                renderItem={({item})=>(
                    <View className="flex flex-row items-center  w-full px-4 py-4  rounded-lg mb-2 shadow-lg">
                        <item.Icon /> 
                        <Text className="ml-[10px] capitalize text-zinc-800">{item.name}</Text>
                        <View className='flex-1  flex flex-row items-center justify-end py-1 '>
                            <TouchableOpacity onPress={()=>navigation.navigate((item.screen) as any )}>
                                <Ionicons name="arrow-forward-sharp" size={24} color="rgb(39 39 42)" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
           /> 
           
        </View>
    );
};

export default AccountBody;