import { Product } from '../../../components';
import { Product as ProductType } from '@/types';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Text, View , FlatList , RefreshControl } from 'react-native'

interface ShopProductsProps {
    products : ProductType[]
    refreshing : boolean 
    onRefresh : ()=>void
};

function ShopProducts({products,refreshing,onRefresh}:ShopProductsProps) {
    const navigation = useNavigation();
    const route = useRoute();
    return (
        <View className="flex-1 justify-center px-1 ">
            <FlatList 
                keyExtractor={(item)=>item.id}
                numColumns={2}
                className='flex flex-1'
                data={products}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                renderItem={({item})=>(
                    <View className="w-[50%] mb-4">
                        <Product 
                            product={item} navigation={navigation as any} 
                            route={route as any} 
                            hide_description hide_favorite small 
                            className="  mx-auto" 
                        /> 
                    </View>
                )}
            /> 
        </View>
    );
};

export default ShopProducts;