
import Orders from '../../../screen/Orders/Orders';
import Account from '../../../screen/Account/Account';
import { createStackNavigator } from '@react-navigation/stack';
import Order from '../../../screen/Order/Order';
import Settings from '../../../screen/Settings/Settings';
import Favorites from '../../../screen/Favorites/Favorites';
import AccountStackHeader from './components/AccountStackHeader';


export type AccountStackList ={
  AccountScreen : undefined 
  OrdersScreen : undefined 
  OrderScreen : {orderId:string}
  SettingsScreen : undefined
  FavoritesScreen : undefined
}

const AccountStackNavigator = createStackNavigator<AccountStackList>();
export function AccountStack() {
  return (
    <AccountStackNavigator.Navigator
      screenOptions={{headerShown:true}}
    >
      <AccountStackNavigator.Screen name="AccountScreen" component={Account} options={{headerShown:false,title:"Hilaw"}} />
      <AccountStackNavigator.Group screenOptions={()=>{
        return {
          animationEnabled:true,
          headerLeft: ()=> null,
          headerTitle:()=><AccountStackHeader /> ,
        }
      }}>
        <AccountStackNavigator.Screen name="OrdersScreen" component={Orders}  />
        <AccountStackNavigator.Screen name="OrderScreen" component={Order}  />
        <AccountStackNavigator.Screen name="SettingsScreen" component={Settings}  />
        <AccountStackNavigator.Screen name="FavoritesScreen" component={Favorites}  />
      </AccountStackNavigator.Group>
    </AccountStackNavigator.Navigator>
  );
}


