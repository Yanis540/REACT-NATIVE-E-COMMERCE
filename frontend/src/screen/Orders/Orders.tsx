import React, { useCallback, useState } from 'react';
import { Text, View , TouchableOpacity , RefreshControl , FlatList, Image} from 'react-native'
import { userOrders } from './hooks/use-orders';
import { ErrorComponent } from '../../components';
import { Feather } from '@expo/vector-icons';
import { useAccountNavigation } from '../../routes';
import OrderElement from './components/OrderElement';


interface OrdersProps {

};

function Orders({}:OrdersProps) {

    const [refreshing,setRefreshing] = useState<boolean>(false);
    const {navigation} = useAccountNavigation();  
    const {data, error,isLoading,refetch} = userOrders(); 
    const {orders} = data ; 
    const onRefresh = useCallback(async() => {
        setRefreshing(true);
        await refetch()
        setRefreshing(false)
    }, []);
    if(error)return <ErrorComponent data={data} /> 
    if(isLoading && !refreshing )return (null)
    if(!error && !isLoading && orders.length == 0 )return (
        <View className="flex-1 flex flex-col items-center justify-center gap-y-[20px] bg-white  ">
            <Text className="text-gray-400 font-bold text-xl">No Orders passed </Text>
            <Feather name="shopping-bag" size={24} color="rgb(156,163,175)" />
            <TouchableOpacity onPress={()=>navigation.navigate("Shop")}>
                <View className="px-12 py-4 rounded-lg bg-emerald-400 ">
                    <Text className="text-white font-bold" >Shop now</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
    return (
    <View className="flex-1 h-full bg-white py-2 px-1 ">
        <View className="flex-1 flex h-full px-1 ">
            <FlatList 
                keyExtractor={(item)=>item.id}
                initialNumToRender={10}
                data={orders}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                renderItem={({item})=>(
                    <OrderElement order={item}/> 
                )}
            /> 
        </View>
    </View>
    );
};

export default Orders;