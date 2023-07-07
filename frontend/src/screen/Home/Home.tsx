import { useProducts } from '../../hooks/use-products';
import { useCategories } from '../../hooks/use-categories';
import { HomeProps } from '@/routes/types';
import React from 'react';
import { Text, View , Button, FlatList, SafeAreaView} from 'react-native'
import CategoryCard from './components/CategoryCard';
import LottieView from 'lottie-react-native';
import HomeProducts from './components/HomeProducts';

function Home({navigation,route}:HomeProps) {
    const {products,isLoading:isLoadingProducts} = useProducts(); 
    const {categories,isLoading:isLoadingCategories,error} = useCategories(); 
    if( isLoadingCategories || isLoadingProducts )return(
        <View className='flex-1 flex flex-col items-center justify-center bg-gradient from-white to-zinc-400   border border-red-600'>
            <LottieView
                autoPlay
                style={{
                    width: 200,
                    height: 200,
                }}
                // Find more Lottie files at https://lottiefiles.com/featured
                source={require('./assets/loading.json')}
            />
        </View>
    )
    return (
        <View className='flex-1 flex px-5 bg-white '>
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
            {/* DisPlay Products by categories */}
            <HomeProducts title='Best Salers' products={products} navigation={navigation} route={route}  />  

        </View> 
    );
};

export default Home;