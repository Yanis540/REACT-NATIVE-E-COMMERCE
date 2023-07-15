import { useAccountNavigation } from '../../routes';
import React from 'react';
import { Text, View , TouchableOpacity, ActivityIndicator, FlatList , Image } from 'react-native'
import { userOrder } from './hooks/use-order';
import { ErrorComponent } from '../../components';
import { Feather } from '@expo/vector-icons';
import OrderDetails from './components/OrderDetails';
import BasketProducts from '../Basket/components/BasketProducts';
import OrderProducts from './components/OrderProducts';

interface OrderProps {

};



function Order({}:OrderProps) {
    const {route,navigation} = useAccountNavigation(); 
    const {orderId} = route.params!||{}; 
    const {data,isLoading,error} = userOrder(orderId!); 
    const {order} = data ; 
    if(error)return <ErrorComponent data={data} /> 
    if(isLoading )return (<View className="flex-1 flex h-full bg-white"><ActivityIndicator color="black" /></View>)
    if(!error && !isLoading && order == undefined )return (
        <View className="flex-1 flex flex-col items-center justify-center gap-y-[20px] bg-white  ">
            <Text className="text-gray-400 font-bold text-xl">No Order passed </Text>
            <Feather name="shopping-bag" size={24} color="rgb(156,163,175)" />
            <TouchableOpacity onPress={()=>navigation.navigate("Shop")}>
                <View className="px-12 py-4 rounded-lg bg-emerald-400 ">
                    <Text className="text-white font-bold" >Shop now</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
    return (
        <View className="flex-1 bg-white px-2 ">
            {/* Order Details  */}
            <OrderDetails order={order!} /> 
            {/* Products */}
            <OrderProducts order={order!} /> 
        </View>
    );
};

export default Order;