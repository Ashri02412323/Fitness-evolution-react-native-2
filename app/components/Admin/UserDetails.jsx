import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import UserDetailInstance from './UserDetailInstance'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useGlobalContext } from '../../../contexts/GlobalProvider';
import ProfilePic from '../../../assets/images/profilePic.png';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AboutProfile from '../Profile/AboutProfile';

const UserDetails = () => {
    const {isDetailVisible,setIsDetailVisible,detailName,detailAge,detailGender,detailRole,detailProfile,detailEmail} = useGlobalContext();
  return (
    <View className={` top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center ${isDetailVisible ?"absolute":"hidden"}`}>
      <Pressable className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-80 z-0" onPress={()=> setIsDetailVisible(false)}/>
      <View className="bg-secondary w-[250px] h-[360px] pt-4 flex flex-col items-center justify-between z-10">
        { <AboutProfile sizeClass="h-[130px] w-[130px]" textStyle="text-[80px] -bottom-2" parentStyle="" name={detailName} profileImg={detailProfile} />
      }
        <View className="flex flex-col mt-4 w-[88%]">
            <UserDetailInstance title="Name" value={detailName} />
            <UserDetailInstance title="Age" value={detailAge} />
            <UserDetailInstance title="Email" value={detailEmail} />
            <UserDetailInstance title="Gender" value={detailGender} />
            <UserDetailInstance title="Role" value={detailRole} />
        </View>
        <View className="flex flex-row items-center justify-around w-full bg-primary">
            <Pressable className="py-4 px-4">
                <Ionicons name="chatbox-ellipses-outline" size={22} color="#01AFA8" />
            </Pressable>
            <Pressable className="py-2 px-2" >
                <MaterialCommunityIcons name="account-details-outline" size={24} color="#01AFA8" />
            </Pressable>
        </View>
      </View>
    </View>
  )
}

export default UserDetails