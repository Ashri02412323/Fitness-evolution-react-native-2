import { View, Text, SafeAreaView, ScrollView, Pressable } from 'react-native'
import {Image} from 'expo-image'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import forgotImg from '../../assets/images/ForgotPassword.png'
import FormField from '../components/FormField';
import CustomButton from '../components/CustomButton';
import { router } from 'expo-router';
import {VerifyEmail,setNewPass,validateEmail,validatePassword} from '../../lib/Users/User';
import {Toast} from 'toastify-react-native'
import { useGlobalContext } from '../../contexts/GlobalProvider';

const SignIn = () => {
  const {setForgottonEmail} = useGlobalContext();
const [isLoading, setIsLoading] = React.useState(false);
const insets = useSafeAreaInsets();
const [verified, setVerified] = React.useState(false);
const [email, setEmail] = React.useState('');
const [emailValid, setEmailValid] = React.useState(false);

const [password, setPassword] = React.useState('');
const [passwordValid, setPasswordValid] = React.useState(false);
const [confirmPassword, setConfirmPassword] = React.useState('');
const [confirmPasswordValid, setConfirmPasswordValid] = React.useState(false);

const handleVerifyEmail = () => {
  setEmailValid(false);
  if(!email){
    setEmailValid("Email is required");
    return;
  }else if(!validateEmail(email)){
    setEmailValid("Email is invalid");
    return;
  }
  setIsLoading(true);
  VerifyEmail(email)
  .then((response) => {
    setVerified(true);
    setEmailValid(false);
    setForgottonEmail(email);
    Toast.success('Email Verified','top')
  })
  .catch((error) => {
    console.error("Error: ",error);
    const errorMessage = error.response?.data?.message || 'Please try Again!';
    Toast.error(errorMessage,'top')
  })
  .finally(() => {
    setIsLoading(false);
  });
}

const handleChangePass = async() => {
  setPasswordValid(false);
  setConfirmPasswordValid(false);
  if(!password){
    setPasswordValid("Password is required");
    return;
  }else if(!validatePassword(password)){
    setPasswordValid("Password is invalid");
    return;
  }

  if(!confirmPassword){
    setConfirmPasswordValid("Confirm Password is required");
    return;
  }else if(!validatePassword(confirmPassword)){
    setConfirmPasswordValid("Confirm Password is invalid");
    return;
  }

  if(password !== confirmPassword){
    setConfirmPasswordValid("Passwords do not match");
    return;
  }
  setIsLoading(true);
  setNewPass(email, password)
  .then((response) => {
    Toast.success('Password Changed','top')
    router.push('/signIn');
  })
  .catch((error) => {
    console.error("Error: ",error);
    const errorMessage = error.response?.data?.message || 'Please try Again!';
    Toast.error(errorMessage,'top')
  })
  .finally(() => {
    setIsLoading(false);
  });
}
  
  return (
    <SafeAreaView className="bg-primary h-full" style={{ paddingTop: insets.top }}>
      <ScrollView>
        <View className="w-full relative h-[300px]">
          <Image source={forgotImg} 
          contentFit='cover'
          contentPosition={'center'}
          className="w-full h-full scale-110"
          />
        </View>

        <View className="flex items-center justify-center gap-1 mt-0">
          <Text className="text-white font-pop_SemiBold text-3xl">Fitness Evolution</Text>
          <Text className="text-white font-pop_Regular text-lg">Recover Your Password</Text>
        </View>

        <View className="flex items-center justify-center gap-4 mt-8 px-4 w-full mx-auto" style={{gap:16}}>
            {verified ? 
            <>
            <FormField title="Enter New Password" placeholder="Enter password"  iconType={"fontAwesome"}  icon='unlock' isPassword value={password} handleChangeText={(e)=>setPassword(e)} 
            validationError={passwordValid}
              />

            <FormField title="Confirm Password"  placeholder="Confirm password" iconType={"fontAwesome"} icon='lock' isPassword 
            value={confirmPassword} handleChangeText={(e)=>setConfirmPassword(e)} validationError={confirmPasswordValid}
            />
            </>

            :
            <FormField title="Email" placeholder="Enter your email" icon={"email"} value={email} handleChangeText={(e)=>setEmail(e)} validationError={emailValid} />
            }
        </View>

        <View className={`${verified?"mt-8":"mt-28"}`}>
          {/* <CustomButton title={`${verified?"Change Password":"Verify Email"}`} handlePress={() => {setVerified(prev => !prev)}} /> */}
          {verified ? 
          <CustomButton title="Change Password" handlePress={handleChangePass} isLoading={isLoading}/>
          :
          <CustomButton title="Verify Email" handlePress={handleVerifyEmail} isLoading={isLoading}/>
          }
          <View style={{ height: 1, backgroundColor: '#E5E7EB', marginTop: 25,opacity: 0.8}} />
          <View className="py-6 flex flex-row mx-auto">
            <Text className="text-white text-base text-center ">Remember Password? {" "} 
            </Text>
              <Pressable onPress={() => router.push('/signIn')} className="">
                <Text className="text-mint-87 text-base">Sign in</Text>
            </Pressable>
            
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn