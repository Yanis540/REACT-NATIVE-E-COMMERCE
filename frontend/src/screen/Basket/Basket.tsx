import { useAuth, useBasket } from '../../context/store';
import React from 'react';
import { Text, View  , Image, ScrollView} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { User } from '@/types';
import DeliveryInformations from './components/DeliveryInformations';
import BasketPayment from './components/BasketPayment';
import BasketProducts from './components/BasketProducts';
import KeyboardLayout from '../../Layout/KeyboardLayout';


function Basket() {
    const {basket} = useBasket();
    
    if(!basket?.length) return (
        <View className="flex-1 flex flex-col items-center justify-center gap-y-[20px] bg-white ">
            <Text className="text-2xl text-zinc-800 font-bold ">Your Basket is Empty ! </Text>
            <Ionicons name="basket-outline" size={32} color="black" />
        </View>
    )
    return (
    <KeyboardLayout>
        <View className="flex-1 flex flex-col gap-y-[10px] bg-white">
            {/* Delivery  */}
            <DeliveryInformations /> 
            <BasketProducts  /> 
            <BasketPayment /> 
        </View>
    </KeyboardLayout>
    );
};

export default Basket;