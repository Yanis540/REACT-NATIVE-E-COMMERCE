import { useGlobaNavigation } from '../../routes';
import { useAuth } from '../../context/store';
import React from 'react';
import { Text, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native';

interface AccountProps {

};

function Account({}:AccountProps) {
    const {user , set_user} = useAuth();
    const {navigation,route} = useGlobaNavigation();
    const handlePress= ()=>{
        if(!user)
            navigation.navigate("Auth")
        else 
            set_user(null); 
    }
    return (
        <View>
           <Text>Account</Text>
           <TouchableWithoutFeedback onPress={handlePress}>
                <View className="flex flex-col items-center justify-center w-[50%] mx-auto bg-emerald-400 rounded-lg py-4 px-12 ">
                    <Text className='text-white font-bold text-xl '>{user?"Sign out": "Log In "} </Text>
                </View>
           </TouchableWithoutFeedback>
        </View>
    );
};

export default Account;