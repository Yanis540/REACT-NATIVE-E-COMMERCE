import React from 'react';
import { View  , TextInput , Text,TouchableOpacity, ScrollView, FlatList } from 'react-native'
import {toFormikValidationSchema} from "zod-formik-adapter"
import { loginSchema , LoginSchema } from '../types';
import {Formik} from "formik";
import { useAuthNavigation } from '../../../routes';
interface LoginFormProps {
  onSubmit : (data: LoginSchema) => Promise<void>
};


function LoginForm({onSubmit }:LoginFormProps) {
  const {navigation} = useAuthNavigation(); 
  return (
  <Formik<LoginSchema>
    initialValues={{email: "",password:"",}}
    onSubmit={async(values:any,actions:any) => {await onSubmit(values).catch((err)=>{}) }}
    validationSchema={toFormikValidationSchema(loginSchema)}
  >
    {
      ({handleChange,values,setFieldValue,errors,handleSubmit,touched,handleBlur,isSubmitting,})=>{
        return (
        <View className="flex-1  flex-col justify-center  mx-4  " >
          {/* Form InPUT   */}
          <View className="flex-1">
            <ScrollView  contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} className="flex-1 flex flex-col mb-2 ">
              {/** Email */}
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
            </ScrollView>
            {/* Button */}
            <TouchableOpacity   onPress={handleSubmit as ()=>void}>
              <View className="flex flex-col items-center w-full bg-emerald-400  mb-4 pb-3 px-2 rounded-lg ">
                <Text className="text-white font-bold text-xl ">Log In</Text>
              </View>
              {/* register */}
              <View className='flex flex-row items-center justify-center gap-2 text-sm px-2 mb-2 '>
                <Text className="text-gray-500">Don&apos;t have an account?</Text>
                <TouchableOpacity onPress={()=>{navigation.navigate("RegisterScreen")}} className="underline cursor-pointer ml-2">
                  <Text className="text-emerald-400 ">Register </Text>
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

export default LoginForm;