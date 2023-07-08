import { User } from '@/types';
import React from 'react';
import { Text, View , Image } from 'react-native'

interface DeliveryInformationsProps {

};

function DeliveryInformations({}:DeliveryInformationsProps) {
    const imgUsr = "https://lh3.googleusercontent.com/ogw/AGvuzYat7F1A7-_s8o_zpIRmvVIgHVm44YKG0-DxBWs8=s32-c-mo"
    const user: User={name:"yanis tabellout",email:"yanis@gmail.com",created_at:"2022",id:"1",orders:[],favorite_products:[],image:imgUsr}
    const defaultImgUsr = "https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg"
    return (
        <View className="flex flex-row items-center justify-between p-4 border-t-[0.5px] border-t-gray-300 ">
            <View className=" border border-emerald-400  rounded-full p-[2px] ">
                <Image className="object-contain rounded-full h-8 w-8"  source={{uri: user?.image??defaultImgUsr}} /> 
            </View>
            <Text className="capitalize text-emerald-400 font-bold ">{user?`Deliver to ${user.name.split(" ")[0]}`:"Connect"}</Text>
        </View>
    );
};

export default DeliveryInformations;