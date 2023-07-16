import { AuthProvider } from '@/types';
import React from 'react';
import { View } from 'react-native'
import { AuthProviderButton } from '../../../components';

interface AuthProvidersProps {

};
const providers:AuthProvider[]= ["google"]
function AuthProviders({}:AuthProvidersProps) {
    const handleProviderLogin = async (provider:AuthProvider)=>{
        console.log(provider); 
    }
    return (
    <View className='flex flex-row items-center justify-center w-full '>
        {
            providers.map((provider)=>(
                <AuthProviderButton key={provider} onPress={()=>{handleProviderLogin(provider)}} name={provider} /> 
            ))
        }
    </View>
    );
};

export default AuthProviders;