import { HomeProps } from '@/routes/types';
import React from 'react';
import { Text, View , FlatList } from 'react-native'
import ShowcaseProduct from './ShowcaseProduct';
import {Product} from '../../../components';
import { Product as ProductType } from '@/types';

interface HomeProductsProps extends HomeProps{
    title : string 
    products : ProductType[]
    showcase ? :boolean 
};

function HomeProducts({products,title,navigation,showcase=false, route}:HomeProductsProps) {
    return (
        <View className="flex flex-col " >
            {/* Top : display title + see more */}
            <View className=" py-4 flex flex-row items-center justify-between ">
                <Text className="font-bold text-2xl capitalize text-slate-900  ">{title}</Text>
                <Text className="text-gray-500 mr-5" onPress={()=>navigation.navigate("Shop")}>See More</Text>
            </View>
            {/*  Best selers products  */}
           <View>
                <FlatList
                    horizontal={true}
                    className='flex flex-row'
                    style={{ flex: 0 }}
                    initialNumToRender={products.length}
                    data={products}
                    renderItem={({item}) => 
                        showcase 
                        ?   <ShowcaseProduct product={item} navigation={navigation} route={route} />
                        :   <Product product={item}  navigation={navigation as any} route={route as any} /> 
                    }
                    keyExtractor={(item)=>(item.name as string)}
                />
           </View>
        </View>
    );
};

export default HomeProducts;