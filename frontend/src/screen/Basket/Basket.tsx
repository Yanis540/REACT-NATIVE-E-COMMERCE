import { useStoreBasket } from '../../context/store/use-store-basket';
import { BasketProps } from '@/routes/types';
import React from 'react';
import { Text, View  , Image, ScrollView} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { User } from '@/types';
import DeliveryInformations from './components/DeliveryInformations';
import BasketPayment from './components/BasketPayment';
import BasketProducts from './components/BasketProducts';
import KeyboardLayout from '../../Layout/KeyboardLayout';


function Basket({navigation,route}:BasketProps) {
    const {basket} = useStoreBasket();
    const imgUsr = "https://lh3.googleusercontent.com/ogw/AGvuzYat7F1A7-_s8o_zpIRmvVIgHVm44YKG0-DxBWs8=s32-c-mo"
    const user: User={name:"yanis tabellout",email:"yanis@gmail.com",created_at:"2022",id:"1",orders:[],favorite_products:[],image:imgUsr}
    const defaultImgUsr = "https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg"
    
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
            <BasketProducts navigation={navigation} route={route} /> 
            <BasketPayment /> 
        </View>
    </KeyboardLayout>
    );
};

export default Basket;