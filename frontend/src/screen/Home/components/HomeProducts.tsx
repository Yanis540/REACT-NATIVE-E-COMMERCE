import {  useHomeNavigation } from '../../../routes';
import React from 'react';
import { Text, View , FlatList } from 'react-native'
import ShowcaseProduct from './ShowcaseProduct';
import {Product} from '../../../components';
import { Product as ProductType } from '@/types';

interface HomeProductsProps {
    title : string 
    products : ProductType[]
    showcase ? :boolean 
};

function HomeProducts({products,title,showcase=false}:HomeProductsProps) {
    const {navigation} = useHomeNavigation();
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
                        ?   <ShowcaseProduct product={item}  />
                        :   <Product product={item}  className="mr-6 " /> 
                    }
                    keyExtractor={(item)=>(item.name as string)}
                />
           </View>
        </View>
    );
};

export default HomeProducts;