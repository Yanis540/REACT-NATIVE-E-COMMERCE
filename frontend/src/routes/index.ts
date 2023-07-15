import type { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useRoute , RouteProp, CompositeNavigationProp} from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { HomeStackList } from './Stacks/Home/HomeStack';
import { ShopStackList } from './Stacks/Shop/ShopStack';
import { AccountStackList } from './Stacks/Account/AccountStack';
import { NavigatorTabList } from './Tab/TabNavigator';
import { AuthStackList } from './Stacks/AuthStack';
import { NavigatorList } from './Navigator';

//?##################### Stacks #####################
type GlobalStackParamList <T extends keyof NavigatorList> = 
    StackNavigationProp<NavigatorList,T>


type HomeStackParamList<T extends keyof HomeStackList> = 
    StackNavigationProp<HomeStackList,T>
type ShopStackParamList<T extends keyof ShopStackList> = 
    StackNavigationProp<ShopStackList,T>
type AccountStackParamList<T extends keyof AccountStackList> = 
    StackNavigationProp<AccountStackList,T>
//!##################### Global #####################

export const useGlobaNavigation =()=>{
    const navigation =  useNavigation<GlobalStackParamList<"Auth">>();
    const route = useRoute<RouteProp<NavigatorList,"Auth">>()
    return {navigation,route}
}




//!##################### Home Stack #####################
    
type HomeScreenProps =
    CompositeNavigationProp<
        GlobalStackParamList<"Content">,
        CompositeNavigationProp< 
            BottomTabNavigationProp<NavigatorTabList,"Home">,
            HomeStackParamList<keyof HomeStackList>
        >
    >
export const useHomeNavigation =()=>{
    const navigation =  useNavigation<HomeScreenProps>();
    const route = useRoute<RouteProp<HomeStackList,"HomeScreen">>()
    return {navigation,route}
}

//!##################### Shop Stack #####################

    
type ShopScreenProps =
    CompositeNavigationProp<
        GlobalStackParamList<"Content">,
        CompositeNavigationProp< 
            BottomTabNavigationProp<NavigatorTabList,keyof NavigatorTabList>, 
            ShopStackParamList<keyof ShopStackList>
        >
    >
export const useShopNavigation =()=>{
    const navigation =  useNavigation<ShopScreenProps>(); 
    const route = useRoute<RouteProp<ShopStackList,"ShopScreen">>()
    return {navigation,route}
}

//!##################### Account Stack  #####################

type AccountScreenProps =
    CompositeNavigationProp<
        GlobalStackParamList<"Content">,
        CompositeNavigationProp< 
            BottomTabNavigationProp<NavigatorTabList,keyof NavigatorTabList>, 
            AccountStackParamList<keyof AccountStackList>
        >
    >
export const useAccountNavigation =()=>{
    const navigation =  useNavigation<AccountScreenProps>(); 
    const route = useRoute<RouteProp<AccountStackList,keyof AccountStackList>>()
    return {navigation,route}
}

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
    CompositeNavigationProp<
        GlobalStackParamList<"Content">,
        StackNavigationProp<HomeStackList& ShopStackList, T>
    >

export const useBasketNavigation =()=>{
    const navigation =  useNavigation<BasketStackParamList<"BasketScreen">>(); 
    const route = useRoute<RouteProp<HomeStackList&ShopStackList,"ProductDetailsScreen">>()

    return {navigation,route}
}
//!##################### AuthStack   #####################
type AuthStackParamList <T extends keyof AuthStackList > =
    CompositeNavigationProp<
        GlobalStackParamList<"Auth">,
        StackNavigationProp<AuthStackList, T>
    >
export const useAuthNavigation =()=>{
    const navigation =  useNavigation<AuthStackParamList<keyof AuthStackList>>(); 
    const route = useRoute<RouteProp<AuthStackList>>()

    return {navigation,route}
}