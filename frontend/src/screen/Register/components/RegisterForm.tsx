import React from 'react';
import { RegisterSchema , registerSchema} from '../types';
import { View  , TextInput , Text,TouchableOpacity, ScrollView, FlatList } from 'react-native'
import {toFormikValidationSchema} from "zod-formik-adapter"
import {Formik} from "formik";
import { useAuthNavigation } from '../../../routes';
interface RegisterFormProps {
    onSubmit : (data: RegisterSchema) => Promise<void>
};

function RegisterForm({onSubmit}:RegisterFormProps) {
    const {navigation} = useAuthNavigation() 
    return (
    <Formik<RegisterSchema>
        initialValues={{name:"",email: "",confirmPassword:"",password:"",}}
        onSubmit={async(values:any,actions:any) => {await onSubmit(values).catch((err)=>{}) }}
        validationSchema={toFormikValidationSchema(registerSchema)}
    >
        {
          ({handleChange,values,setFieldValue,errors,handleSubmit,touched,handleBlur,isSubmitting,})=>{
            return (
            <View className="flex-1  flex-col justify-center  mx-4  " >
              {/* Form InPUT   */}
              <View className="flex-1">
                <ScrollView  contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} className="flex-1 flex flex-col mb-2 ">
                  {/** Name */}
                  <View className="flex flex-col py-4" >
                    <TextInput 
                      className={` border-[1px] p-4 rounded-lg ${(!touched.name || !errors.name)?"border-gray-300":"border-red-500"}  `}
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur('name')}
                      placeholder='name'
                      value={values.name}
                    /> 
                    {(touched.name && errors.name)&& (
                      <Text className="text-red-500 w-full ml-[4px]  ">{errors.name}</Text>
                    )}
                  </View>
                  <View className="flex flex-col py-4" >
                    <TextInput 
                      className={` border-[1px] p-4 rounded-lg ${(!touched.email || !errors.email)?"border-gray-300":"border-red-500"}  `}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur('email')}
                      placeholder='email'
                      value={values.email}
                    /> 
                    {(touched.email && errors.email)&& (
                      <Text className="text-red-500 w-full ml-[4px]  ">{errors.email}</Text>
                    )}
                  </View>
                  <View className="flex flex-col py-4" >
                    <TextInput
                      secureTextEntry={true} 
                      className={` border-[1px] p-4 rounded-lg ${(!touched.password || !errors.password)?"border-gray-300":"border-red-500"}  `}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur('password')}
                      placeholder='password'
                      value={values.password}
                    /> 
                    {(touched.password && errors.password)&& (
                      <Text className="text-red-500 w-full ml-[4px]  ">{errors.password}</Text>
                    )}
                  </View>
                  <View className="flex flex-col py-4" >
                    <TextInput
                      secureTextEntry={true} 
                      className={` border-[1px] p-4 rounded-lg ${(!touched.confirmPassword || !errors.confirmPassword)?"border-gray-300":"border-red-500"}  `}
                      onChangeText={handleChange("confirmPassword")}
                      onBlur={handleBlur('confirmPassword')}
                      placeholder='confirmPassword'
                      value={values.confirmPassword}
                    /> 
                    {(touched.confirmPassword && errors.confirmPassword)&& (
                      <Text className="text-red-500 w-full ml-[4px]  ">{errors.confirmPassword}</Text>
                    )}
                  </View>
                </ScrollView>
                {/* Button */}
                <TouchableOpacity   onPress={handleSubmit as ()=>void}>
                  <View className="flex flex-col items-center w-full bg-emerald-400  mb-4 pb-3 px-2 rounded-lg ">
                    <Text className="text-white font-bold text-xl ">Register</Text>
                  </View>
                  {/* register */}
                  <View className='flex flex-row items-center justify-center gap-2 text-sm px-2 mb-2 '>
                    <Text className="text-gray-500">Already have an account?</Text>
                    <TouchableOpacity onPress={()=>{navigation.navigate("LoginScreen")}} className="underline cursor-pointer ml-2">
                      <Text className="text-emerald-400 ">Sign In  </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        } 
      
      </Formik>
    );
};

export default RegisterForm;