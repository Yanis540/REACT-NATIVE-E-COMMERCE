import {useState, useEffect,useMemo} from 'react';
import { Text, View , ScrollView , Image } from 'react-native'
import { ProductDetailsProps } from '@/routes/types';
import { useProduct } from './hooks/use-product';
import { ColorVariant } from '@/types';
import ProductControlCart from '../../components/Product/components/ProductControlCart';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ErrorComponent , Loader } from '../../components';
import ProductDetailsBody from './components/ProductDetailsBody';
import ProductDetailsImage from './components/ProductDetailsImage';



function ProductDetails({navigation,route}:ProductDetailsProps) {
    const {productId} = route.params;
    const {data , isLoading,error} = useProduct(productId);
    
    const product =useMemo(()=>data?.product,[data?.product]); 
    
    const [selectedColor, setSelectedColor] = useState<ColorVariant|undefined>(product?.colors[0]??undefined);
    useEffect(()=>{
        if(data?.product)
            setSelectedColor(data?.product?.colors[0]??undefined)
    },[data?.product])
    if(error||data?.error)return(<ErrorComponent data={data} /> )
    if(isLoading)return (<Loader /> ) 
    return (
        <View className="flex-1 flex w-full bg-white">
            {/* Image */}
            <ProductDetailsImage product={product!} /> 
            {/* Body */}
            <ProductDetailsBody 
                product={product!}
                setSelectedColor={setSelectedColor}
                selectedColor={selectedColor}
            /> 
            {/* navigation  */}
            <View className="flex flex-row px-4 py-8 items-center justify-between border-t-[1px]  border-t-gray-300 ">
                <TouchableOpacity onPress={()=>navigation.navigate("BasketScreen")}>
                    <View className="flex flex-col items-center justify-center py-3 px-10 bg-emerald-400 rounded-lg text-white font-bold text-3xl">
                        <Text className="font-bold  text-white text-lg ">Continue</Text>
                    </View>
                </TouchableOpacity>
                <ProductControlCart big product={product!} /> 
            </View>
           
        </View>
    );
};

export default ProductDetails;