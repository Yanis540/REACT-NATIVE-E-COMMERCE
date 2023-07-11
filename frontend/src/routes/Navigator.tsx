import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack, AuthStackList } from './Stacks/AuthStack';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator, { NavigatorTabList } from './Tab/TabNavigator';
import { NavigatorScreenParams } from '@react-navigation/native';
export type NavigatorList ={
    Content ?: NavigatorScreenParams<NavigatorTabList>
    Auth ?: NavigatorScreenParams<AuthStackList>
}
const Stack = createStackNavigator<NavigatorList>(); 


function Navigator() {
    return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Content" component={TabNavigator} options={{headerShown:false}} />
            <Stack.Screen name="Auth" component={AuthStack} options={{headerShown:false}} />
        </Stack.Navigator>
    </NavigationContainer>
    );
};


export default Navigator;