import React, { useState } from 'react';
import { Text, View , Modal, FlatList , TouchableOpacity } from 'react-native'
import { MaterialIcons , FontAwesome  , Fontisto , Ionicons  } from '@expo/vector-icons';
import AccountBodyModal from './AccountBodyModal';
import AccountFavoriteProducts from './AccountFavoriteProducts';
import AccountSettings from './AccountSettings';
import AccountOrders from './AccountOrders';
interface AccountBodyProps {

};
type AccountOption = "orders"| "favorites"|"settings"|undefined; 
const account_options:{name:AccountOption,Icon?: any   }[]= [
    {name:"settings",Icon:()=><MaterialIcons name="settings" size={24} color={"rgb(52, 211,153)"} />},
    {name:"orders",Icon:()=><FontAwesome name="shopping-basket" size={24} color={"rgb(52, 211,153)"} />},
    {name:"favorites",Icon:()=><Fontisto name="heart"  size={24} color={"rgb(52, 211,153)"} />}
]
function AccountBody({}:AccountBodyProps) {

    const [accountOption, setAccountOption] = useState<AccountOption>(undefined) ; 

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
                            <TouchableOpacity onPress={()=>setAccountOption(item.name)}>
                                <Ionicons name="arrow-forward-sharp" size={24} color="rgb(39 39 42)" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
           /> 
           <AccountBodyModal onClose={()=>{setAccountOption(undefined)}} option={accountOption} visible={!!accountOption} >
            <View className="flex-1">
                {
                    (()=>{
                        switch(accountOption){
                            case "favorites": 
                                return <AccountFavoriteProducts /> 
                            case "settings":
                                return <AccountSettings /> 
                            case "orders":
                                return <AccountOrders /> 
                            default : 
                                return null ; 
                        }
                    })
                    ()
                }
            </View>
           </AccountBodyModal>
           
        </View>
    );
};

export default AccountBody;