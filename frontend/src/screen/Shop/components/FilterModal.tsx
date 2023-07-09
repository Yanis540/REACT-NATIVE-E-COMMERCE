import { Text, View, Modal, TouchableOpacity , ScrollView  , TextInput} from 'react-native'
import { AntDesign ,} from '@expo/vector-icons';
import KeyboardLayout from '../../../Layout/KeyboardLayout';
import { Category } from '@/types';
import { SeacrhProductFormType } from '../types';
import FilterForm from './FilterForm';
interface FilterModalProps {
    visible : boolean 
    onClose : ()=>void
    categories : Category[]
    onSubmit : (data: SeacrhProductFormType) => Promise<void> 
};

function FilterModal({visible, onClose, categories, onSubmit}:FilterModalProps) {
    return (
    <KeyboardLayout>
        <Modal 
            animationType="slide"
            visible={visible}
        >
            <View className="flex-1 flex flex-col  px-4 ">
                {/*!Upper */}
                <View className="flex flex-row items-center gap-x-[10px]  ">
                    <TouchableOpacity onPress={onClose}>
                        <AntDesign name="close" size={24} color="rgb(52, 211,153)" />
                    </TouchableOpacity>
                    <View className="flex flex-col items-center ">
                        <Text className="font-bold text-xl">Filter</Text>
                    </View>
                </View>
                {/* Filter fields */}
                <View className="flex-1 flex flex-col justify-start mt-4">
                    {/* Search by name :  */}
                    <FilterForm onSubmit={onSubmit} categories={categories} /> 
                </View>
            </View>
        </Modal>
    </KeyboardLayout>
    );
};

export default FilterModal;