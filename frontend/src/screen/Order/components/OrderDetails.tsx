import { Order } from '@/types';
import React from 'react';
import { Text, View } from 'react-native'

interface OrderDetailsProps {
    order: Order
};

function OrderDetails({order}:OrderDetailsProps) {
    return (
    <View className="py-2 border-[0.5px] border-gray-400 rounded-lg mt-5 ">
        <View className="flex flex-col items-center mb-4">
            <Text className="mb-1 text-dark-gray text-2xl font-bold">Resume </Text>
            <Text className="mb-1 text-gray-500 text-md ">{order?.id} </Text>
            <Text className="text-dark-gray text-md ">{new Date(order!?.date).toDateString()} </Text>
        </View>
        <View className="flex flex-row items-center justify-around mb-4" >
            {/* adddress */}
            <View className="flex flex-row items-center">
                <Text className="text-gray-500"> Address </Text>
                <Text className="ml-1 text-dark-gray"> {order?.address}  </Text>
            </View>
            {/* Payment */}
            <View className="flex flex-row items-center">
                <Text className="text-gray-500"> Payment  </Text>

                <Text 
                    className={`text-[12px] ml-1 font-bold rounded-lg py-1 px-2 ${
                        order?.payment_status == "succeeded"
                        ?   "bg-emerald-400 text-white "
                        :   order?.payment_status == "canceled"
                            ?   "bg-red-400/30 text-red-600"
                            :   "bg-gray-400/20 text-gray-600"
                    }`} 
                >
                    {order?.payment_status}
                </Text>
            </View>
        </View>
        <View className="flex flex-row items-center justify-around " >
            {/* adddress */}
            <View className="flex flex-row items-center">
                <Text className="text-gray-500"> Amount  </Text>
                <Text className="text-dark-gray font-bold">{order?.amount} $</Text> 
            </View>
            {/* delivery state */}
            <View className="flex flex-row items-center">
                <Text className="text-gray-500"> 
                    Delivery 
                </Text>
                <Text className={`text-[12px] ml-2 rounded-lg font-bold py-1 px-2 ${
                    order?.status == "delivered"
                    ?   "bg-emerald-400 text-white "
                    :   order?.status == "cancelled"
                        ?   "bg-red-400/30 text-red-600"
                        :   "bg-gray-400/20 text-gray-600"
                    }`} >
                        {order?.status}
                </Text> 
            </View>

            
        </View>
    </View>
    );
};

export default OrderDetails;