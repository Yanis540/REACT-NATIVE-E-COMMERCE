import { View  , TextInput , Text, ScrollView,TouchableOpacity } from 'react-native'
import {toFormikValidationSchema} from "zod-formik-adapter"
import { searchProductForm , SeacrhProductFormType } from '../types';
import {Formik} from "formik";
import { Category } from '@/types';
import {Picker} from '@react-native-picker/picker';
interface FilterFormProps {
  onSubmit : (data: SeacrhProductFormType) => Promise<void>
  categories : Category[] 
  onClose : ()=>void 
};

function FilterForm({onSubmit,categories, onClose}:FilterFormProps) {

  return (
    <Formik<SeacrhProductFormType>
      initialValues={{
        name: "",
        categorie:undefined,
      }}
      onSubmit={(values:any,actions:any) => {
        // call api
        onSubmit(values)
        onClose();
        // actions.resetForm()
      }}
      validationSchema={toFormikValidationSchema(searchProductForm)}
    >

      {
        ({handleChange,values,setFieldValue,errors,handleSubmit,touched,handleBlur,isSubmitting,})=>{
          return (
          <View className="flex-1 flex flex-col pt-[40px] " >
            {/* Filter */}
            <ScrollView className="flex-1 flex flex-col ">
              {/* Text */}
              <View className="flex flex-col py-4" >
                <TextInput 
                  className={` border-[1px] p-4 rounded-lg ${(!touched.name || !errors.name)?"border-gray-300":"border-red-500"}  `}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur('name')}
                  placeholder='Name'
                  value={values.name}
                /> 
                {(touched.name && errors.name)&& (
                  <Text className="text-red-500 w-full ml-[4px]  ">{errors.name}</Text>
                )}
              </View>
              {/* Categories */}
              <View className="flex flex-row items-center py-6 gap-x-[10px]  " >
                <Text className="font-bold text-xl">Categories</Text>
                <View className="flex-1 border border-gray-300 rounded-lg  ">
                  <Picker
                    className="w-full h-full border-green-400 border "
                    style={{flex:1,borderWidth:4, borderColor:"red",borderRadius:7}}
                    selectedValue={values.categorie?.name??undefined}
                    onValueChange={(itemValue, itemIndex) =>setFieldValue("categorie",itemIndex!=0?categories[itemIndex-1]:undefined)}
                  >
                    <Picker.Item key='' label='-- Select a Item --' value={undefined} enabled={false} />
                    {
                      categories.map((categorie)=>(
                        <Picker.Item key={categorie.name} label={categorie.name} value={categorie.name}  />
                      ))
                    }
                  </Picker>
                </View>
            

              </View>
            </ScrollView>
            {/* Button */}
            <TouchableOpacity   onPress={handleSubmit as ()=>void}>
              <View className="flex flex-col items-center w-full bg-emerald-400  mb-4 pb-3 px- rounded-lg ">
                <Text className="text-white font-bold text-xl ">Save</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      } 
  
    </Formik>
  );
};
export default FilterForm;