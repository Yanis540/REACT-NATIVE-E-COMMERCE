import { useProducts } from '../../hooks/use-products';
import { useCategories } from '../../hooks/use-categories';
import { HomeProps } from '@/routes/types';
import React from 'react';
import { Text,ScrollView, View , Button, FlatList, SafeAreaView} from 'react-native'
import HomeProducts from './components/HomeProducts';
import { CategoryCard , ErrorComponent, Loader } from '../../components';

function Home({navigation,route}:HomeProps) {
    const {data:dataProducts,isLoading:isLoadingProducts,error:errorProducts} = useProducts(); 
    const {products} = dataProducts
    const {data:dataCategories,isLoading:isLoadingCategories,error:errorCategories} = useCategories();
    const {categories} = dataCategories;  
    const error = errorProducts|| errorCategories ; 
    if(error)return <ErrorComponent data={dataProducts?.error? dataProducts:dataCategories} /> 
    if( isLoadingCategories || isLoadingProducts )return(
        <Loader /> 
    )
    return (
        <ScrollView className='flex-1 flex pl-5 overflow-y-scroll bg-white  '>
            {/* Display categories  */}
            <View className="py-4 mb-4  ">
                <FlatList
                    horizontal={true}
                    className='flex flex-row   '
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