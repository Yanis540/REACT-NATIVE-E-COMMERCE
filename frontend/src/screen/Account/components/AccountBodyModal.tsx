import React, { ReactNode } from 'react';
import { Text, View  , TouchableOpacity , ScrollView} from 'react-native'
import { AntDesign, Entypo } from '@expo/vector-icons';
import Modal from 'react-native-modal';

interface AccountBodyModalProps {
    onClose: ()=>void 
    visible : boolean 
    option ?: string   
    children ?: ReactNode|null
};

function AccountBodyModal({children,onClose , visible,option}:AccountBodyModalProps) {
    if(option == undefined)
        return (
        <Modal className="flex-1 top-0 left-0 right-0 p-0 m-0 justify-start bg-white h-full px-4" animationIn='slideInLeft' animationOut={"slideOutLeft"} isVisible={visible}>
       
        </Modal> 
        )
    return (
        <Modal className="flex-1 top-0 left-0 right-0 p-0 m-0 justify-start bg-white h-full px-4" animationIn='slideInLeft' animationOut={"slideOutLeft"} isVisible={visible}>
            <View className="flex flex-row my-5">
                <TouchableOpacity onPress={(onClose)}>
                    <View className="border-[1px] border-emerald-400  rounded-full   ">
                        <AntDesign name="arrowleft" size={24} color="rgb(52,211,153)" className=""/>
                    </View>
                </TouchableOpacity>
                <View><Text></Text></View>
                <View className="flex-1 flex flex-row items-center ">
                    <View className='flex-1 flex flex-row items-center justify-center '>
                        <Text className="font-bold text-xl text-zinc-900 capitalize">{option}</Text>
                    </View>
                    <Entypo name="dots-three-horizontal" size={24} color="rgba(52, 211,153,1)" />
                </View>
            </View>
            {children}
        </Modal> 
    );
};

export default AccountBodyModal;