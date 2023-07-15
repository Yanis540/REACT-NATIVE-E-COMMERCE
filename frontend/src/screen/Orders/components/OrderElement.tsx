import { useAccountNavigation } from '../../../routes';
import { Order } from '@/types';
import React from 'react';
import { Text, View , Image, TouchableOpacity} from 'react-native'

interface OrderElementProps {
    order:Order
};
const possiblesColors = [
    "bg-blue-400/30", 
    "bg-purple-400/30",
    "bg-zinc-400/30"
]
const random = Math.floor(Math.random() * 10) %(possiblesColors.length)
function OrderElement({order}:OrderElementProps) {
    const {navigation} = useAccountNavigation();
    return (
    <TouchableOpacity onPress={()=>navigation.navigate("OrderScreen",{orderId:order.id})}>
        <View className={`flex flex-row items-center px-1 py-1 mb-2 max-h-[80px] bg-white  border-[1px] border-gray-200 rounded-lg z-50   `}>
            {/* Image */}
            <View className={` flex flex-col items-center justify-center h-full  px-2  py-4 mr-2  bg-violet-500/30 rounded-lg 
                ${
                    random==0?"bg-blue-400/30": random==1?"bg-violet-400/30": "bg-zinc-400/30"
                }
            `}>
                <Image className='h-[35px] w-[35px] object-cover rounded-xl' source={{uri:order.products[0].image}} style={{resizeMode: 'contain',}} />
            </View>
            {/*  General informations  */}
            <View className="flex-1 flex flex-col items-start justify-around h-full   ">
                {/* id */}
                <Text className="text-[13px] capitalize font-medium">{order.id}</Text>
                {/* date */}
                <Text className="text-[11px] capitalize text-zinc-800">{`${new Date(order.date).getMonth()}-${new Date(order.date).getFullYear()}`}</Text>
                {/* pricing  */}
                <View className="flex flex-row items-center">
                    <Text className="text-[15px] text-zinc-900 font-bold   ">{order.amount} $</Text>
                    {/* Payment Status */}
                    <Text 
                        className={`text-[12px] ml-1 rounded-lg font-bold py-1 px-2 ${
                            order.payment_status == "succeeded"
                            ?   "bg-emerald-400 text-white "
                            :   order.payment_status == "canceled"
                                ?   "bg-red-400/30 text-red-600"
                                :   "bg-gray-400/20 text-gray-600"
                        }`} 
                    >
                        {order.payment_status}
                    </Text>
                </View>
            </View>
            <View className="flex flex-col items-center justify-center  h-full ">
                <Text className={`text-[12px] ml-1 rounded-lg font-bold py-1 px-2 ${
                    order.status == "delivered"
                    ?   "bg-emerald-400 text-white "
                    :   order.status == "cancelled"
                        ?   "bg-red-400/30 text-red-600"
                        :   "bg-gray-400/20 text-gray-600"
                    }`} >
                        {order.status}
                </Text>
            </View>
        </View>
    </TouchableOpacity>
    );
};

export default OrderElement;