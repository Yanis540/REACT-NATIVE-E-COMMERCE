import { Product } from '@/types';
import React, { useState } from 'react';
import { Text, View , Image, TouchableOpacity, Modal, TouchableWithoutFeedback} from 'react-native'
import { ImageZoom } from '@likashefqet/react-native-image-zoom';

interface ProductDetailsImageProps {
    product : Product
};  


function ProductDetailsImage({product}:ProductDetailsImageProps) {
    const defaultSrc = "https://d13o3tuo14g2wf.cloudfront.net/thumbnails%2Flarge%2F_default_upload_bucket%2FWH1000XM4B_0000_001_406fdd3cc9e49e28002ad8baef9185c8_1.png.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kMTNvM3R1bzE0ZzJ3Zi5jbG91ZGZyb250Lm5ldC90aHVtYm5haWxzJTJGbGFyZ2UlMkZfZGVmYXVsdF91cGxvYWRfYnVja2V0JTJGV0gxMDAwWE00Ql8wMDAwXzAwMV80MDZmZGQzY2M5ZTQ5ZTI4MDAyYWQ4YmFlZjkxODVjOF8xLnBuZy5wbmciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjIxNDU3NjIwMDB9fX1dfQ__&Signature=K9Dw9fhXmMEyfPonCK3vOAxZ9NDmx4mYB7ZgLwdN2RYLLwEy0Oe663JnZiuWBWo19S6~eyaYIKgTgAZ79bL63YJYJjgv5hAAvlBlGsBbT4K4PDrfygiy25haUof4UVAbHDM~dp3ZwgQOP-GraSoCY5EDfR5wy9ekhTeYXLmap1lSyb70P-eZyACBzsN5LaiGDhAGigbc3HCyBByLhbjMJz9w~~pC2PN1v4ndPQveQ2gcnqLSPBYnnZfDRbJtx1YjRR8q7tXD7sYXYDLQgZw2aJuXqT7FnvdF7lYmzWm6TAktwD0FOtvn2QHMXZimmAu5igDpFcBCfFR5btt-TV7zlA__&Key-Pair-Id=K37BLT9C6HMMJ0"
    const defaultSrc2 = "https://www.pakmobizone.pk/wp-content/uploads/2021/05/HUAWEI-FreeBuds-4i-Red-6.png"
    const random = Math.floor(Math.random() * 10) %(possiblesColors.length); 
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return (
    <>
        <View className={` flex flex-col items-center w-full h-[40%]  justify-center px-4  py-4  bg-violet-500/30 rounded-lg
            ${
                random==0?"bg-blue-400/30": random==1?"bg-violet-400/30": "bg-zinc-400/30"
            }
        `}>
            <TouchableOpacity onPress={()=>setIsModalOpen(true)}>
                <Image className="flex-1 w-64 h-64  rounded-lg  " source={{uri:product?.image??defaultSrc2}} style={{resizeMode: 'contain',}} /> 
            </TouchableOpacity>
        </View>
        <Modal animationType='fade' transparent={true} visible={isModalOpen} className="bg-red">
            <View className=" flex-1 flex flex-col items-center justify-center h-full" style={{backgroundColor:"rgba(0,0,0,0.7)"}}>
                <View className='flex flex-col  items-center justify-center w-full  h-full  rounded'>
                    <TouchableWithoutFeedback onPress={()=>setIsModalOpen(false)}>
                        <View className={`w-full max-w-max h-full ${random==0?"bg-blue-400/30": random==1?"bg-violet-400/30": "bg-zinc-400/30"} `}>
                            <ImageZoom 
                                
                                className='w-full h-24' 
                                uri={product?.image??defaultSrc2}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </Modal> 
    </>
    );
};
const possiblesColors = [
    "bg-blue-400/30", 
    "bg-purple-400/30",
    "bg-zinc-400/30"
]
export default ProductDetailsImage;