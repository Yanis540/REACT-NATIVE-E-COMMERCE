import { useProducts } from '../../hooks/use-products';
import { useCategories } from '../../hooks/use-categories';
import React from 'react';
import { Text,ScrollView, View , Button, FlatList, SafeAreaView, RefreshControl} from 'react-native'
import HomeProducts from './components/HomeProducts';
import { CategoryCard , ErrorComponent, Loader } from '../../components';

function Home() {
    const {data:dataProducts,isLoading:isLoadingProducts,error:errorProducts,getAsyncProducts} = useProducts(); 
    const {products} = dataProducts
    const {data:dataCategories,isLoading:isLoadingCategories,error:errorCategories} = useCategories();
    const {categories} = dataCategories;  
    const error = errorProducts|| errorCategories ; 
    const loading = isLoadingCategories || isLoadingProducts
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(async() => {
        setRefreshing(true);
        await getAsyncProducts({})
        setRefreshing(false)
    }, []);
    
    if(error)return <ErrorComponent data={dataProducts?.error? dataProducts:dataCategories} /> 
    if( loading && !refreshing )return(
        <Loader /> 
    )
    return (
        <ScrollView
            className='flex-1 flex pl-5 overflow-y-scroll bg-white  '
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
        >
            {/* Display categories  */}
            <View className="py-4 mb-4  ">
                <FlatList
                    horizontal={true}
                    className='flex flex-row   '
                    style={{ flex: 0 }}
                    initialNumToRender={categories.length}
                    data={categories}
                    renderItem={({item}) => <CategoryCard category={item}/>}
                    keyExtractor={(item)=>(item.name as string)}
                />
            </View>
            <View className="flex flex-col mb-4 " >
                {/* Show case best salers */}
                <HomeProducts title='Best Salers' products={products} showcase   />  
                {/* Show products by categories  */}
                {
                    categories?.map((categorie,index)=>(
                        <HomeProducts key={categorie.name} title={categorie.name} products={categorie.products}  /> 
                    ))
                }
            </View>

        </ScrollView> 
    );
};

export default Home;