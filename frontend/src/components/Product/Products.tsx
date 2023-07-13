import Product  from './Product';
import { Product as ProductType } from '@/types';
import React from 'react';
import {  View , FlatList , RefreshControl } from 'react-native'

interface ProductsProps {
    products : ProductType[]
    refreshing : boolean 
    onRefresh : ()=>void

};

function Products({products,refreshing,onRefresh}:ProductsProps) {
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
                            product={item} 
                            hide_description hide_favorite small 
                            className="  mx-auto" 
                        /> 
                    </View>
                )}
            /> 
        </View>
    );
};

export default Products;