import { ErrorComponent, Loader, Products } from '../../../components';
import { useCallback, useState } from 'react';
import { Text, View , TouchableOpacity} from 'react-native'
import { useFavoriteProducts } from './hooks/use-favorite-products';
import { Feather } from '@expo/vector-icons';

interface AccountFavoriteProductsProps {

};

function AccountFavoriteProducts({}:AccountFavoriteProductsProps) {
    const [refreshing,setRefreshing] = useState<boolean>(false); 
    const {
        data,error,isLoading,
        refresh
    } = useFavoriteProducts();

    const {favorite_products} = data; 


    const onRefresh = useCallback(async() => {
        setRefreshing(true);
        await refresh()
        setRefreshing(false)
    }, []);
    if(error)return <ErrorComponent data={data} /> 
    if(isLoading && !refreshing )return (null)
    if(!error && !isLoading && favorite_products.length == 0 )return (
        <View className="flex-1 flex flex-col items-center justify-center gap-y-[20px] bg-white  ">
            <Text className="text-gray-400 font-bold text-xl">No Products found</Text>
            <Feather name="search" size={24} color="rgb(156,163,175)" />
            <TouchableOpacity onPress={async()=>await refresh()}>
                <View className="px-12 py-4 rounded-lg bg-emerald-400 ">
                    <Text className="text-white font-bold" >Refresh</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
    return (
        <View className="flex-1">
            <Products 
                products={favorite_products} refreshing={refreshing} 
                onRefresh={onRefresh}
            /> 
        </View>
    )
};

export default AccountFavoriteProducts;