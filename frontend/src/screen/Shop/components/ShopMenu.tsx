import React from 'react';
import { View , TouchableOpacity , FlatList} from 'react-native'
import { Feather } from '@expo/vector-icons';
import { Category } from '@/types';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CategoryCard } from '../../../components';
import { SeacrhProductFormType } from '../types';
interface ShopMenuProps {
    onOpen : ()=>void  
    categories : Category[]
    search : (data:SeacrhProductFormType )=>Promise<void> 
};

function ShopMenu({onOpen , categories , search }:ShopMenuProps) {
    const navigation = useNavigation();
    const route = useRoute();
    return (
    <View className="flex flex-row items-center  gap-x-[10px] px-4  ">
        <View className="  p-1 border border-gray-200 rounded-lg">
            <TouchableOpacity onPress={onOpen }>
                <Feather name="sliders" size={28} color="black" className='h-12 w-12' />
            </TouchableOpacity>
        </View>
        <View className="py-4 ">
            <FlatList
                horizontal={true}
                className='flex flex-row gap-x-[10px] px-4  '
                style={{ flex: 0 }}
                initialNumToRender={categories.length}
                data={categories}
                renderItem={({item}) => (
                    <CategoryCard 
                        navigation={navigation as any} route={route as any} 
                        category={item} onPress={()=>{search({categorie:item})}}
                    />
                )}
                keyExtractor={(item)=>(item.name as string)}
            />
        </View>

    </View>
    );
};

export default ShopMenu;