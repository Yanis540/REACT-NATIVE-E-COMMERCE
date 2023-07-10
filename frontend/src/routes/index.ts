import type { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useRoute , RouteProp, CompositeNavigationProp} from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { HomeStackList } from './Stacks/Home/HomeStack';
import { ShopStackList } from './Stacks/Shop/ShopStack';
import { AccountStackList } from './Stacks/AccountStack';
import { NavigatorTabList } from './TabNavigator';


//!##################### Home #####################
type HomeStackParamList<T extends keyof HomeStackList> = 
    StackNavigationProp<HomeStackList,T>
    
type HomeScreenProps =
    CompositeNavigationProp< 
        BottomTabNavigationProp<NavigatorTabList,"Home">,
        HomeStackParamList<keyof HomeStackList>
    >
export const useHomeNavigation =()=>{
    const navigation =  useNavigation<HomeScreenProps>();
    const route = useRoute<RouteProp<HomeStackList,"HomeScreen">>()
    return {navigation,route}
}

//!##################### Shop #####################
type ShopStackParamList<T extends keyof ShopStackList> = 
    StackNavigationProp<ShopStackList,T>
    
type ShopScreenProps =
    CompositeNavigationProp< 
        BottomTabNavigationProp<NavigatorTabList,"Shop">, 
        ShopStackParamList<keyof ShopStackList>
    >
export const useShopNavigation =()=>{
    const navigation =  useNavigation<ShopScreenProps>(); 
    const route = useRoute<RouteProp<ShopStackList,"ShopScreen">>()
    return {navigation,route}
}

//!##################### Account #####################
export type AccountNavigationProps = 
    StackNavigationProp<AccountStackList,"AccountScreen">

//!##################### Product Details  #####################

type ProductDetailsStackParamList <T extends keyof (HomeStackList& ShopStackList) > =
    StackNavigationProp<HomeStackList& ShopStackList, T>

export const useProductDetailsNavigation =()=>{
    const navigation =  useNavigation<ProductDetailsStackParamList<"ProductDetailsScreen">>(); 
    const route = useRoute<RouteProp<HomeStackList&ShopStackList,"ProductDetailsScreen">>()

    return {navigation,route}
}
    
//!##################### Basket Details  #####################

type BasketStackParamList <T extends keyof (HomeStackList& ShopStackList) > =
    StackNavigationProp<HomeStackList& ShopStackList, T>

export const useBasketNavigation =()=>{
    const navigation =  useNavigation<BasketStackParamList<"BasketScreen">>(); 
    const route = useRoute<RouteProp<HomeStackList&ShopStackList,"ProductDetailsScreen">>()

    return {navigation,route}
}