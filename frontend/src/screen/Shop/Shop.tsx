import {useState} from 'react';
import { Text, View  , FlatList, TouchableOpacity, ScrollView} from 'react-native'
import { ShopProps } from '../../routes/types';
import KeyboardLayout from '../../Layout/KeyboardLayout';
import { Feather } from '@expo/vector-icons';
import { useCategories } from '../../hooks/use-categories';
import { CategoryCard , ErrorComponent, Loader, Product} from '../../components';
import FilterModal from './components/FilterModal';
import useSearchProducts from './hooks/use-search-products';

function Shop({navigation,route}:ShopProps) {
    const [isModalOpen , setIsModalOpen] = useState<boolean>(false);

    const {data:dataCategories,isLoading:isLoadingCategories,error:errorCategories} = useCategories();
    const {
        data:dataSearchProducts,error:errorSearchProducts,onSubmit,
        isLoading:isLoadingSearchProducts,refresh
    } = useSearchProducts();
    const {categories} =dataCategories;
    const {products} = dataSearchProducts; 
    const error = errorCategories||errorSearchProducts;
    const isLoading = isLoadingCategories||isLoadingSearchProducts; 

    if(error)return <ErrorComponent data={dataCategories?.error?dataCategories:dataSearchProducts} /> 
    if(isLoading)return (<Loader />  )
    if(!error && !isLoading && products.length == 0 )return (
        <View className="flex-1 flex flex-col items-center justify-center gap-y-[20px] bg-white  ">
            <Text className="text-gray-400 font-bold text-xl">No Products found</Text>
            <Feather name="search" size={24} color="rgb(156,163,175)" />
            <TouchableOpacity onPress={refresh}>
                <View className="px-12 py-4 rounded-lg bg-emerald-400 ">
                    <Text className="text-white font-bold" >Refresh</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
    return (
    <KeyboardLayout>
        <>
        {/* Modal */}
        <FilterModal  
            visible={isModalOpen} 
            onSubmit = {onSubmit}
            categories = {categories}
            onClose={()=>{setIsModalOpen(false)}}
        /> 
        <View className="flex-1 bg-white  ">
            {/* Menu */}
            <View className="flex flex-row items-center  gap-x-[10px] px-4  ">
                <View className="  p-1 border border-gray-200 rounded-lg">
                    <TouchableOpacity onPress={()=>setIsModalOpen(true)}>
                        <Feather name="sliders" size={28} color="black" className='h-12 w-12' />
                    </TouchableOpacity>
                </View>
                <View className="py-4  ">
                    <FlatList
                        horizontal={true}
                        className='flex flex-row gap-x-[10px] px-4 '
                        style={{ flex: 0 }}
                        initialNumToRender={categories.length}
                        data={categories}
                        renderItem={({item}) => <CategoryCard navigation={navigation as any} route={route as any} category={item}/>}
                        keyExtractor={(item)=>(item.name as string)}
                    />
                </View>

            </View>
            <View className="flex-1 justify-center px-1 ">
                <FlatList 
                    keyExtractor={(item)=>item.id}
                    numColumns={2}
                    className='flex flex-1'
                    data={products}
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
          
        </View>
        </>
    </KeyboardLayout>
    );
};

export default Shop;