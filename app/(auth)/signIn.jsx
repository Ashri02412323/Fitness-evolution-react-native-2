import { View, Text, SafeAreaView, ScrollView, Pressable, ToastAndroid } from 'react-native'
import {Image} from 'expo-image'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SignInImg from '../../assets/images/SignInImg.png'
import FormField from '../components/FormField';
import CustomButton from '../components/CustomButton';
import { LoginUser,validatePassword,validateEmail } from '../../lib/Users/User';
// import Toast from 'react-native-toast-message';
import { useGlobalContext } from '../../contexts/GlobalProvider';
import { router } from 'expo-router';
import ToastManager, { Toast } from 'toastify-react-native'
import ToastManage from '../components/Home/ToastManage';

const SignIn = () => {
  const {setUser} = useGlobalContext();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin= ()=>{
    if(!email){
      setEmailValid("Email is required");
      return;
    }else if(!validateEmail(email)){
      setEmailValid("Email is invalid");
      return;
    }

    if(!password){
      setPasswordValid("Password is required");
      return;
    }else if(!validatePassword(password)){
      setPasswordValid("Password is invalid");
      return;
    }

    if(email && password){
      setIsLoading(true);
      setEmailValid(false);
      setPasswordValid(false);
      LoginUser(email, password)
      .then((response) => {
        setUser(response);
        Toast.success("Login Successful",'top')
      })
      .catch((error) => {
        console.error("Error: ",error);
        const errorMessage =  error.response?.data?.message || "An error occurred";
        Toast.error(errorMessage,'top')
      })
      .finally(() => {
        setIsLoading(false);
      });
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full" style={{ paddingTop: insets.top }}>
      <ScrollView>
        <View className="w-full relative h-[300px]">
          <Image source={SignInImg} 
          contentFit='cover'
          contentPosition={'center'}
          className="w-full h-full"
          />
        </View>

        <View className="flex items-center justify-center gap-1 mt-0">
          <Text className="text-white font-pop_SemiBold text-3xl">Fitness Evolution</Text>
          <Text className="text-white font-pop_Medium text-lg">Evolve Beyond Limits</Text>
        </View>

        <View className="flex items-center justify-center gap-4 mt-4 px-4 w-full mx-auto" style={{gap:12}}>

          <FormField title="Email" placeholder="Enter your email" icon={"email"} value={email} handleChangeText={(e)=>setEmail(e)} validationError={emailValid} keyboardType={"email-address"} />

          <FormField title="Password" placeholder="Enter your password" icon='password' isPassword 
          value={password} handleChangeText={(e)=>setPassword(e)} validationError={passwordValid}
           />
          <Pressable onPress={() => router.push('/forgotPassword')} className="w-full">
            <Text className="text-mint-87 text-right px-3 text-sm w-full relative -top-4">Forgot Password?</Text>
          </Pressable>
        </View>

        <View className={"mt-6"}>

          <CustomButton title="Sign In" handlePress={handleLogin} isLoading={isLoading} />

          <View style={{ height: 1, backgroundColor: '#E5E7EB', marginTop: 25,opacity: 0.8}} />
          <View className="py-6 flex flex-row mx-auto">
            <Text className="text-white text-base text-center ">Don't have an account? {" "} 
            </Text>
              <Pressable onPress={() => router.push('/signUp')} className="">
                <Text className="text-mint-87 text-base">Sign Up</Text>
            </Pressable>
            
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn