import {useMemo, useState} from 'react';
import { Text, View , TextInput } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { BasketProduct } from '@/types';
import { useStoreBasket } from '../../../context/store/use-store-basket';
import Collapsible from 'react-native-collapsible';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface BasketPaymentProps {

};
export const calculateTotal = (basket:BasketProduct[])=>{
    let sum = 0 ; 
    basket.map((product)=>{sum+=(product.price*product.ordered_quantity)});
    return sum ; 
}
function BasketPayment({}:BasketPaymentProps) {
    const {basket} = useStoreBasket(); 
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
    const toggleCollapsed = ()=>setIsCollapsed(!isCollapsed)
    const isFreeShipping = false ;
    const shippingPrice = isFreeShipping?0 : 5
    const isCouponAvailable = true ;
    const couponReduction = !isCouponAvailable ?0: 0.05;
    const total = useMemo(()=>{
        return calculateTotal(basket);
    },[basket]);
    const actualTotal = (!isCouponAvailable? total:total*(1-couponReduction))+ (shippingPrice)

    return (
    <>
        {
            isCollapsed && (
                <View className="px-4 flex flex-col items-center justify-center border-t-[1px] py-4 border-t-gray-200">
                    <TouchableOpacity onPress={toggleCollapsed}>
                        <AntDesign name="upcircleo" size={24} color="rgb(52, 211,153)" />
                    </TouchableOpacity>
                </View>
            )
        }
    
        <Collapsible collapsed={isCollapsed} duration={300}>
            <View className="px-4 border-t-[1px] border-t-gray-200">
                {/* Coupon Code  */}
                <View className="flex flex-col pt-4 gap-y-[10px] w-full">
                    <View className="flex flex-row items-center justify-between">
                        <Text className="text-zinc-600 font-semibold">Have a coupon code ? enter here</Text>
                        <TouchableOpacity onPress={toggleCollapsed}>
                            <AntDesign name="downcircleo" size={24} color="rgb(52, 211,153)" />
                        </TouchableOpacity>
                    </View>
                    <View className=" flex flex-row items-center px-4 py-2 border border-gray-200 rounded  w-full">
                        <TextInput placeholder="coupon" className='flex-1 text-zinc-900 font-bold ' /> 
                        {/* Available or Not */}
                        <View className="flex flex-row gap-x-[10px]">
                            <Text  className={`capitalize font-bold text-md ${isCouponAvailable?"text-emerald-500":"text-red-500"}`}>{isCouponAvailable?"Available":"Not Avaialable"}</Text> 
                            <AntDesign name={isCouponAvailable?"checkcircle":"exception1"} size={24} color={isCouponAvailable?"rgb(52, 211,153)":"rgb(239,68 ,68)"} />
                        </View>
                    </View>
                </View>
                {/* Payment details */}
                <View className="py-2 flex flex-col items gap-[20px]  ">
                    <View className="flex flex-row items-center justify-between">
                        <Text className="text-zinc-500 font-bold text-[17px] ">Subtotal :</Text>
                        <Text className="text-zinc-900 font-extrabold text-[18px]">${total}</Text>
                    </View>
                    <View className="flex flex-row items-center justify-between">
                        <Text className="text-zinc-400 font-bold text-[17px] ">Delivery Fee :</Text>
                        <Text className="text-zinc-900 font-extrabold text-[18px]">${shippingPrice}</Text>
                    </View>
                    <View className="flex flex-row items-center justify-between pb-4 border-b-[1px] border-dashed border-gray-300 ">
                        <Text className="text-zinc-400 font-bold text-[17px] ">Discount :</Text>
                        <Text className="text-zinc-900 font-extrabold text-[18px]">{couponReduction*100}%</Text>
                    </View>
                    
                </View>
                <View className="py-2 flex flex-col gap-[20px]  ">
                    <View className="flex flex-row items-center justify-between">
                        <Text className="text-zinc-500 font-bold text-[17px] ">Total :</Text>
                        <Text className="text-emerald-400 font-extrabold text-2xl">${actualTotal}</Text>
                    </View>
                </View>
                <View className="py-2 mb-2 flex flex-col items-center justify-center w-full bg-emerald-400 rounded-xl   ">
                    <Text className="text-white font-extrabold text-xl">Pay</Text>
                </View>
            </View>
        </Collapsible>
    </>
    );
};

export default BasketPayment;