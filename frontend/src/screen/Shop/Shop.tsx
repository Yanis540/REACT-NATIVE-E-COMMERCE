import {useState} from 'react';
import { Text, View  , FlatList, TouchableOpacity} from 'react-native'
import { ShopProps } from '../../routes/types';
import KeyboardLayout from '../../Layout/KeyboardLayout';
import { Feather } from '@expo/vector-icons';
import { useCategories } from '../../hooks/use-categories';
import { CategoryCard , ErrorComponent, Loader} from '../../components';
import FilterModal from './components/FilterModal';
import useSearchProducts from './hooks/use-search-products';


function Shop({navigation,route}:ShopProps) {
    const [isModalOpen , setIsModalOpen] = useState<boolean>(false);

    const {data:dataCategories,isLoading:isLoadingCategories,error:errorCategories} = useCategories();
    const {
        data:dataSearchProducts,error:errorSearchProducts,onSubmit,
        isLoading:isLoadingSearchProducts,
    } = useSearchProducts();
    const {categories} =dataCategories;
    const {products} = dataSearchProducts; 
    const error = errorCategories||errorSearchProducts;
    const isLoading = isLoadingCategories; 

    if(error)return <ErrorComponent data={dataCategories?.error?dataCategories:dataSearchProducts} /> 
    if(isLoading)return (<Loader />  )
    return (
    <KeyboardLayout>
        <View className="flex-1 bg-white border border-red-600 ">
            {/* Modal */}
            <FilterModal  
                visible={isModalOpen} 
                onSubmit = {onSubmit}
                categories = {categories}
                onClose={()=>{setIsModalOpen(false)}}
            /> 
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
           <Text>filters</Text>
           {/*  */}
          
        </View>
    </KeyboardLayout>
    );
};

export default Shop;