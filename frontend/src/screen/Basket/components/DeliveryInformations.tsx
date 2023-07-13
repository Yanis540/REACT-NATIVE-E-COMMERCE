import { useAuth } from '../../../context/store';
import { User } from '@/types';
import React from 'react';
import { Text, View , Image } from 'react-native'

interface DeliveryInformationsProps {

};

function DeliveryInformations({}:DeliveryInformationsProps) {
    const imgUsr = "https://lh3.googleusercontent.com/ogw/AGvuzYat7F1A7-_s8o_zpIRmvVIgHVm44YKG0-DxBWs8=s32-c-mo"
    const {user} = useAuth(); 
    const defaultImgUsr = "https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg"
    return (
        <View className="flex flex-row items-center justify-between p-4 border-t-[0.5px] border-t-gray-300 ">
            <View className=" border border-emerald-400  rounded-full p-[2px] ">
                <Image className="object-contain rounded-full h-8 w-8"  source={{uri: user?.image??defaultImgUsr}} /> 
            </View>
            <View className="flex flex-col items-start">
                <Text className="capitalize text-emerald-400 font-bold ">{user?`Deliver to ${user.name.split(" ")[0]}`:"Connect"}</Text>
                <Text className="text-[10px] text-gray-400">{user?.address??"No address "} </Text>
            </View>
        </View>
    );
};

export default DeliveryInformations;