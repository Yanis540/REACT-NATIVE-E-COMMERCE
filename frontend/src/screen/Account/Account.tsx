import { useGlobaNavigation } from '../../routes';
import { useAuth } from '../../context/store';
import React from 'react';
import { Text, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native';

interface AccountProps {

};

function Account({}:AccountProps) {
    const {user} = useAuth();
    const {navigation,route} = useGlobaNavigation();
    return (
        <View>
           <Text>Account</Text>
           <TouchableWithoutFeedback onPress={()=>navigation.navigate("Auth")}>
            <View className="flex flex-col items-center justify-center w-[50%] mx-auto bg-emerald-400 rounded-lg py-4 px-12 ">
                <Text className='text-white font-bold text-xl '>Log In ! </Text>
            </View>
           </TouchableWithoutFeedback>
        </View>
    );
};

export default Account;