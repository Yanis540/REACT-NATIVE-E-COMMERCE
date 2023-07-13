import React from 'react';
import { useAuthNavigation } from '../../routes';
import { ScrollView, Text, TouchableWithoutFeedback, View , KeyboardAvoidingView , Platform, SafeAreaView , Button, TextInput,StyleSheet} from 'react-native'

import {StatusBar} from 'react-native';
import RegisterForm from './components/RegisterForm';
import { useRegister } from './hooks/use-register';
import { Wave } from '../../components';
import KeyboardLayout from '../../Layout/KeyboardLayout'; 
import { useHeaderHeight } from '@react-navigation/elements'
interface RegisterProps {

};

function Register({}:RegisterProps) {
    const {navigation} = useAuthNavigation();
    const {data,isLoading,error,register} = useRegister() ; 
    const handleReturnToPage = ()=>{
        if(navigation.canGoBack())
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
                        <TouchableWithoutFeedback onPress={handleReturnToPage}> 
                            <Wave>
                                <Text className="text-white font-bold text-4xl ">Register</Text>
                            </Wave>
                        </TouchableWithoutFeedback>
                        <View className="flex-1 flex flex-col justify-center w-full mt-[64px] " style={{overflow:"hidden"}}> 
                            {
                                (error!=undefined || data?.error) &&  (
                                    <Text className="text-red-400 text-center">{data?.error?.message ? data?.error!.message: "An error occured"}</Text>
                                )
                            }
                            <RegisterForm onSubmit={register}/> 
                        </View>
                    </View>
                    <View className="" style={{flex:1}} />
                </View>
            </KeyboardLayout>
        </SafeAreaView>
    </KeyboardAvoidingView>

    );
};

export default Register;