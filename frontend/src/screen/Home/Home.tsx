import { useProducts } from '../../hooks/use-products';
import { useCategories } from '../../hooks/use-categories';
import { HomeProps } from '@/routes/types';
import React from 'react';
import { Text,ScrollView, View , Button, FlatList, SafeAreaView} from 'react-native'
import CategoryCard from './components/CategoryCard';
import HomeProducts from './components/HomeProducts';
import Loader from '../../components/Loader/Loader';

function Home({navigation,route}:HomeProps) {
    const {products,isLoading:isLoadingProducts} = useProducts(); 
    const {categories,isLoading:isLoadingCategories,error} = useCategories(); 
    if( isLoadingCategories || isLoadingProducts )return(
        <Loader /> 
    )
    return (
        <ScrollView className='flex-1 flex pl-5 overflow-y-scroll bg-white  '>
            {/* Display categories  */}
            <View className="py-4 mb-4 border-b-[1px] border-gray-200 ">
                <FlatList
                    horizontal={true}
                    className='flex flex-row gap-x-[10px] px-4 '
                    style={{ flex: 0 }}
                    initialNumToRender={categories.length}
                    data={categories}
                    renderItem={({item}) => <CategoryCard navigation={navigation} route={route} category={item}/>}
                    keyExtractor={(item)=>(item.name as string)}
                />
            </View>
            <View className="flex flex-col mb-4 " >
                {/* Show case best salers */}
                <HomeProducts title='Best Salers' products={products} showcase navigation={navigation} route={route}  />  
                {/* Show products by categories  */}
                {
                    categories?.slice(0,3).map((categorie,index)=>(
                        <HomeProducts key={categorie.name} title={categorie.name} products={categorie.products} navigation={navigation} route={route} /> 
                    ))
                }
            </View>

        </ScrollView> 
    );
};

export default Home;