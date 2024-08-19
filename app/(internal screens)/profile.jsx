import { View, Text, SafeAreaView, Pressable, ScrollView, RefreshControl } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ScheduleHeader from '../components/MySchedules/ScheduleHeader';
import { useGlobalContext } from '../../contexts/GlobalProvider';
import CustomButton from '../components/CustomButton';
import Feather from '@expo/vector-icons/Feather';
import InfoInstance from '../components/Profile/InfoInstance';
import ProfileDefault from '../components/Profile/ProfileDefault';
import DeleteDialogBox from '../components/Admin/DeleteDialogBox';

import { router } from 'expo-router';
import { useScheduleContext } from '@/contexts/ScheduleProvider';
import { deleteMyAccount, logoutUser } from '@/lib/Users/User';

const profile = () => {
    const insets = useSafeAreaInsets();
    const {userName,userEmail,userRole,userAge,userGender,setUser,token,setToken} = useGlobalContext();
    const {profileRefetch, setProfileRefetch} = useScheduleContext()
    const [fullName, setFullName] = React.useState("");
    const [inputError, setInputError] = React.useState("");
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [isDeleteVisible, setIsDeleteVisible] = React.useState(false);
    const onRefresh = () => {
        setProfileRefetch(true);
      };
      const handleDelete = async() => {
        if (!fullName) {
          setInputError('Full Name is required');
          return;
        }
      
        if (fullName.trim() !== userName) {
          setInputError('Full Name does not match');
          return;
        }
        try {
          setIsDeleting(true);
          const response = await deleteMyAccount(token);
          if(response){
            logoutUser(setToken,setUser);
          }  
        } catch (error) {
          console.log(error);
        }finally{
            setIsDeleting(false);
            setIsDeleteVisible(false);
        }
      }
  return (
    <SafeAreaView className="bg-primary h-full" style={{ paddingTop: insets.top }}>
            
        <ScheduleHeader title={"My Profile"} isProfile isThreeDots setDeleteVisible={setIsDeleteVisible}/>
        <ScrollView className="h-full relative"
            refreshControl={
            <RefreshControl refreshing={profileRefetch} onRefresh={onRefresh} />
          }
        >
            {isDeleteVisible &&
            <DeleteDialogBox
            setDeleteVisible={setIsDeleteVisible}
            handleDeleteUser={handleDelete}
            fullName={fullName}
            setFullName={setFullName}
            inputError={inputError}
            isDeleting={isDeleting}
            />}
        <View className="flex items-center justify-start flex-col mt-4">
            <ProfileDefault sizeClass={"h-40 w-40"} />
            <CustomButton title="Update Profile" handlePress={()=>{
                router.push("/UpdateProfile")
            }} isDetail={true}
            customStyle={"bg-primary border border-[#008FFF]"}
            textStyle={"text-[#008FFF]"}
            endIcon={<Feather name="edit" size={24} color="#008FFF" />}
                />

            <View className="flex flex-col items-center mx-auto border border-stroke_38 border-1 rounded-lg px-4 w-[90%] mt-4 py-2">
                <InfoInstance title="Full Name" value={userName ?? "No Name"} />
                <InfoInstance title="Email" value={userEmail ?? "No Email"} />
                <InfoInstance title="Role" value={userRole ?? "user"}  />
                <InfoInstance title="Gender" value={userGender ?? "--"}  />
                <InfoInstance title="Age" value={userAge ?? "--"} isLast={true} />
            </View>
        </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default profile