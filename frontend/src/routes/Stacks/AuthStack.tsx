
import Login from '@/screen/Login/Login';
import { createStackNavigator } from '@react-navigation/stack';
import Register from '@/screen/Register/Register';

//  In the SHOP 

export type AuthStack ={
    LoginScreen : undefined 
    RegisterScreen : undefined 
}



const AuthStackNavigator = createStackNavigator<AuthStack>();
export function AccountStack() {
    return (
      <AuthStackNavigator.Navigator
        screenOptions={{headerShown:false}}
      >
        <AuthStackNavigator.Screen name="LoginScreen" component={Login} />
        <AuthStackNavigator.Screen name="RegisterScreen" component={Register} />
      </AuthStackNavigator.Navigator>
    );
}
