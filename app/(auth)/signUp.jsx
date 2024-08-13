import { View, Text, SafeAreaView, ScrollView, Pressable } from 'react-native'
import {Image} from 'expo-image'
import React,{useState} from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SignUpImg from '../../assets/images/SignUpImg.png'
import FormField from '../components/FormField';
import CustomButton from '../components/CustomButton';
import { router } from 'expo-router';
import { SignUpUser,validateEmail,validatePassword,validateFullName } from '../../lib/Users/User';
import { useGlobalContext } from '../../contexts/GlobalProvider';
// import Toast from 'react-native-toast-message';
import {Toast} from 'toastify-react-native'
import ToastManage from '../components/Home/ToastManage';

const SignIn = () => {
const insets = useSafeAreaInsets();
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [fullName, setFullName] = useState('');

const [emailValid, setEmailValid] = useState(false);
const [passwordValid, setPasswordValid] = useState(false);
const [fullNameValid, setFullNameValid] = useState(false);

const [isLoading, setIsLoading] = useState(false);
const {setUser} = useGlobalContext();

const handleSignUp= ()=>{
setFullNameValid(false);
setEmailValid(false);
setPasswordValid(false);

  if(!fullName){
    setFullNameValid("Full Name is required");
    return;
  }else if(!validateFullName(fullName)){
    setFullNameValid("Full Name is invalid");
    return;
  }

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

  if(email && password && fullName){
    setIsLoading(true);
    setEmailValid(false);
    setPasswordValid(false);
    setFullNameValid(false);

    SignUpUser(fullName, email, password)
    .then((response) => {
      setUser(response);
      Toast.success('Sign Up Successful','top');
    })
    .catch((error) => {
      console.error("Error: ",error);
      const errorMessage = error.response?.data?.message || 'Please try Again!';
      Toast.error(errorMessage,'top');
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
          <Image source={SignUpImg} 
          contentFit='cover'
          contentPosition={'center'}
          className="w-full h-full scale-110"
          
          />
        </View>

        <View className="flex items-center justify-center gap-1 mt-0">
          <Text className="text-white font-pop_SemiBold text-3xl">Fitness Evolution</Text>
          <Text className="text-white font-pop_Medium text-lg">Evolve Beyond Limits</Text>
        </View>

        <View className="flex items-center justify-center gap-4 mt-4 px-4 w-full mx-auto" style={{gap:16}}>
          <FormField title="Enter Your Full Name" placeholder="Enter your full name" icon={"user-alt"} iconType={"fontAwesome"} value={fullName}
          handleChangeText={(e)=>setFullName(e)} validationError={fullNameValid}
          />

          <FormField title="Email" placeholder="Enter your email" icon={"email"} value={email} handleChangeText={(e)=>setEmail(e)} validationError={emailValid} keyboardType={"email-address"}/>

          <FormField title="Password" placeholder="Enter your password" icon='password' isPassword 
          value={password} handleChangeText={(e)=>setPassword(e)} validationError={passwordValid}
           />

        </View>

        <View className={"mt-10"}>
          <CustomButton title="Sign Up" handlePress={handleSignUp} isLoading={isLoading} />

          <View style={{ height: 1, backgroundColor: '#E5E7EB', marginTop: 25,opacity: 0.8}} />
          <View className="py-6 flex flex-row mx-auto">
            <Text className="text-white text-base text-center ">Already have an account? {" "} 
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