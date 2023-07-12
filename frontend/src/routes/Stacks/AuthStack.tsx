
import Login from '../../screen/Login/Login';
import Register from '../../screen/Register/Register';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../../context/store';
import { useGlobaNavigation } from '..';

//  In the SHOP 

export type AuthStackList = {
  LoginScreen : undefined 
  RegisterScreen : undefined 
}

const AuthStackNavigator = createStackNavigator<AuthStackList>();
export function AuthStack() {
  const {user} = useAuth();
  const {navigation} = useGlobaNavigation();
  if(user) {
    if(navigation.canGoBack())
      navigation.goBack()
    navigation.navigate("Content")
    return null ;  
  }
  return (
    <AuthStackNavigator.Navigator
      screenOptions={{headerShown:false}}
    >
      <AuthStackNavigator.Screen name="LoginScreen" component={Login} />
      <AuthStackNavigator.Screen name="RegisterScreen" component={Register} />
    </AuthStackNavigator.Navigator>
  );
}
