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
    return (
    <View className="flex-1 flex " style={{marginTop:StatusBar.currentHeight}} >
        <LinearGradient className='flex-1' colors={["rgb(52 211 153)","rgb(45 212 191)"]}>
            {/* Header  */}
            <AccountHeader /> 
            {/*  Body */}
            <View className={`flex-1 bg-white rounded-t-2xl shadow-2xl ${!user && "flex flex-col items-center justify-center"} `}>
                {
                    user && (<AccountBody /> )
                }
                {/* Bottom */}
                <TouchableWithoutFeedback onPress={handlePress}>
                    <View className={`flex flex-col items-center justify-center  mx-auto bg-emerald-400 text-teal-400 rounded-md ${user?"py-2 px-4":"py-5 px-8 items-center"} mb-2 `}>
                        <Text className={`text-white font-bold ${user?"text-lg":"text-xl"} text-center `}>{user?"Log Out": "Log In "} </Text>
                    </View>
                </TouchableWithoutFeedback>
           </View>
        </LinearGradient>
    </View>
    );
};

export default Account;