// import { Wave } from '../../components';
import { useAuthNavigation } from '../../routes';
import React from 'react';
import { ScrollView, Text, TouchableWithoutFeedback, View , KeyboardAvoidingView , Platform, SafeAreaView} from 'react-native'

import {StatusBar} from 'react-native';
import LoginForm from './components/LoginForm';
import { useLogin } from './hooks/use-login';
import { Wave } from '../../components';
import KeyboardLayout from '../../Layout/KeyboardLayout'; 
import { useHeaderHeight } from '@react-navigation/elements'
interface LoginProps {

};

function Login({}:LoginProps) {
    const height = useHeaderHeight()
    const {navigation} = useAuthNavigation();
    const {data,isLoading,error,login} = useLogin() ; 
    const handleReturnToPage = ()=>{
        if(navigation.canGoBack())
            navigation.goBack()
        else 
            navigation.navigate("Content")
    }; 
    return (
    <KeyboardAvoidingView  style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : "height"}>
        <KeyboardLayout>
            <SafeAreaView className="flex-1 flex flex-col bg-white  border border-black" style={{marginTop:StatusBar.currentHeight,}}>
                <Wave>
                    <Text className="text-white font-bold text-4xl ">Log In</Text>
                </Wave>
                <View className="flex-1 flex flex-col justify-center w-full h-full mt-[64px]  border border-green-500"> 
                    {
                        (error!=undefined && error!=null || data?.error) &&  (
                            <Text className="text-red-400 text-center">{data?.error?.message ? data?.error.message: "An error occured"}</Text>
                        )
                    }
                    <LoginForm onSubmit={login}/> 
                </View>
                <View className="border border-yellow-500" style={{flex:1}} />
            </SafeAreaView>
        </KeyboardLayout>
    </KeyboardAvoidingView>

    );
};
export default Login;