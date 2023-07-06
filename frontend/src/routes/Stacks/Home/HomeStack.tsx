import { createStackNavigator } from '@react-navigation/stack';
import {Dimensions} from 'react-native';
import HomeHeader from './Header/HomeHeader';
import Home from '../../../screen/Home/Home';
import Basket from '../../../screen/Basket/Basket';
import ProductDetails from '../../../screen/ProductDetails/ProductDetails';


const HomeStackNavigator = createStackNavigator<HomeStackList>();
export function HomeStack() {
    const ScreenWidth = Dimensions.get('window').width;
    return (
      <HomeStackNavigator.Navigator
        screenOptions={({navigation,route}:{navigation:any,route:any})=>{
            return {
                animationEnabled:true,
                headerLeft: ()=> null,
                headerTitle:()=><HomeHeader navigation={navigation} route={route}  />,
            }
        }}
      >
            <HomeStackNavigator.Screen name="HomeScreen" component={Home}  />
            <HomeStackNavigator.Screen name="BasketScreen"  component={Basket} />
            <HomeStackNavigator.Screen name="ProductDetailsScreen" component={ProductDetails} />
      </HomeStackNavigator.Navigator>
    );
}
export type HomeStackList ={
    HomeScreen : undefined 
    BasketScreen : undefined 
    ProductDetailsScreen: {productId:string}
}
