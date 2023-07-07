import { HomeProps } from '@/routes/types';
import { Product } from '@/types';
import React from 'react';
import { Text, View , FlatList } from 'react-native'
import HomeProduct from './HomeProduct';

interface HomeProductsProps extends HomeProps{
    title : string 
    products : Product[]
    product_display ? :boolean 
};

function HomeProducts({products,title,navigation,product_display=false, route}:HomeProductsProps) {
    return (
        <View className="flex flex-col gap-y-[10px]" >
            {/* Top : display title + see more */}
            <View className="flex flex-row  items-center justify-between ">
                <Text className="font-bold text-2xl capitalize text-slate-900  ">{title}</Text>
                <Text className="text-gray-500" onPress={()=>navigation.navigate("Shop")}>See More</Text>
            </View>
            {/*  Down products  */}
           <View>
                <FlatList
                    horizontal={true}
                    className='flex flex-row'
                    style={{ flex: 0 }}
                    initialNumToRender={products.length}
                    data={products}
                    renderItem={({item}) => <HomeProduct navigation={navigation} route={route} product={item}/>}
                    keyExtractor={(item)=>(item.name as string)}
                />

           </View>
        </View>
    );
};

export default HomeProducts;