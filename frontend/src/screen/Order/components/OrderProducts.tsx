import { useAccountNavigation } from '../../../routes';
import { Order } from '@/types';
import React from 'react';
import { Text, View , FlatList,TouchableOpacity,Image} from 'react-native'

interface OrderProductsProps {
    order: Order
};
const possiblesColors = [
    "bg-blue-400/30", 
    "bg-purple-400/30",
    "bg-zinc-400/30"
]
const random = Math.floor(Math.random() * 10) %(possiblesColors.length)

function OrderProducts({order}:OrderProductsProps) {
    const {route,navigation} = useAccountNavigation(); 
    return (
    <View className="flex-1 flex flex-col mt-5 ">
        <Text className="text-dark-gray text-lg font-bold text-center mb-4">Ordered products</Text>
        <FlatList 
            data={order!?.basket}
            keyExtractor={(item)=>`${item.order}-${item.id_product}`}
            renderItem={({item:ordered_product})=>(
                <TouchableOpacity onPress={()=>navigation.navigate("Shop",{screen:"ProductDetailsScreen",params:{productId:ordered_product.product.id}})}>
                    <View className={`flex flex-row items-center px-1 py-1 max-h-[80px] bg-white  border-[1px] border-gray-200 rounded-lg z-50 mb-3 `}>
                        {/* Image */}
                        <View className={` flex flex-col items-center justify-center h-full  px-2  py-4 mr-2  bg-violet-500/30 rounded-lg 
                            ${
                                random==0?"bg-blue-400/30": random==1?"bg-violet-400/30": "bg-zinc-400/30"
                            }
                        `}>
                            <Image className='h-[35px] w-[35px] object-cover rounded-xl' source={{uri:ordered_product.product.image}} style={{resizeMode: 'contain',}} />
                        </View>
                        {/*  description  */}
                        <View className="flex-1 flex flex-col items-start justify-around h-full   ">

                            <Text className="text-[13px] capitalize ">{ordered_product.product.name}</Text>
                            <Text className="text-[15px] text-zinc-700 font-bold ">{ordered_product.product.price} $ &times; {ordered_product.quantity}</Text>
                        </View>
                        <View className="flex flex-col items-start justify-around h-full mr-2   ">
                            <Text className="text-[13px] capitalize font-medium">{ordered_product.color}</Text>
                        </View>
                        {/* add/ remove button */}
                        
                    </View>
                </TouchableOpacity>
            )}
        /> 
    </View>
    );
};

export default OrderProducts;