import type { StackScreenProps } from '@react-navigation/stack';
import { HomeStackList } from './Stacks/Home/HomeStack';
import { ShopStackList } from './Stacks/Shop/ShopStack';
import { AccountStackList } from './Stacks/AccountStack';

//!##################### Home #####################
export type HomeNavigationHeaderProps = 
    StackScreenProps<HomeStackList,"HomeScreen"|"BasketScreen"|"ProductDetailsScreen">

export type HomeProps =
    StackScreenProps<HomeStackList,"HomeScreen">


//!##################### Shop #####################

export type ShopNavigationHeaderProps = 
    StackScreenProps<ShopStackList,"ShopScreen"|"BasketScreen"|"ProductDetailsScreen">
export type ShopProps =
    StackScreenProps<ShopStackList,"ShopScreen">


//!##################### Account #####################
export type AccountNavigationProps = 
    StackScreenProps<AccountStackList,"AccountScreen">


export type ProductDetailsProps =
    StackScreenProps<HomeStackList,"ProductDetailsScreen">|
    StackScreenProps<ShopStackList,"ProductDetailsScreen">
export type BasketProps =
    StackScreenProps<HomeStackList,"BasketScreen">|
    StackScreenProps<ShopStackList,"BasketScreen">

