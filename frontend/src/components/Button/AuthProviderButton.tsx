import React from 'react';
import {TouchableOpacity, View} from "react-native"; 
import { AntDesign } from '@expo/vector-icons';
import { OpaqueColorValue } from 'react-native';
import { AuthProvider } from '@/types';
interface AuthProviderButtonProps {
    onPress: ()=>void
    name :AuthProvider
    color ? : string|OpaqueColorValue
};

function AuthProviderButton({onPress, name,color="black"}:AuthProviderButtonProps) {
    return (
    <TouchableOpacity onPress={onPress }>
        <View 
            className="
                inline-flex  justify-center rounded-md 
                bg-white px-4 py-2  shadow-sm 
                ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0
            "
        >
           <AntDesign name={name} size={24} color={"rgb(52 211 153 )"} />
        </View>
    </TouchableOpacity>
    );
};

export default AuthProviderButton;