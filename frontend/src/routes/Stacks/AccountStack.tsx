
import Account from '../../screen/Account/Account';
import { createStackNavigator } from '@react-navigation/stack';


export type AccountStackList ={
  AccountScreen : undefined 
}



const AccountStackNavigator = createStackNavigator<AccountStackList>();
export function AccountStack() {
  return (
    <AccountStackNavigator.Navigator
      screenOptions={{headerShown:false}}
    >
      <AccountStackNavigator.Screen name="AccountScreen" component={Account} options={{headerShown:false,title:"Hilaw"}} />
    </AccountStackNavigator.Navigator>
  );
}


