import type { StackScreenProps } from '@react-navigation/stack';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { HomeStackList } from './Stacks/Home/HomeStack';
import { ShopStackList } from './Stacks/Shop/ShopStack';
import { AccountStackList } from './Stacks/AccountStack';
import { NavigatorTabList } from './TabNavigator';

//!##################### Home #####################
export type HomeNavigationHeaderProps = 
    StackScreenProps<HomeStackList,"HomeScreen"|"BasketScreen"|"ProductDetailsScreen">

export type HomeProps =
    CompositeScreenProps< 
        StackScreenProps<HomeStackList,"HomeScreen"|"BasketScreen"|"ProductDetailsScreen">,
        BottomTabScreenProps<NavigatorTabList>
    >


//!##################### Shop #####################

export type ShopNavigationHeaderProps = 
    StackScreenProps<ShopStackList,"ShopScreen"|"BasketScreen"|"ProductDetailsScreen">
export type ShopProps =
        CompositeScreenProps< 
            BottomTabScreenProps<NavigatorTabList>,
            StackScreenProps<ShopStackList,"ShopScreen">
        >


//!##################### Account #####################
export type AccountNavigationProps = 
    StackScreenProps<AccountStackList,"AccountScreen">


export type ProductDetailsProps =
    StackScreenProps<HomeStackList,"ProductDetailsScreen"|"BasketScreen">|
    StackScreenProps<ShopStackList,"ProductDetailsScreen"|"BasketScreen">
export type BasketProps =
    StackScreenProps<HomeStackList,"BasketScreen">|
    StackScreenProps<ShopStackList,"BasketScreen">


//!##################### Product #####################

export type ProductNavigationProps = 
StackScreenProps<ShopStackList,"ShopScreen">|
StackScreenProps<HomeStackList,"HomeScreen">
