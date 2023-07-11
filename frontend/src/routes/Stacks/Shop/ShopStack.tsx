import { createStackNavigator } from '@react-navigation/stack';
import Basket from '../../../screen/Basket/Basket';
import ProductDetails from '../../../screen/ProductDetails/ProductDetails';
import ShopHeader from './Header/ShopHeader';
import Shop from '../../../screen/Shop/Shop';


const ShopStackNavigator = createStackNavigator<ShopStackList>();


export function ShopStack() {
  return (
    <ShopStackNavigator.Navigator
      initialRouteName='ShopScreen'
      screenOptions={()=>{
        return {
            animationEnabled:true,
            headerLeft: ()=> null,
            headerTitle:()=><ShopHeader   />,
        }
      }}
    >
      <ShopStackNavigator.Screen name="ShopScreen" component={Shop} />
      <ShopStackNavigator.Screen name="BasketScreen" component={Basket} />
      <ShopStackNavigator.Screen name="ProductDetailsScreen" component={ProductDetails} />
    </ShopStackNavigator.Navigator>
  );
}
export type ShopStackList ={
    ShopScreen : undefined 
    BasketScreen : undefined 
    ProductDetailsScreen:{productId:string}
}
