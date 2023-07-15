import {useState, useCallback} from 'react';
import { Text, View , TouchableOpacity , RefreshControl} from 'react-native'
import KeyboardLayout from '../../Layout/KeyboardLayout';
import { Feather } from '@expo/vector-icons';
import { useCategories } from '../../hooks/use-categories';
import { ErrorComponent, Loader} from '../../components';
import FilterModal from './components/FilterModal';
import useSearchProducts from './hooks/use-search-products';
import ShopMenu from './components/ShopMenu';
import {Products} from '../../components';

function Shop() {

    const [isModalOpen , setIsModalOpen] = useState<boolean>(false);
    const [refreshing,setRefreshing] = useState<boolean>(false);

    const {data:dataCategories,isLoading:isLoadingCategories,error:errorCategories} = useCategories();
    const {
        data:dataProducts,error:errorProducts,isLoading:isLoadingProducts,
        refresh,search
    } = useSearchProducts();

    const {categories} =dataCategories;
    const {products} = dataProducts; 

    const error = errorCategories??errorProducts;
    const isLoading = isLoadingCategories??isLoadingProducts; 

    const onRefresh = useCallback(async() => {
        setRefreshing(true);
        search({})
        setRefreshing(false)
    }, []);
    if(error)return (
    <RefreshControl className='flex-1 bg-white border' refreshing={refreshing} onRefresh={onRefresh}>
        <ErrorComponent data={dataCategories?.error?dataCategories:dataProducts} /> 
    </RefreshControl>
    )
    if(isLoading && ! refreshing)return (<Loader />  )
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
            onSubmit = {search}
            categories = {categories}
            onClose={()=>{setIsModalOpen(false)}}
        /> 
        <View className="flex-1 bg-white  ">
            {/* Menu */}
            <ShopMenu 
                onOpen={()=>{setIsModalOpen(true)}}
                categories={categories.slice(0,5)} search={search}
            /> 
            {/* Products */}
            <Products 
                products={products} refreshing={refreshing} 
                onRefresh={onRefresh}
            /> 
          
        </View>
        </>
    </KeyboardLayout>
    );
};

export default Shop;