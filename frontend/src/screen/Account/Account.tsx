import { useGlobaNavigation } from '../../routes';
import { useAuth } from '../../context/store';
import {useState} from 'react';
import { StatusBar, Text, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native';
import AccountHeader from './components/AccountHeader';
import AccountBody from './components/AccountBody';
import { LinearGradient } from 'expo-linear-gradient';
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
    if(!user){
        return <Text>COnnect first </Text>
    }
    return (
    <View className="flex-1 flex " style={{marginTop:StatusBar.currentHeight}} >
        <LinearGradient className='flex-1' colors={["rgb(52 211 153)","rgb(45 212 191)"]}>
            {/* Header  */}
            <AccountHeader /> 
            {/*  Body */}
            <View className="flex-1 bg-white rounded-t-2xl shadow-2xl ">
                <AccountBody /> 
                {/* Bottom */}
                <TouchableWithoutFeedback onPress={handlePress}>
                    <View className="flex flex-col items-center justify-center  mx-auto bg-emerald-400 text-teal-400 rounded-md py-1 px-4 mb-2 ">
                        <Text className='text-white font-bold text-xl '>{user?"Log Out": "Log In "} </Text>
                    </View>
                </TouchableWithoutFeedback>
           </View>
        </LinearGradient>
    </View>
    );
};

export default Account;