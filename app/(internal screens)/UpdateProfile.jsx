import { View, Text, SafeAreaView, ScrollView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScheduleHeader from '../components/MySchedules/ScheduleHeader'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FormField from '../components/FormField';
import CustomButton from '../components/CustomButton';
import ProfileInput from '../components/Profile/ProfileInput';
import { useGlobalContext } from '../../contexts/GlobalProvider';
import { Picker } from '@react-native-picker/picker';
import { updateUser, validateEmail } from '../../lib/Users/User';
import { router } from 'expo-router';
import { useScheduleContext } from '../../contexts/ScheduleProvider';
import {Toast} from 'toastify-react-native';

const UpdateProfile = () => {
    const insets = useSafeAreaInsets();
    const {userName,userEmail,userAge,userGender,userProfile,token} = useGlobalContext();
    const {setRefreshing} = useScheduleContext()
    const [isValidAge, setIsValidAge] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidName , setIsValidName] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [updating, setUpdating] = useState(false);

    const [tempUserName, setTempUserName] = useState(userName);
    const [tempUserEmail, setTempUserEmail] = useState(userEmail);
    const [tempUserAge, setTempUserAge] = useState(userAge);
    const [tempUserGender, setTempUserGender] = useState(userGender);
    const [selectedImage, setSelectedImage] = useState(userProfile);

    const genderOptions =['male', 'female', 'gay'];
    const handleSubmit = async() => {
      const data = {
        fullName: tempUserName,
        email: tempUserEmail,
        age: tempUserAge,
        gender: tempUserGender,
        profileImage: selectedImage
      }
      try{
        setUpdating(true);
        const response = await updateUser(token,data,userProfile);
        Toast.success("Profile Updated Successfully", 'top');
        router.push('/home');
        setRefreshing(true)
    }catch(error){
        console.log("Error: ", error);
        const errorMsg = error?.response?.data?.message || "An error occurred, please try again";
        // ToastAndroid.show(errorMsg, ToastAndroid.SHORT);
        Toast.error(errorMsg, 'top');
    }finally{
        setUpdating(false);
    }
  }
  useEffect(()=>{
    if(!tempUserAge){
      setIsValidAge(false);
    }
    else if(tempUserAge < 18){
      setIsValidAge("Sorry, you are too young to use this app. Come back when you are 18 years old 🎉!!")
    }else if(tempUserAge > 100){
      setIsValidAge("Dude, you are too old to use this app. Take a chill pill 💊!!")
    }else{
      setIsValidAge(false)
    }
  },[tempUserAge])

  useEffect(()=>{
    if(!tempUserEmail) {
      setIsValidEmail("Email is required");
    }
    else if(!validateEmail(tempUserEmail)){
      setIsValidEmail("Email is invalid");
    }else{
      setIsValidEmail(false)
    }
  },[tempUserEmail])

  useEffect(()=>{
    if(!tempUserName){
      setIsValidName("Name is required");
    }else if(tempUserName.length < 3){
      setIsValidName("Name is too short");
    } else if (tempUserName.length > 50){
      setIsValidName("Name is too long");
    }else{
      setIsValidName(false)
    }
  },[tempUserName])

  useEffect(()=>{
    if(!isValidAge && !isValidEmail && !isValidName){
      if(userName === tempUserName && userEmail === tempUserEmail && userAge === tempUserAge && userGender === tempUserGender && userProfile === selectedImage){
        setDisabled(true);
      }else{
        setDisabled(false);
      }
    }else{
      setDisabled(true);
    }
  },[isValidAge, isValidEmail, isValidName,
    tempUserName, tempUserEmail, tempUserAge, tempUserGender, selectedImage, userName, userEmail, userAge, userGender, userProfile
  ])
  return (
    <SafeAreaView className="bg-primary h-full relative" style={{ paddingTop: insets.top }}>
      <ScheduleHeader title="Update Profile" isIconVisible={false}/>
        <ScrollView className="px-4 mt-4 "
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        >
        <View className="flex items-center justify-start flex-col mt-0">
            {/* <ProfileDefault sizeClass={"h-40 w-40"} /> */}
            <ProfileInput sizeClass={"h-40 w-40"} selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
            <View className="flex flex-col mx-auto px-2 w-full mt-0"
            style={{
              gap: 12
            }}
            >
              <FormField title="Full Name" placeholder="Enter your full name" noMargin={true} otherStyles={"py-3"} parentStyle={"border-0"} value={tempUserName} handleChangeText={(e)=>setTempUserName(e)} 
              validationError={isValidName}
                />
              
              <FormField title="Email" placeholder="Enter your email" noMargin={true} otherStyles={"py-3"} parentStyle={"border-0"} value={tempUserEmail} handleChangeText={(e)=>setTempUserEmail(e)}
              validationError={isValidEmail} keyboardType={"email-address"}
               />

              <FormField title="Age" placeholder="Enter your age" noMargin={true} otherStyles={"py-3 "} parentStyle={"border-0 "} value={tempUserAge} handleChangeText={(e) => {
                const parsedValue = parseInt(e);
                setTempUserAge(isNaN(parsedValue) ? "" : parsedValue);
              }} keyboardType={"numeric"} validationError={isValidAge} isNumber={true}/>

              <View className="mt-0 ">
                <Text className="text-base text-white_87 mb-2">Gender</Text>
                <View className="rounded-md overflow-hidden w-full">
                  <Picker
                  style = {{
                    backgroundColor: '#DFE0E1',
                    height: 50,
                  }}
                    selectedValue={tempUserGender}
                    onValueChange={(e) => setTempUserGender(e)}>
                      <Picker.Item key={"Default"} label="Select User Gender" value={undefined} />
                      {genderOptions.map((gender, index) => (
                        <Picker.Item key={index} label={gender} value={gender} />
                      ))}
                  </Picker>
              </View>
             </View>
             <View className="flex flex-row">
                <CustomButton title="Cancel" customStyle={"mt-4"} handlePress={()=>router.back()} />
                <CustomButton title="Update" customStyle={"mt-4"} handlePress={handleSubmit} disabled={disabled}
                isLoading={updating}
                />
              </View>
              <View className="h-[30px]"/>
            </View>
        </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default UpdateProfile