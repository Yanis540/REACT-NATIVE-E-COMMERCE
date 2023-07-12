import React from 'react';
import { View  , TextInput , Text,TouchableOpacity } from 'react-native'
import {toFormikValidationSchema} from "zod-formik-adapter"
import { loginSchema , LoginSchema } from '../types';
import {Formik} from "formik";
interface LoginFormProps {
    onSubmit : (data: LoginSchema) => Promise<void>
};

function LoginForm({onSubmit }:LoginFormProps) {
  return (
  <Formik<LoginSchema>
    initialValues={{
      email: "",
      password:"",
    }}
    onSubmit={async(values:any,actions:any) => {
      // call api
      try{

        await onSubmit(values)
      }
      catch(err :any){

      }
      // actions.resetForm()
    }}
    validationSchema={toFormikValidationSchema(loginSchema)}
  >
    {
      ({handleChange,values,setFieldValue,errors,handleSubmit,touched,handleBlur,isSubmitting,})=>{
        return (
        <View className="flex-1 flex flex-col h-full justify-center   mx-4  " >
          {/* Form values  */}
          <View className="flex flex-col">
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
          </View>
          {/* Button */}
          <TouchableOpacity   onPress={handleSubmit as ()=>void}>
            <View className="flex flex-col items-center w-full bg-emerald-400  mb-4 pb-3 px-2 rounded-lg ">
              <Text className="text-white font-bold text-xl ">Log In</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    } 
  
  </Formik>
  );
};

export default LoginForm;