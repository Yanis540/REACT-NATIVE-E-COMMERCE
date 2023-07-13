// import { Wave } from '../../components';
import { useAuthNavigation } from '../../routes';
import React from 'react';
import { ScrollView, Text, TouchableWithoutFeedback, View , KeyboardAvoidingView , Platform, SafeAreaView , Button, TextInput,StyleSheet, TouchableOpacity} from 'react-native'

import {StatusBar} from 'react-native';
import LoginForm from './components/LoginForm';
import { useLogin } from './hooks/use-login';
import { Wave } from '../../components';
import KeyboardLayout from '../../Layout/KeyboardLayout'; 
import { useHeaderHeight } from '@react-navigation/elements'
import AuthProviders from './components/AuthProviders';
interface LoginProps {

};

function Login({}:LoginProps) {
    const height = useHeaderHeight()
    const {navigation} = useAuthNavigation();
    const {data,isLoading,error,login} = useLogin() ; 
    const handleReturnToPage = ()=>{
        if(navigation.canGoBack() || navigation.getState().routes[-2].name=="Auth")
            navigation.goBack()
        else 
            navigation.navigate("Content")
    }; 
    return (
    <KeyboardAvoidingView  style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : "height"}>
        <SafeAreaView className="flex-1">
            <KeyboardLayout>
                <View className="flex-1 justify-end p-b-[24px] bg-white " style={{marginTop:StatusBar.currentHeight,}}>
                    {/*  */}
                    <View className=" flex h-full border-black ">
                        <TouchableOpacity onPress={handleReturnToPage}> 
                            <Wave>
                                <Text className="text-white font-bold text-4xl ">Log In</Text>
                            </Wave>
                        </TouchableOpacity>
                        <View className="flex-1 flex flex-col justify-center w-full mt-[64px] " style={{overflow:"hidden"}}> 
                        <AuthProviders /> 
                            {
                                ((error!=undefined && error!=null )|| data?.error) &&  (
                                    <Text className="text-red-400 text-center">{data?.error?.message ? data?.error!.message: "An error occured"}</Text>
                                )
                            }
                            <LoginForm onSubmit={login}/> 
                        </View>
                    </View>
                    <View className="" style={{flex:1}} />
                </View>
            </KeyboardLayout>
        </SafeAreaView>
    </KeyboardAvoidingView>

    );
};
export default Login;