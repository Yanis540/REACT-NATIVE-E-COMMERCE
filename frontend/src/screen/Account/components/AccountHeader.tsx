import { useAuth } from '../../../context/store';
import React from 'react';
import { Text, View , Image, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons'; 

interface AccountHeaderProps {

};

function AccountHeader({}:AccountHeaderProps) {
    const {user} = useAuth(); 
    const handlePress = ()=>{
    }
    const defaultImgUsr = "https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg"
    return (
        <View className="flex flex-col items-center px-4 py-2">
            {/* Some random Stuff */}
            <View className='flex flex-row items-center justify-between w-full mt-4'>
                <Text className="text-white text-[25px] ">Profile</Text>
                <TouchableOpacity onPress={handlePress}>
                    <Entypo name="dots-three-vertical" size={24} color="rgba(255, 255,255,1)" />
                </TouchableOpacity>
            </View>
            {/* Image */}
            <View className=" border border-teal-300  rounded-full p-[2px] my-[10px] ">
                <Image className="object-contain rounded-full h-16 w-16 "  source={{uri: user?.image??defaultImgUsr}} /> 
            </View>
           {/* Email  */}
            <View className="flex flex-col items-center">
                <Text className="text-white  text-lg ">{user?.name}</Text>
                <Text className="text-gray-100  text-sm ">{user?.address??"no address"}</Text>
            </View>
        </View>
    );
};

export default AccountHeader;