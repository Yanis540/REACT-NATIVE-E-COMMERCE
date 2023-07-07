import {useState} from 'react';
import { Text, View , TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
interface FavoriteButtonProps {
    productId : string 
};
const colors = {
    grayishBlack :"#515151", 
    heartColor : "#e92f3c" 
}

function FavoriteButton({productId}:FavoriteButtonProps) {
    const [isFavorite,setIsFavorite] =  useState<boolean>(false) ; 

    return (
        <TouchableOpacity onPress={()=>setIsFavorite(prev=>!prev)}>
           <AntDesign name={isFavorite?"heart": "hearto"} size={20} color={isFavorite ?colors.heartColor:colors.grayishBlack} />
        </TouchableOpacity>
    );
};

export default FavoriteButton;