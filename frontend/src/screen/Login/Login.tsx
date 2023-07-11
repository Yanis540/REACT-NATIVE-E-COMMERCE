import { useAuthNavigation } from '../../routes';
import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native'

import {StatusBar} from 'react-native';
interface LoginProps {

};

function Login({}:LoginProps) {
    const {navigation} = useAuthNavigation();
    const handleReturnToPage = ()=>{
        if(navigation.canGoBack())
            navigation.goBack()
        else 
            navigation.navigate("Content",{screen:"Shop"})
    }
    return (
        <View className="flex-1 flex flex-col items-center mt-[px]  " style={{marginTop:StatusBar.currentHeight}}>
           <Text>Login</Text>
           <TouchableWithoutFeedback onPress={handleReturnToPage}>
            <View className="flex flex-col items-center justify-center w-[50%] mx-auto bg-emerald-400 rounded-lg py-4 px-12 ">
                <Text className='text-white font-bold text-xl '>Log In ! </Text>
            </View>
           </TouchableWithoutFeedback>
        </View>
    );
};

export default Login;