import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign , Entypo , MaterialCommunityIcons } from '@expo/vector-icons';
import {Dimensions} from 'react-native';
import { HomeStack , ShopStack , AccountStack } from './Stacks';

interface NavigationProps {

};

export type NavigatorTabList ={
    Home : undefined 
    Shop : undefined 
    Account:undefined
}

const Tab = createBottomTabNavigator<NavigatorTabList>();

function Navigation({}:NavigationProps) {
    const ScreenWidth = Dimensions.get('window').width;
    return (
        <NavigationContainer>
            <Tab.Navigator
                
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        switch(route.name){
                            case "Home":{
                                return <AntDesign name="home" size={32} color={color} />  
                            }
                            case "Shop":{
                                return <Entypo name="shop" size={32} color={color} />  
                            }
                            //account
                            default:{
                                return <MaterialCommunityIcons name="account" size={32} color={color} />  
                            }
                        }
                    },
                    tabBarActiveTintColor: 'rgba(45,212,191,1)',
                    tabBarInactiveTintColor: 'gray',
                  })}
            >
                <Tab.Screen name="Home" component={HomeStack} options={{headerShown:false}} />
                <Tab.Screen name="Shop" component={ShopStack} options={{headerShown:false}} />
                <Tab.Screen name="Account" component={AccountStack} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;