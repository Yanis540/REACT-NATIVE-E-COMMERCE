import React from 'react';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign , Entypo , MaterialCommunityIcons } from '@expo/vector-icons';
import {Dimensions} from 'react-native';
import { HomeStack , ShopStack , AccountStack } from '../Stacks';
import { HomeStackList } from '../Stacks/Home/HomeStack';
import { ShopStackList } from '../Stacks/Shop/ShopStack';
import { AccountStackList } from '../Stacks/Account/AccountStack';


export type NavigatorTabList ={
    Home  ?: NavigatorScreenParams<HomeStackList>
    Shop  ?: NavigatorScreenParams<ShopStackList>
    Account ?:NavigatorScreenParams<AccountStackList> 
}

const Tab = createBottomTabNavigator<NavigatorTabList>();


function TabNavigator({}){
    return (
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
            tabBarActiveTintColor: 'rgba(52, 211,153,1)',
            tabBarInactiveTintColor: 'gray',
          })}
    >
        <Tab.Screen name="Home" component={HomeStack} options={{headerShown:false}} />
        <Tab.Screen name="Shop" component={ShopStack} options={{headerShown:false}} />
        <Tab.Screen name="Account" component={AccountStack} options={{headerShown:false}} />
    </Tab.Navigator>
    )
}

export default TabNavigator;